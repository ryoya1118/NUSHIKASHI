import * as pdfjsLib from "pdfjs-dist"

import type { TransactionData } from "~types/transaction"

pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL("pdf.worker.js")

type PdfProcessRequest = {
  target: "offscreen"
  action: "processPdf"
  data: {
    fileName: string
    pdfDataAsArrayBuffer: ArrayBuffer
  }
}

async function parseTextToTransactions(
  text: string
): Promise<TransactionData[]> {
  const lines = text.split("\n").filter((line) => line.trim() !== "")
  const transactions: TransactionData[] = []

  const regex = /(\d{4}\/\d{2}\/\d{2})\s+([\s\S]+?)\s+([\d,]+)円\s+([\s\S]+)/
  for (const line of lines) {
    const match = line.match(regex)
    if (match) {
      transactions.push({
        date: match[1],
        summary: match[2].trim(),
        amount: parseInt(match[3].replace(/,/g, ""), 10),
        category: match[4].trim(),
        description: "",
        originalLineText: line
      })
    }
  }
  return transactions
}

async function extractTextFromPdf(fileBuffer: ArrayBuffer): Promise<string> {
  const pdf = await pdfjsLib.getDocument({ data: fileBuffer }).promise
  let fullText = ""
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map((item: any) => item.str).join(" ")
    fullText += pageText + "\n"
  }
  return fullText
}

chrome.runtime.onMessage.addListener((request: PdfProcessRequest) => {
  if (request.target !== "offscreen" || request.action !== "processPdf") {
    return
  }

  ;(async () => {
    const { fileName, pdfDataAsArrayBuffer } = request.data
    try {
      const text = await extractTextFromPdf(pdfDataAsArrayBuffer)
      if (!text.trim()) {
        chrome.runtime.sendMessage({
          action: "pdfProcessed",
          status: "empty_pdf_used_dummy",
          data: { fileName }
        })
        return
      }

      const transactions = await parseTextToTransactions(text)

      if (transactions.length === 0) {
        chrome.runtime.sendMessage({
          action: "pdfProcessed",
          status: "invalid_data_used_dummy",
          data: { fileName }
        })
        return
      }

      chrome.runtime.sendMessage({
        action: "pdfProcessed",
        status: "success_from_pdf",
        data: { fileName, transactions }
      })
    } catch (error) {
      console.error("Offscreen PDF processing error:", error)
      chrome.runtime.sendMessage({
        action: "pdfProcessed",
        status: "pdf_error_used_dummy",
        error: error instanceof Error ? error.message : String(error),
        data: { fileName }
      })
    }
  })()

  return true
})
