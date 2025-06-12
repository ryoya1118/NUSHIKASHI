import { Storage } from "@plasmohq/storage"

import { dummyTransactions } from "../data/dummyTransactions"

const storage = new Storage({ area: "local" })
const OFFSCREEN_DOCUMENT_PATH = "offscreen/index.html"
let creatingOffscreenDocument: Promise<void> | null = null

async function setupOffscreenDocument() {
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
    documentUrls: [chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH)]
  })

  if (existingContexts.length > 0) {
    return
  }

  if (creatingOffscreenDocument) {
    await creatingOffscreenDocument
  } else {
    creatingOffscreenDocument = chrome.offscreen.createDocument({
      url: OFFSCREEN_DOCUMENT_PATH,
      reasons: [chrome.offscreen.Reason.DOM_PARSER],
      justification: "To parse PDF files"
    })
    await creatingOffscreenDocument
    creatingOffscreenDocument = null
  }
}

async function openReportTab(fileName: string, status: string) {
  const url = new URL(chrome.runtime.getURL("tabs/report.html"))
  url.searchParams.append("fileName", fileName)
  url.searchParams.append("status", status)
  await chrome.tabs.create({ url: url.href })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "processPdf") {
    ;(async () => {
      //   await setupOffscreenDocument()
      //   chrome.runtime.sendMessage({
      //     target: "offscreen",
      //     action: "processPdf",
      //     data: request.data
      //   })
      //   sendResponse({
      //     success: true,
      //     message: "Processing started in offscreen document."
      //   })
      console.log("[DUMMY MODE] PDF processing skipped. Using dummy data.")

      const fileName = request.data?.fileName || "dummy-file.pdf"
      const status = "success_with_dummy_data" // ダミーデータを使ったことがわかるステータス

      await storage.set(fileName, dummyTransactions)
      await openReportTab(fileName, status)

      sendResponse({
        success: true,
        message: "Used dummy data successfully."
      })
    })()
    return true
  }

  if (request.action === "pdfProcessed") {
    ;(async () => {
      const { status, data, error } = request
      const { fileName, transactions } = data

      if (status === "success_from_pdf" && transactions?.length > 0) {
        await storage.set(fileName, transactions)
        await openReportTab(fileName, status)
      } else {
        await storage.set(fileName, dummyTransactions)
        await openReportTab(fileName, status)
      }

      if (error) {
        console.error(`PDF processing failed for ${fileName}:`, error)
      }
    })()
    return false
  }

  return false
})
