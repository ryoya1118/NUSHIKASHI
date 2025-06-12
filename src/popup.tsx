import React, { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { Icon } from "./components/Icon"; // 作成したIconコンポーネントをインポート
import "./style.css";

// --- 型定義 ---
type Status = "idle" | "processing" | "success" | "error";

// --- 定数 ---
const STATUS_STYLES: Record<Status, string> = {
  idle: "bg-gray-100 text-gray-700 border-gray-300",
  processing: "bg-blue-100 text-blue-700 border-blue-300",
  success: "bg-green-100 text-green-700 border-green-300",
  error: "bg-red-100 text-red-700 border-red-300",
};

// --- サブコンポーネント ---

// FileDropzone サブコンポーネント
type FileDropzoneProps = {
  isProcessing: boolean;
  isDragging: boolean;
  fileName: string | null;
  // Dragイベントハンドラをpropsとして受け取る
  onDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
};

const FileDropzone: React.FC<FileDropzoneProps> = ({
  isProcessing, isDragging, fileName, ...dragHandlers
}) => {
  const getDisplayText = () => {
    if (isProcessing) return "処理中...";
    if (isDragging) return "ここにファイルをドロップ";
    if (fileName) return `選択中: ${fileName.substring(0, 20)}${fileName.length > 20 ? "..." : ""}`;
    return "クリックまたはドラッグ＆ドロップ";
  };

  const baseClasses = "w-full flex flex-col items-center justify-center px-4 py-8 border-2 border-dashed rounded-lg transition-colors duration-150 ease-in-out";
  const stateClasses = isProcessing
    ? "cursor-not-allowed bg-gray-100"
    : isDragging
    ? "border-blue-500 bg-blue-50"
    : "border-gray-300 hover:border-gray-400 cursor-pointer";

  return (
    <div className={`${baseClasses} ${stateClasses}`} {...dragHandlers}>
      <Icon name="arrow-up-tray" className={`h-12 w-12 mb-2 ${isDragging ? "text-blue-600" : "text-gray-400"}`} />
      <p className={`text-sm font-medium ${isDragging ? "text-blue-700" : "text-gray-600"}`}>{getDisplayText()}</p>
      <p className={`text-xs ${isDragging ? "text-blue-500" : "text-gray-500"}`}>PDF・CSVファイルのみ</p>
    </div>
  );
};

// StatusMessage サブコンポーネント
type StatusMessageProps = {
  status: Status;
  message: string | null;
};

const StatusMessage: React.FC<StatusMessageProps> = ({ status, message }) => {
  if (!message) return null;

  return (
    <div className={`p-3 rounded-md border text-sm text-center ${STATUS_STYLES[status]}`}>
      {status === 'processing' && <span className="animate-spin inline-block mr-2">⚙️</span>}
      {message}
    </div>
  );
};


// --- メインコンポーネント ---

function Popup() {
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isProcessing = status === 'processing';

  const processFile = async (file: File) => {
    if (isProcessing) return;
    if (!file) {
      setMessage("ファイルが指定されていません。");
      setStatus("error");
      return;
    }
    if (file.type !== "application/pdf") {
      setMessage("PDFまたはCSVファイルを選択してください。");
      setStatus("error");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFileName(file.name);
    setMessage(`「${file.name}」の処理を開始しました...`);
    setStatus("processing");

    try {
      const arrayBuffer = await file.arrayBuffer();
      if (arrayBuffer.byteLength === 0) {
        throw new Error("空のファイルです。");
      }

      chrome.runtime.sendMessage(
        { action: "processPdf", data: { fileName: file.name, pdfDataAsArrayBuffer: arrayBuffer } },
        (response) => {
          if (chrome.runtime.lastError) {
            throw new Error(chrome.runtime.lastError.message || "不明なランタイムエラー");
          }
          if (response?.success) {
            setMessage(`処理を受け付けました。完了すると新しいタブでレポートが開きます。`);
            setStatus("success");
            setTimeout(() => window.close(), 3000);
          } else {
            throw new Error(response?.message || "不明なエラー");
          }
        }
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setMessage(`ファイル処理エラー: ${errorMessage}`);
      setStatus("error");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      processFile(event.target.files[0]);
    }
  };

  const handleCustomButtonClick = () => {
    if (!isProcessing) {
      fileInputRef.current?.click();
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
    if (!isProcessing) setIsDragging(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
    e.dataTransfer.dropEffect = isProcessing ? "none" : "copy";
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
    if (!isProcessing && e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col p-6 w-80 bg-white shadow-xl rounded-lg border border-gray-200 space-y-4 font-sans">
      <header className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">NUSHIKASHI</h1>
        <p className="text-sm text-gray-500">最高の家計簿ビュアー！</p>
      </header>

      <FileDropzone
        isProcessing={isProcessing}
        isDragging={isDragging}
        fileName={fileName}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleCustomButtonClick}
      />

      <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileChange} className="hidden" disabled={isProcessing} />

      <StatusMessage status={status} message={message} />
    </div>
  );
}

export default Popup;