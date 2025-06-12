import React, { useEffect, useState, useMemo } from "react"
import { Storage } from "@plasmohq/storage"
import type { TransactionData } from "~types/transaction"
import { dummyTransactions } from "../data/dummyTransactions"
import { useSettings } from "~contexts/SettingsContext"
import { hexToRgba } from "~lib/utils"
import { Icon } from "./Icon"
import type { IconName } from "~config/icons"

const storage = new Storage({ area: "local" })

interface CategorySummary {
  name: string
  totalAmount: number
  percentage: number
  color: string
  iconName: IconName
}

function ReportPage() {
  const { settings, getCategoryByName, isDarkMode } = useSettings()
  const [allTransactions, setAllTransactions] = useState<TransactionData[]>([])
  const [fileName, setFileName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const nameFromQuery = params.get("fileName")
    setFileName(nameFromQuery || "（ファイル名不明）")
    if (!nameFromQuery) {
      setAllTransactions(dummyTransactions)
      setLoading(false)
      return
    }
    storage
      .get<TransactionData[]>(nameFromQuery)
      .then((data) => {
        if (data && data.length > 0) setAllTransactions(data)
        else setAllTransactions(dummyTransactions)
      })
      .catch(() => setAllTransactions(dummyTransactions))
      .finally(() => setLoading(false))
  }, [])

  const transactionsToDisplay = useMemo(() => {
    const baseTransactions = searchTerm
      ? allTransactions.filter(
          (tx) =>
            tx.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : allTransactions
    if (selectedCategory) {
      return baseTransactions.filter(
        (tx) => getCategoryByName(tx.category).name === selectedCategory
      )
    }
    return baseTransactions
  }, [allTransactions, searchTerm, selectedCategory, getCategoryByName])

  const { categorySummaries, totalAmount } = useMemo(() => {
    if (!allTransactions || allTransactions.length === 0) {
      return { categorySummaries: [], totalAmount: 0 }
    }

    const totalForAllTx = allTransactions.reduce((acc, tx) => acc + tx.amount, 0)
    const summaryMap: Map<string, number> = new Map()

    allTransactions.forEach((tx) => {
      const category = getCategoryByName(tx.category || "雑費")
      summaryMap.set(category.name, (summaryMap.get(category.name) || 0) + tx.amount)
    })

    const filteredTotal = transactionsToDisplay.reduce((acc, tx) => acc + tx.amount, 0)

    const summariesData = settings.categories
      .map((cat): CategorySummary | null => {
        const amount = summaryMap.get(cat.name) || 0
        if (amount === 0) return null
        return {
          name: cat.name,
          totalAmount: amount,
          percentage: totalForAllTx > 0 ? (amount / totalForAllTx) * 100 : 0,
          color: cat.color,
          iconName: cat.iconName
        }
      })
      .filter((s): s is CategorySummary => s !== null)

    return { categorySummaries: summariesData, totalAmount: filteredTotal }
  }, [transactionsToDisplay, allTransactions, settings.categories, getCategoryByName])

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory((prevSelected) =>
      prevSelected === categoryName ? null : categoryName
    )
  }

  const getArcPath = (cx: number, cy: number, radius: number, startAngle: number, endAngle: number, thickness: number): string => {
    const startOuterX = cx + radius * Math.cos(startAngle)
    const startOuterY = cy + radius * Math.sin(startAngle)
    const endOuterX = cx + radius * Math.cos(endAngle)
    const endOuterY = cy + radius * Math.sin(endAngle)
    const innerRadius = radius - thickness
    const startInnerX = cx + innerRadius * Math.cos(endAngle)
    const startInnerY = cy + innerRadius * Math.sin(endAngle)
    const endInnerX = cx + innerRadius * Math.cos(startAngle)
    const endInnerY = cy + innerRadius * Math.sin(startAngle)
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1"
    return `M ${startOuterX} ${startOuterY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endOuterX} ${endOuterY} L ${startInnerX} ${startInnerY} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${endInnerX} ${endInnerY} Z`
  }

  const getCategoryColor = (categoryName: string) => getCategoryByName(categoryName).color

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><p>読み込み中...</p></div>
  }

  const chartStrokeColor = isDarkMode ? "#1f2937" : "#ffffff"
  const radius = 42

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">NUSHIKASHI</h1>
        {fileName && (<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">ファイル: {fileName}</p>)}
      </header>
      <div className="mb-6 flex items-center gap-4">
        <div className="relative rounded-md shadow-sm flex-grow">
          <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="摘要、カテゴリなどで検索..." className="block w-full pl-4 p-2.5 sm:text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:placeholder-gray-400"/>
        </div>
        {selectedCategory && (<button onClick={() => setSelectedCategory(null)} className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition">全カテゴリ表示</button>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">支出内訳</h2>
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto" onMouseLeave={() => setHoveredCategory(null)}>
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {selectedCategory ? (
                (() => {
                  const selectedData = categorySummaries.find(c => c.name === selectedCategory)
                  if (!selectedData) return null;
                  return (
                    <path d={getArcPath(50, 50, radius, 0, 2 * Math.PI - 0.001, 16)} fill={selectedData.color} stroke={chartStrokeColor} strokeWidth="0.5" className="cursor-pointer" onClick={() => handleCategoryClick(selectedCategory)} onMouseEnter={() => setHoveredCategory(selectedCategory)} />
                  )
                })()
              ) : (
                (() => {
                  let cumulativeAngle = 0
                  return categorySummaries.map((segment) => {
                    const segmentAngle = (segment.percentage / 100) * 2 * Math.PI
                    const startAngle = cumulativeAngle
                    cumulativeAngle += segmentAngle
                    const endAngle = cumulativeAngle
                    const opacity = hoveredCategory && hoveredCategory !== segment.name ? 0.3 : 1
                    return (<path key={segment.name} d={getArcPath(50, 50, radius, startAngle, endAngle - 0.005, 16)} fill={segment.color} stroke={chartStrokeColor} strokeWidth="0.5" onClick={() => handleCategoryClick(segment.name)} onMouseEnter={() => setHoveredCategory(segment.name)} className="cursor-pointer transition-opacity duration-200" style={{ opacity }}/>)
                  })
                })()
              )}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
  {(() => {
    // hoveredCategory に対応するカテゴリのサマリーデータを検索
    const hoveredData = hoveredCategory
      ? categorySummaries.find(c => c.name === hoveredCategory)
      : null;

    // selectedCategory に対応するカテゴリのサマリーデータを検索
    const selectedData = selectedCategory
      ? categorySummaries.find(c => c.name === selectedCategory)
      : null;

    // 表示するデータを決定（ホバー > 選択 > 合計の優先順位）
    const displayData = hoveredData || selectedData;

    if (displayData) {
      // ホバーまたは選択されているカテゴリがある場合
      return (
        <>
          <span className="text-xs text-gray-500 dark:text-gray-300 truncate max-w-[90%]">
            {displayData.name}
          </span>
          <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
            ¥{displayData.totalAmount.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({displayData.percentage.toFixed(1)}%)
          </span>
        </>
      );
    } else {
      // 何もホバー/選択されていない場合（デフォルト表示）
      return (
        <>
          <span className="text-xs text-gray-500 dark:text-gray-300">合計支出</span>
          <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
            ¥{totalAmount.toLocaleString()}
          </span>
        </>
      );
    }
  })()}
</div>
          </div>
        </div>
        <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg" onMouseLeave={() => setHoveredCategory(null)}>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">カテゴリ一覧</h2>
          <ul className="space-y-1.5 text-sm">
            {categorySummaries.map((cat) => {
              const opacity = hoveredCategory && hoveredCategory !== cat.name ? 0.5 : 1
              return (
              <li key={cat.name} onClick={() => handleCategoryClick(cat.name)} onMouseEnter={() => setHoveredCategory(cat.name)} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${selectedCategory === cat.name ? "bg-indigo-100 dark:bg-indigo-900/50" : "hover:bg-gray-100 dark:hover:bg-gray-700/50"}`} style={{ opacity }}>
                <div className="flex items-center">
                  <Icon name={cat.iconName} className="w-5 h-5 mr-3 shrink-0" style={{ color: cat.color }} />
                  <span className="text-gray-700 dark:text-gray-300">{cat.name}</span>
                </div>
                <div className="flex items-baseline ml-2 shrink-0">
                  <span className="font-medium text-gray-800 dark:text-gray-100">¥{cat.totalAmount.toLocaleString()}</span>
                  <span className="ml-2 text-gray-500 dark:text-gray-400 text-xs">({cat.percentage.toFixed(1)}%)</span>
                </div>
              </li>
            )})}
          </ul>
        </div>
      </div>
      <div className="mt-8 overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">日付</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">概要</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">カテゴリ</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">金額 (円)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {transactionsToDisplay.map((tx, index) => (
              <tr key={`${tx.date}-${tx.summary}-${tx.amount}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{tx.date}</td>
                <td className="px-4 py-4 text-sm text-gray-800 dark:text-gray-200 break-words max-w-xs">{tx.summary}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <span style={{ backgroundColor: hexToRgba(getCategoryColor(tx.category), isDarkMode ? 0.25 : 0.15), color: getCategoryColor(tx.category) }} className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {tx.category || "雑費"}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100 text-right font-medium">¥{tx.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReportPage