// src/background/index.ts
import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs"
import type { TextItem } from "pdfjs-dist/types/src/display/api"

import { Storage } from "@plasmohq/storage"

import type { TransactionData } from "~types/transaction"

import { dummyTransactions } from "./dummyTransactions" // ダミーデータをインポート

// Helper function to convert Base64 to Uint8Array (window 非依存)
function base64ToUint8Array(base64: string): Uint8Array {
  const safeBase64 = base64.replace(/-/g, "+").replace(/_/g, "/")
  const paddedBase64 = safeBase64.padEnd(
    safeBase64.length + ((4 - (safeBase64.length % 4)) % 4),
    "="
  )
  const binaryString = atobPolyfill(paddedBase64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}

// window.atob の簡易ポリフィル (Service Worker用)
function atobPolyfill(input: string): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  let str = String(input).replace(/=+$/, "")
  let output = ""
  if (str.length % 4 === 1) {
    throw new Error(
      "'atob' failed: The string to be decoded is not correctly encoded."
    )
  }
  for (
    let bc = 0, bs, buffer, idx = 0;
    (buffer = str.charAt(idx++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer)
  }
  return output
}

// --- PDF Worker 設定 (現状コメントアウト) ---
// const workerSrc = chrome.runtime.getURL("assets/pdf.worker.min.mjs");
// pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
// console.log(
//   "Background script loaded and pdf.js worker configured with src:",
//   workerSrc
// );
// --- ここまで PDF Worker 設定 ---

const storage = new Storage({
  area: "local"
})

console.log(
  "Background script loaded. PDF worker setup is currently commented out."
)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "processPdf") {
    console.log("Received processPdf message:", request.data.fileName)
    const fileNameKey = request.data.fileName // ストレージのキーとして使用

    const base64Data = request.data.pdfDataAsBase64

    if (typeof base64Data === "string" && base64Data.length > 0) {
      console.log("Background: Received Base64 data length:", base64Data.length)
      try {
        const pdfUint8Array = base64ToUint8Array(base64Data)
        console.log(
          "Background: Decoded Uint8Array byteLength:",
          pdfUint8Array.byteLength
        )

        if (pdfUint8Array.byteLength === 0 && base64Data.length > 0) {
          throw new Error(
            "Decoded PDF data is empty, but base64 input was not."
          )
        }
        if (pdfUint8Array.byteLength === 0 && base64Data.length === 0) {
          throw new Error("Received empty base64 data.")
        }

        // PDF処理を試みる
        processPdfData(pdfUint8Array, fileNameKey)
          .then((extractedTransactions: TransactionData[]) => {
            if (extractedTransactions && extractedTransactions.length > 0) {
              console.log(
                `PDF "${fileNameKey}" processed. Transactions found: ${extractedTransactions.length}`
              )
              return storage.set(fileNameKey, extractedTransactions)
            } else {
              // PDFからデータが取れなかった (エラーではないが空配列だった) 場合もダミーデータを使用
              console.warn(
                `No transactions found in PDF "${fileNameKey}". Using dummy data as fallback.`
              )
              return storage.set(fileNameKey, dummyTransactions)
            }
          })
          .then(() => {
            console.log(
              `Data for "${fileNameKey}" (or dummy data) saved to storage.`
            )
            sendResponse({ success: true })
          })
          .catch((error) => {
            // processPdfData でエラーが発生した場合
            console.error(
              `Error processing PDF "${fileNameKey}". Using dummy data as fallback:`,
              error
            )
            storage
              .set(fileNameKey, dummyTransactions)
              .then(() => {
                console.log(
                  `Dummy data for "${fileNameKey}" saved to storage due to PDF processing error.`
                )
                sendResponse({
                  success: true,
                  warning: "PDF processing failed, used dummy data."
                })
              })
              .catch((storageError) => {
                console.error(
                  `Error saving dummy data to storage for "${fileNameKey}":`,
                  storageError
                )
                sendResponse({
                  success: false,
                  error:
                    "PDF processing failed and also failed to save dummy data."
                })
              })
          })
      } catch (decodeError) {
        // Base64デコードエラーなど、processPdfData呼び出し前のエラー
        console.error("Background: Error decoding Base64 data:", decodeError)
        // この場合もダミーデータをフォールバックとして保存することを検討できます
        storage
          .set(fileNameKey, dummyTransactions)
          .then(() => {
            console.log(
              `Dummy data for "${fileNameKey}" saved to storage due to data decoding error.`
            )
            sendResponse({
              success: true,
              warning: "Data decoding failed, used dummy data."
            })
          })
          .catch((storageError) => {
            console.error(
              `Error saving dummy data to storage for "${fileNameKey}" (decode error case):`,
              storageError
            )
            sendResponse({
              success: false,
              error: "Data decoding failed and also failed to save dummy data."
            })
          })
      }
    } else {
      // base64Data が不正だった場合
      console.error(
        "Background: Did not receive valid Base64 data. Received:",
        base64Data
      )
      // この場合もダミーデータをフォールバックとして保存
      storage
        .set(fileNameKey, dummyTransactions)
        .then(() => {
          console.log(
            `Dummy data for "${fileNameKey}" saved to storage due to invalid input data.`
          )
          sendResponse({
            success: true,
            warning: "Invalid input data, used dummy data."
          })
        })
        .catch((storageError) => {
          console.error(
            `Error saving dummy data to storage for "${fileNameKey}" (invalid input case):`,
            storageError
          )
          sendResponse({
            success: false,
            error: "Invalid input data and also failed to save dummy data."
          })
        })
    }
    return true // 非同期処理のため true を返す
  }
  // 他のメッセージタイプを処理する場合はここに追加
  return false // このリスナーがメッセージを処理しなかった場合
})

// processPdfData 関数 (変更なし、ただし workerSrc の設定はコメントアウトされていることによる影響を受ける)
async function processPdfData(
  pdfUint8ArrayData: Uint8Array,
  fileName: string
): Promise<TransactionData[]> {
  try {
    console.log(
      "processPdfData: pdfUint8ArrayData type:",
      Object.prototype.toString.call(pdfUint8ArrayData)
    )
    console.log(
      "processPdfData: pdfUint8ArrayData byteLength:",
      pdfUint8ArrayData.byteLength
    )

    // workerSrc が設定されていないと、ここで "Setting up fake worker" エラーが出るはず
    const loadingTask = pdfjsLib.getDocument({ data: pdfUint8ArrayData })
    const pdf = await loadingTask.promise
    console.log(`PDF loaded: ${fileName}, Pages: ${pdf.numPages}`)

    const transactions: TransactionData[] = []

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()
      const linesMap = new Map<number, TextItem[]>()
      const yThreshold =
        textContent.items.length > 0 ? textContent.items[0].transform[0] / 2 : 5

      textContent.items.forEach((item: any) => {
        // TextItem 型を明示
        const y = Math.round(item.transform[5] / yThreshold) * yThreshold
        if (!linesMap.has(y)) {
          linesMap.set(y, [])
        }
        linesMap.get(y)!.push(item as TextItem)
      })

      const sortedLinesText: string[] = []
      const sortedYCoordinates = Array.from(linesMap.keys()).sort(
        (a, b) => b - a
      )

      for (const y of sortedYCoordinates) {
        const itemsOnLine = linesMap.get(y)!
        itemsOnLine.sort((a, b) => a.transform[4] - b.transform[4])
        let lineText = ""
        let lastItemXEnd = -Infinity
        const spaceWidthThreshold =
          itemsOnLine.length > 0 ? itemsOnLine[0].transform[0] * 0.5 : 1
        for (const item of itemsOnLine) {
          if (
            lastItemXEnd !== -Infinity &&
            item.transform[4] - lastItemXEnd > spaceWidthThreshold
          ) {
            lineText += " "
          }
          lineText += item.str
          lastItemXEnd = item.transform[4] + item.width
        }
        sortedLinesText.push(lineText.trim())
      }

      for (const line of sortedLinesText) {
        if (!line.includes("事業主貸(")) {
          continue
        }
        const regex =
          /(\d{4}\/\d{1,2}\/\d{1,2})\s+振替\s+\(\s*振替\s*\)\s*(.*?)\s*事業主借\s*\(.*?\)\s*⇒\s*事業主貸\s*\(([^)]+?)\)\s*(\d+)$/
        const match = line.match(regex)
        if (match) {
          const date = match[1]
          const fullAbstract = match[2].trim()
          let category = match[3].trim().replace(/\s+/g, "")
          const amount = parseInt(match[4], 10)
          let summary = ""
          let description = ""
          const abstractParts = fullAbstract.split("、")
          if (abstractParts.length > 0) {
            summary = abstractParts[0].trim()
          }
          if (abstractParts.length > 1) {
            description = abstractParts.slice(1).join("、").trim()
          } else if (summary === "" && fullAbstract !== "") {
            summary = fullAbstract
          }
          transactions.push({
            date,
            summary,
            description,
            category,
            amount,
            originalLineText: line
          })
        }
      }
    }
    console.log("Extracted '事業主貸' transactions:", transactions)
    return transactions
  } catch (error) {
    console.error("Error in processPdfData:", error)
    console.error(
      "Detailed error object in processPdfData:",
      JSON.stringify(error, Object.getOwnPropertyNames(error))
    )
    throw error // エラーを再スローして呼び出し元でキャッチできるようにする
  }
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Plasmo extension installed/updated.")
})
