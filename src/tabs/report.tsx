import React, { useState } from "react"
import { SettingsProvider } from "~contexts/SettingsContext"
import ReportPage from "~components/ReportPage"
import SettingsPage from "~components/SettingsPage"
import "../style.css"

type Page = "report" | "settings"

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("report")

  const navButtonStyle = "flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors"
  const activeNavButtonStyle = "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
  const inactiveNavButtonStyle = "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center">
              <div className="p-1 bg-gray-200 dark:bg-gray-700 rounded-lg flex space-x-1">
                <button
                  onClick={() => setCurrentPage("report")}
                  className={`${navButtonStyle} ${currentPage === "report" ? activeNavButtonStyle : inactiveNavButtonStyle}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" /></svg>
                  レポート
                </button>
                <button
                  onClick={() => setCurrentPage("settings")}
                  className={`${navButtonStyle} ${currentPage === "settings" ? activeNavButtonStyle : inactiveNavButtonStyle}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.532 1.532 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106A1.532 1.532 0 0111.49 3.17zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                  設定
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        {currentPage === "report" && <ReportPage />}
        {currentPage === "settings" && <SettingsPage />}
      </main>
    </div>
  )
}

function ReportTab() {
  return (
    <SettingsProvider>
      <App />
    </SettingsProvider>
  )
}

export default ReportTab