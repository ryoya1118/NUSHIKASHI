// public/offscreen.js

// pdf.mjsがグローバルにpdfjsLibを登録するので、それを使う
const { pdfjsLib } = globalThis

// ワーカーのパスを指定。HTMLからの相対パスなので非常にシンプル。
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs"

// backgroundからのメッセージを受け取るリスナー
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.target === "offscreen" && request.action === "processPdf") {
    ;(async () => {
      const { pdfDataAsBase64, fileName } = request.data
      try {
        const pdfUint8Array = base64ToUint8Array(pdfDataAsBase64)
        const transactions = await processPdfData(pdfUint8Array, fileName)
        // 成功したらbackgroundに結果を返す
        chrome.runtime.sendMessage({
          action: "pdfProcessed",
          success: true,
          data: { transactions, fileName }
        })
      } catch (error) {
        console.error("Error in offscreen PDF processing:", error)
        // 失敗してもbackgroundに通知
        chrome.runtime.sendMessage({
          action: "pdfProcessed",
          success: false,
          error: error.message,
          data: { fileName }
        })
      } finally {
        // 処理が終わったら自分自身を閉じる
        window.close()
      }
    })()
    return true // 非同期応答を示す
  }
})

// --- 以下、background/index.tsから移植したヘルパー関数 ---

function base64ToUint8Array(base64) {
  const binaryString = atob(base64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}

async function processPdfData(pdfUint8ArrayData, fileName) {
  const loadingTask = pdfjsLib.getDocument({ data: pdfUint8ArrayData })
  const pdf = await loadingTask.promise
  console.log(`PDF loaded in Offscreen: ${fileName}, Pages: ${pdf.numPages}`)

  // ここに、あなたの正規表現を使ったテキスト抽出ロジックをそのまま貼り付けます
  // ... (transactionsを生成するループ処理) ...

  return transactions // 抽出したtransactions配列を返す
}
