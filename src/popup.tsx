// src/popup.tsx
import React, { useState, useRef } from "react";
import type { DragEvent, ChangeEvent } from "react";
import "./style.css";
import { Switch } from '@headlessui/react';

// arrayBufferToBase64 関数を IndexPopup の外、ファイルスコープに定義
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function IndexPopup() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = async (file: File) => {
    if (!file) {
      setMessage("ファイルが指定されていません。");
      setStatus("error");
      setFileName(null);
      return;
    }
    if (file.type !== "application/pdf") {
      setMessage("PDFファイルを選択してください。");
      setStatus("error");
      setFileName(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setFileName(file.name); // file をここで参照するので、sendMessageのコールバック内でも使える
    setMessage(`「${file.name}」を処理中...`);
    setStatus("processing");

    try {
      const arrayBuffer = await file.arrayBuffer();
      if (arrayBuffer.byteLength === 0) {
        setMessage("エラー: ファイルサイズが0です。");
        setStatus("error");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      const base64String = arrayBufferToBase64(arrayBuffer);

      chrome.runtime.sendMessage(
        {
          action: "processPdf",
          data: {
            fileName: file.name, // ここで fileName を渡している
            pdfDataAsBase64: base64String
          }
        },
        // ↓↓↓ ここからが置き換える部分 ↓↓↓
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
            const errorMessage = chrome.runtime.lastError.message || "不明なランタイムエラー";
            setMessage(`メッセージ送信エラー: ${errorMessage}`);
            setStatus("error");
            return;
          }

          let wasSuccessFromBackground = false; // バックグラウンド処理が success: true で返ってきたか
          let reportStatus = "unknown"; // レポートページに渡すステータス
          let uiMessage = ""; // ポップアップに表示するメッセージ
          let uiStatus: "idle" | "processing" | "success" | "error" = "idle";


          if (response?.success) {
            wasSuccessFromBackground = true;
            if (response.warning) {
              // ダミーデータが使われた場合など
              uiMessage = `処理完了 (警告あり): ${response.warning}`;
              uiStatus = "success"; // UI上は成功（警告付き）
              // warningの内容に応じて reportStatus を細かく設定
              if (response.warning.includes("PDF processing failed")) {
                  reportStatus = "pdf_error_used_dummy";
              } else if (response.warning.includes("Data decoding failed")) {
                  reportStatus = "decode_error_used_dummy";
              } else if (response.warning.includes("Invalid input data")) {
                  reportStatus = "invalid_data_used_dummy";
              } else if (response.warning.includes("No transactions found")) {
                  reportStatus = "empty_pdf_used_dummy";
              } else {
                  reportStatus = "warning_used_dummy";
              }
            } else {
              // 本当の成功
              uiMessage = `PDF「${file.name}」の処理完了。`; // file.name を使用
              uiStatus = "success";
              reportStatus = "success_from_pdf";
            }
          } else {
            // response.success が false (ダミー保存も失敗など)
            uiMessage = `PDF処理に失敗: ${response?.error || "不明なエラー"}`;
            uiStatus = "error";
            reportStatus = "total_failure";
          }
          
          setMessage(uiMessage);
          setStatus(uiStatus);

          // ★★★ 常にタブを開く。レポートページに処理結果ステータスを渡す ★★★
          const reportPageUrl = chrome.runtime.getURL(`tabs/report.html?fileName=${encodeURIComponent(file.name)}&status=${reportStatus}`);
          chrome.tabs.create({ url: reportPageUrl }, (tab) => {
            if (chrome.runtime.lastError) {
              console.error("Error opening new tab:", chrome.runtime.lastError.message);
              setMessage(prev => prev + ` 新しいタブを開けませんでした: ${chrome.runtime.lastError.message}`);
            } else {
              console.log(`Opened new tab with ID: ${tab.id}`);
            }
          });
        }
        // ↑↑↑ ここまでが置き換える部分 ↑↑↑
      );
    } catch (error) {
      console.error("File processing error:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setMessage(`ファイル処理エラー: ${errorMessage}`);
      setStatus("error");
      // ここでタブを開くかどうかも検討の余地あり。開くならfileNameとstatusを渡す
      // 例:
      // const reportPageUrl = chrome.runtime.getURL(`tabs/report.html?fileName=${encodeURIComponent(fileName || "unknown_file")}&status=local_error`);
      // chrome.tabs.create({ url: reportPageUrl });
    }
  };

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      await processFile(event.target.files[0]);
    }
  };

  const handleCustomButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        if (e.dataTransfer.items[0].type === "application/pdf") {
            setIsDragging(true);
        } else {
            console.log("Non-PDF file dragged over");
        }
    } else {
        setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.relatedTarget && (e.currentTarget.contains(e.relatedTarget as Node))) {
        return;
    }
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0 && e.dataTransfer.items[0].type === "application/pdf") {
        e.dataTransfer.dropEffect = 'copy';
    } else if (!(e.dataTransfer.items && e.dataTransfer.items.length > 0)) {
        // e.dataTransfer.dropEffect = 'none';
    } else {
        e.dataTransfer.dropEffect = 'none';
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        await processFile(droppedFile);
      } else {
        setMessage("PDFファイルのみドロップできます。");
        setStatus("error");
        setFileName(null);
      }
      e.dataTransfer.clearData();
    }
  };

  const getStatusColorClasses = () => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "success":
        return "bg-green-100 text-green-700 border-green-300";
      case "error":
        return "bg-red-100 text-red-700 border-red-300";
      default: // idle
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="flex flex-col p-6 w-80 bg-white shadow-xl rounded-lg border border-gray-200 space-y-4">
      <header className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">帳簿アップロード</h1>
        <p className="text-sm text-gray-500">PDFファイルをアップロードして家計簿データを作成します。</p>
      </header>

      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleCustomButtonClick}
        className={`w-full flex flex-col items-center justify-center px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer
                    transition-colors duration-150 ease-in-out 
                    ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" 
             className={`h-12 w-12 mb-2 ${isDragging ? 'text-blue-600' : 'text-gray-400'}`} 
             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338 0 4.5 4.5 0 01-1.41 8.775H6.75z" />
        </svg>
        <p className={`text-sm font-medium ${isDragging ? 'text-blue-700' : 'text-gray-600'}`}>
          {isDragging ? "ここにファイルをドロップ" : (fileName ? `選択中: ${fileName.substring(0,20)}${fileName.length > 20 ? '...' : ''}` : "クリックまたはドラッグ＆ドロップ")}
        </p>
        <p className={`text-xs ${isDragging ? 'text-blue-500' : 'text-gray-500'}`}>
          PDFファイルのみ
        </p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {message && (
        <div className={`p-3 rounded-md border text-sm text-center ${getStatusColorClasses()}`}>
          {status === "processing" && (
            <svg className="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.47177 20.9986 7.17389 19.3137 5.56733" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
           {status === "success" && (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
           )}
           {status === "error" && (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 101.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
             </svg>
           )}
          {message}
        </div>
      )}

      <div className="py-4">
        <Switch.Group>
          <div className="flex items-center justify-between">
            <Switch.Label className="mr-4 text-sm font-medium text-gray-700">通知を有効にする</Switch.Label>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </Switch.Group>
      </div>
    </div>
  );
}

export default IndexPopup;