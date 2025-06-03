// src/tabs/report.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Storage } from "@plasmohq/storage";
import type { TransactionData } from "~types/transaction";
import '../style.css'; // srcディレクトリにあるグローバルCSSをインポート
import { dummyTransactions } from '../background/dummyTransactions';

const storage = new Storage({ area: "local" });

const categoryColorMapping: Record<string, string> = {
  '食費': '#34D399',
  '旅費交通費': '#60A5FA',
  '消耗品費': '#FBBF24',
  '娯楽費': '#A78BFA',
  '住居費': '#F87171',
  'その他': '#9CA3AF',
};

function getHexColorForCategory(categoryName: string): string {
  const normalizedCategory = categoryName.toLowerCase().trim();
  for (const key in categoryColorMapping) {
    if (normalizedCategory.includes(key.toLowerCase().trim())) {
      return categoryColorMapping[key];
    }
  }
  return categoryColorMapping['その他'] || '#9CA3AF';
}

interface CategorySummary {
  name: string;
  totalAmount: number;
  percentage: number;
  color: string;
}

function ReportPage() {
  const [allTransactions, setAllTransactions] = useState<TransactionData[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameFromQuery = params.get("fileName");
    const statusFromQuery = params.get("status");

    setFileName(nameFromQuery || "（ファイル名不明）");

    if (!nameFromQuery) {
      setStatusMessage("ファイルが指定されていません。共通のダミーデータを表示します。");
      setAllTransactions(dummyTransactions);
      setLoading(false);
      return;
    }

    setStatusMessage(`ファイル「${nameFromQuery}」のデータを処理中... (ステータス: ${statusFromQuery || '不明'})`);

    if (statusFromQuery) {
      let shouldUseDummy = false;
      let specificMessage = "";
      switch (statusFromQuery) {
        case "pdf_error_used_dummy":
        case "decode_error_used_dummy":
        case "invalid_data_used_dummy":
        case "empty_pdf_used_dummy":
        case "warning_used_dummy":
        case "total_failure":
          shouldUseDummy = true;
          specificMessage = `処理に問題があったため、ダミーデータを表示しています。(${statusFromQuery})`;
          break;
        case "success_from_pdf":
          break;
        default:
          specificMessage = `不明な処理ステータスです (${statusFromQuery})。ストレージのデータを確認します。`;
      }
      if (shouldUseDummy) {
        setStatusMessage(`ファイル「${nameFromQuery}」: ${specificMessage}`);
        setAllTransactions(dummyTransactions);
        setLoading(false);
        return;
      }
    }

    storage.get<TransactionData[]>(nameFromQuery)
      .then(data => {
        if (data && data.length > 0) {
          if (statusFromQuery === "success_from_pdf") {
            setStatusMessage(`ファイル「${nameFromQuery}」のデータを表示しています。`);
          } else {
            const isLikelyDummy = JSON.stringify(data) === JSON.stringify(dummyTransactions);
            if (isLikelyDummy && statusFromQuery !== "success_from_pdf") {
                setStatusMessage(`ファイル「${nameFromQuery}」のデータ処理に問題があったか、データが空だったため、ダミーデータを表示しています。(推定)`);
            } else {
                setStatusMessage(`ファイル「${nameFromQuery}」のデータを表示しています。(ステータス: ${statusFromQuery || 'ストレージから取得'})`);
            }
          }
          setAllTransactions(data);
        } else if (data && data.length === 0) {
          setStatusMessage(`ファイル「${nameFromQuery}」のデータは空でした。ダミーデータを表示します。`);
          setAllTransactions(dummyTransactions);
        } else {
          console.warn(`No data found in storage for key: ${nameFromQuery}. Falling back to dummy data.`);
          setStatusMessage(`ファイル「${nameFromQuery}」のデータが見つかりませんでした。ダミーデータを表示しています。`);
          setAllTransactions(dummyTransactions);
        }
      })
      .catch(err => {
        console.error(`Error fetching data from storage for key "${nameFromQuery}":`, err);
        setError(`データ取得エラー: ${err.message}`);
        setStatusMessage(`ファイル「${nameFromQuery}」のデータ取得に失敗しました。ダミーデータを表示します。`);
        setAllTransactions(dummyTransactions);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTransactions = useMemo(() => {
    if (!searchTerm.trim()) {
      return allTransactions;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allTransactions.filter(tx =>
      tx.summary.toLowerCase().includes(lowerSearchTerm) ||
      (tx.description && tx.description.toLowerCase().includes(lowerSearchTerm)) || // description が null の場合を考慮
      tx.category.toLowerCase().includes(lowerSearchTerm) ||
      (tx.originalLineText && tx.originalLineText.toLowerCase().includes(lowerSearchTerm))
    );
  }, [allTransactions, searchTerm]);

  const { categorySummaries, totalAmount } = useMemo(() => {
    const transactionsToSummarize = filteredTransactions;
    if (!transactionsToSummarize || transactionsToSummarize.length === 0) {
      return { categorySummaries: [], totalAmount: 0 };
    }
    const summary: Record<string, number> = {};
    let currentTotal = 0;
    transactionsToSummarize.forEach(tx => {
      const category = tx.category || 'その他';
      summary[category] = (summary[category] || 0) + tx.amount;
      currentTotal += tx.amount;
    });
    const summariesData: CategorySummary[] = Object.entries(summary)
      .map(([name, amount]) => ({
        name,
        totalAmount: amount,
        percentage: currentTotal > 0 ? (amount / currentTotal) * 100 : 0,
        color: getHexColorForCategory(name)
      }))
      .sort((a, b) => b.totalAmount - a.totalAmount);
    return { categorySummaries: summariesData, totalAmount: currentTotal };
  }, [filteredTransactions]);

  // ドーナツグラフ描画ヘルパー
  // cx, cy: 中心座標, radius: 外側半径, startAngleRad: 開始角度(ラジアン), endAngleRad: 終了角度(ラジアン), thickness: ドーナツの太さ
  const getArcPath = (
    cx: number, cy: number, radius: number, startAngleRad: number, endAngleRad: number, thickness: number
  ): string => {
    const startOuterX = cx + radius * Math.cos(startAngleRad);
    const startOuterY = cy + radius * Math.sin(startAngleRad);
    const endOuterX = cx + radius * Math.cos(endAngleRad);
    const endOuterY = cy + radius * Math.sin(endAngleRad);

    const innerRadius = radius - thickness;
    // 内側の円弧の開始点と終了点は、描画方向を合わせるために角度を逆にすることがあります。
    // ここでは、外側と同じ方向で計算し、パスのLコマンドでつなぎ、内側の円弧は逆向きに描くようにAコマンドのsweep-flagを調整します。
    const startInnerX = cx + innerRadius * Math.cos(endAngleRad);
    const startInnerY = cy + innerRadius * Math.sin(endAngleRad);
    const endInnerX = cx + innerRadius * Math.cos(startAngleRad);
    const endInnerY = cy + innerRadius * Math.sin(startAngleRad);

    const largeArcFlagOuter = endAngleRad - startAngleRad <= Math.PI ? "0" : "1";
    // 内側の円弧は逆向きに描くので、sweep-flagは外側と反対になることが多いですが、ここでは角度差で決定
    const largeArcFlagInner = endAngleRad - startAngleRad <= Math.PI ? "0" : "1";


    // M -> A (Outer arc) -> L (Line to inner arc start) -> A (Inner arc, reversed) -> Z (Close)
    return [
      `M ${startOuterX} ${startOuterY}`, // Move to outer start
      `A ${radius} ${radius} 0 ${largeArcFlagOuter} 1 ${endOuterX} ${endOuterY}`, // Outer arc
      `L ${startInnerX} ${startInnerY}`, // Line to inner arc start (at end angle of outer)
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlagInner} 0 ${endInnerX} ${endInnerY}`, // Inner arc (drawn from end angle to start angle)
      "Z" // Close path
    ].join(" ");
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg text-gray-700 animate-pulse">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen font-sans">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">家計簿レポート</h1>
        {fileName && <p className="text-sm text-gray-600 mt-1">ファイル: {fileName}</p>}
      </header>

      {statusMessage && (
        <div className={`p-3 mb-4 rounded-md text-sm ${error ? 'bg-red-100 text-red-700' : (statusMessage.includes("ダミー") || statusMessage.includes("失敗") || statusMessage.includes("問題") ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700')}`}>
          {statusMessage}
        </div>
      )}
      {error && (
         <div className="p-3 mb-4 rounded-md text-sm bg-red-100 text-red-700">
            技術的エラー: {error}
         </div>
      )}

      <div className="mb-6">
        <label htmlFor="search-transactions" className="sr-only">取引を検索</label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="search"
            name="search-transactions"
            id="search-transactions"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2.5"
            placeholder="摘要、カテゴリなどで検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredTransactions.length > 0 && totalAmount > 0 && (
        <div className="mb-8 p-4 sm:p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            {searchTerm ? `検索結果 (${filteredTransactions.length}件) の支出カテゴリ割合` : "支出カテゴリ割合"}
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-around gap-4 md:gap-8">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 shrink-0">
              <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                {(() => {
                  let currentAngleRad = 0;
                  const radius = 42; // ドーナツの外側半径
                  const thickness = 16; // ドーナツの太さ
                  const cx = 50; // SVG viewBox の中心 X
                  const cy = 50; // SVG viewBox の中心 Y

                  return categorySummaries.map((segment, index) => {
                    if (segment.percentage === 0) return null;

                    const segmentAngleRad = (segment.percentage / 100) * 2 * Math.PI;
                    const startAngleRad = currentAngleRad;
                    const endAngleRad = currentAngleRad + segmentAngleRad;
                    currentAngleRad += segmentAngleRad;
                    
                    // 最後のセグメントが円を完全に閉じるように微調整
                    // また、endAngleRadがstartAngleRadと全く同じになると円弧が描画されないことがあるので、微小な差をつける
                    const finalEndAngleRad = (index === categorySummaries.length - 1 && Math.abs(currentAngleRad - 2 * Math.PI) < 0.001)
                                           ? 2 * Math.PI - 0.00001 // ごくわずかに小さくして閉じ切る
                                           : endAngleRad - 0.00001; // 通常も微小な差
                    
                    return (
                      <path
                        key={segment.name}
                        d={getArcPath(cx, cy, radius, startAngleRad, finalEndAngleRad, thickness)}
                        fill={segment.color}
                        stroke="#FFFFFF"
                        strokeWidth="0.5" // 0.5px 程度の細い線
                      >
                        <title>{`${segment.name}: ${segment.percentage.toFixed(1)}% (¥${segment.totalAmount.toLocaleString()})`}</title>
                      </path>
                    );
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-xs text-gray-500">{searchTerm ? '検索結果合計' : '合計支出'}</span>
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                  ¥{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="w-full md:max-w-xs lg:max-w-sm mt-4 md:mt-0">
              <ul className="space-y-1.5 text-xs sm:text-sm">
                {categorySummaries.map(cat => (
                  <li key={cat.name} className="flex items-center justify-between p-1.5 rounded hover:bg-gray-100">
                    <div className="flex items-center">
                      <span style={{ backgroundColor: cat.color }} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mr-2 shrink-0"></span>
                      <span className="text-gray-700 truncate max-w-[100px] sm:max-w-[120px]" title={cat.name}>{cat.name}</span>
                    </div>
                    <div className="flex items-baseline ml-2 shrink-0">
                        <span className="font-medium text-gray-800">¥{cat.totalAmount.toLocaleString()}</span>
                        <span className="ml-1.5 text-gray-500">({cat.percentage.toFixed(1)}%)</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {!loading && filteredTransactions.length === 0 && (
         <div className="bg-white shadow-md rounded-lg p-6 text-center mt-8">
            <p className="text-gray-700">
              {searchTerm ? `「${searchTerm}」に一致する取引データは見つかりませんでした。` : "表示する取引データがありません。"}
            </p>
         </div>
      )}

      {!loading && filteredTransactions.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-4 py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日付</th>
                <th scope="col" className="px-4 py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">概要</th>
                <th scope="col" className="px-4 py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">詳細</th>
                <th scope="col" className="px-4 py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">カテゴリ</th>
                <th scope="col" className="px-4 py-3 sm:px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">金額 (円)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((tx, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-800">{tx.date}</td>
                  <td className="px-4 py-4 sm:px-6 text-sm text-gray-800 break-words max-w-[150px] sm:max-w-xs">{tx.summary}</td>
                  <td className="px-4 py-4 sm:px-6 text-sm text-gray-600 break-words max-w-[150px] sm:max-w-xs hidden md:table-cell">{tx.description || '-'}</td> {/* description が null の場合は '-' を表示 */}
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-800">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTailwindCategoryColorClass(tx.category)}`}>
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-800 text-right font-medium">¥{tx.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function getTailwindCategoryColorClass(category: string): string {
  switch (category.toLowerCase().trim()) {
    case '食費':
      return 'bg-emerald-100 text-emerald-800';
    case '旅費交通費':
      return 'bg-blue-100 text-blue-800';
    case '消耗品費':
      return 'bg-amber-100 text-amber-800';
    case '娯楽費':
      return 'bg-violet-100 text-violet-800';
    case '住居費':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default ReportPage;