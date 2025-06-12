import type { IconName } from "~config/icons"

export interface CategorySetting {
  id: string
  name: string
  color: string
  iconName: IconName
  keywords?: string[]
  type: "fixed" | "variable"
}

export interface ThemeSettings {
  mode: "light" | "dark" | "system"
}

export interface AppSettings {
  version: string
  theme: ThemeSettings
  categories: CategorySetting[]
  display: {
    defaultSort: "date_desc" | "date_asc" | "amount_desc"
    itemsPerPage: 25 | 50 | 100
  }
}
