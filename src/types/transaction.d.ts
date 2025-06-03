// src/types/transaction.d.ts
export interface TransactionData {
  date: string // 例: "2025/01/13"
  summary: string // 摘要の最初の部分 (「、」の前)
  description: string // 摘要の後半部分 (「、」の後)
  category: string // 例: "旅費交通費"
  amount: number // 例: 530
  originalLineText?: string // デバッグ用に元のテキスト行を保持 (任意)
}
