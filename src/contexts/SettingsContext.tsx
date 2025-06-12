import React, { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import { Storage } from "@plasmohq/storage"
import type { AppSettings, CategorySetting } from "~types/settings"
import { defaultSettings } from "~config/defaultSettings"

const storage = new Storage({ area: "local" })
const SETTINGS_KEY = "kakeibo_viewer_settings"

interface SettingsContextType {
  settings: AppSettings
  setSettings: (newSettings: Partial<AppSettings>) => Promise<void>
  isLoading: boolean
  getCategoryByName: (name: string) => CategorySetting
  isDarkMode: boolean
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettingsState] = useState<AppSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)

  const isDarkMode =
    settings.theme.mode === "dark" ||
    (settings.theme.mode === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await storage.get<AppSettings>(SETTINGS_KEY)

        if (stored && stored.version === defaultSettings.version) {
          const mergedSettings: AppSettings = {
            ...defaultSettings,
            ...stored,
            theme: { ...defaultSettings.theme, ...stored.theme },
            display: { ...defaultSettings.display, ...stored.display }
          }
          setSettingsState(mergedSettings)
        } else {
          const newSettings = {
            ...defaultSettings,
            theme: stored?.theme || defaultSettings.theme
          }
          setSettingsState(newSettings)
          await storage.set(SETTINGS_KEY, newSettings)
        }
      } catch (error) {
        console.error("Failed to load settings:", error)
        setSettingsState(defaultSettings)
      } finally {
        setIsLoading(false)
      }
    }
    loadSettings()
  }, [])

  const setSettings = async (newSettings: Partial<AppSettings>) => {
    setSettingsState((prev) => {
      const updatedSettings = { ...prev, ...newSettings }
      storage.set(SETTINGS_KEY, updatedSettings)
      return updatedSettings
    })
  }

  const getCategoryByName = (name: string): CategorySetting => {
    const normalizedName = name.toLowerCase().trim()
    const foundByName = settings.categories.find(
      (c) => c.name.toLowerCase().trim() === normalizedName
    )
    if (foundByName) {
      return foundByName
    }
    const miscCategory = settings.categories.find((c) => c.id === "cat_misc")
    if (miscCategory) {
      return miscCategory
    }
    // 最終フォールバック
    return defaultSettings.categories.find((c) => c.id === "cat_misc")!
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-800 dark:text-gray-200">設定を読み込み中...</p>
      </div>
    )
  }

  const value = { settings, setSettings, isLoading, getCategoryByName, isDarkMode }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}