import type { AppSettings, CategorySetting } from "~types/settings"

import type { IconName } from "./icons"

export const categoryColors: string[] = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#a1a1aa",
  "#71717a"
]

export const defaultCategories: CategorySetting[] = [
  {
    id: "cat_rent",
    name: "地代家賃",
    color: categoryColors[0],
    iconName: "home",
    type: "fixed"
  },
  {
    id: "cat_utilities",
    name: "水道光熱費",
    color: categoryColors[1],
    iconName: "bolt",
    type: "fixed"
  },
  {
    id: "cat_communication",
    name: "通信費",
    color: categoryColors[2],
    iconName: "wallet",
    type: "fixed"
  },
  {
    id: "cat_insurance",
    name: "保険料",
    color: categoryColors[3],
    iconName: "heart",
    type: "fixed"
  },
  {
    id: "cat_food",
    name: "食費",
    color: categoryColors[4],
    iconName: "shopping-cart",
    type: "variable"
  },
  {
    id: "cat_daily",
    name: "日用品費",
    color: categoryColors[5],
    iconName: "tag",
    type: "variable"
  },
  {
    id: "cat_transport",
    name: "旅費交通費",
    color: categoryColors[6],
    iconName: "ticket",
    type: "variable"
  },
  {
    id: "cat_social",
    name: "交際費",
    color: categoryColors[7],
    iconName: "gift",
    type: "variable"
  },
  {
    id: "cat_hobby",
    name: "娯楽費",
    color: categoryColors[8],
    iconName: "beaker",
    type: "variable"
  },
  {
    id: "cat_beauty",
    name: "美容費",
    color: categoryColors[9],
    iconName: "sparkles",
    type: "variable"
  },
  {
    id: "cat_medical",
    name: "医療費",
    color: categoryColors[10],
    iconName: "heart",
    type: "variable"
  },
  {
    id: "cat_special",
    name: "特別費",
    color: categoryColors[11],
    iconName: "gift",
    type: "variable"
  },
  {
    id: "cat_tax",
    name: "税金",
    color: categoryColors[12],
    iconName: "banknotes",
    type: "variable"
  },
  {
    id: "cat_fees",
    name: "支払手数料",
    color: categoryColors[13],
    iconName: "wallet",
    type: "variable"
  },
  {
    id: "cat_misc",
    name: "雑費",
    color: categoryColors[15],
    iconName: "tag",
    type: "variable"
  }
]

export const defaultSettings: AppSettings = {
  version: "1.4.0",
  theme: {
    mode: "system"
  },
  categories: defaultCategories,
  display: {
    defaultSort: "date_desc",
    itemsPerPage: 50
  }
}
