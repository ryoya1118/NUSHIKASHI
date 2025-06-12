import {
  ArrowUpTrayIcon,
  BanknotesIcon,
  BeakerIcon,
  BoltIcon,
  ComputerDesktopIcon, // "computer" に対応するのは "ComputerDesktopIcon"
  GiftIcon,
  HeartIcon,
  HomeIcon,
  MoonIcon,
  ShoppingCartIcon,
  SparklesIcon,
  SunIcon,
  TagIcon,
  TicketIcon,
  WalletIcon
} from "@heroicons/react/24/outline"

// 現在の実装は outline スタイルのようなので、こちらをインポートします

// アイコン名をキー、インポートしたコンポーネントを値とするマップを作成
export const iconMap = {
  home: HomeIcon,
  bolt: BoltIcon,
  wallet: WalletIcon,
  "shopping-cart": ShoppingCartIcon,
  sparkles: SparklesIcon,
  beaker: BeakerIcon,
  gift: GiftIcon,
  heart: HeartIcon,
  ticket: TicketIcon,
  tag: TagIcon,
  banknotes: BanknotesIcon,
  sun: SunIcon,
  moon: MoonIcon,
  computer: ComputerDesktopIcon,
  "arrow-up-tray": ArrowUpTrayIcon
} as const

// 型定義もこのマップから自動的に生成
export type IconName = keyof typeof iconMap
export const iconNames = Object.keys(iconMap) as IconName[]
