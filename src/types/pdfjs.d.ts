declare module "pdfjs-dist" {
  // GlobalWorkerOptions の型定義を上書きまたは拡張
  export const GlobalWorkerOptions: {
    workerSrc: string
  }

  // getDocument の戻り値の型など、必要な型を定義
  export interface PDFDocumentProxy {
    numPages: number
    getPage: (pageNumber: number) => Promise<PDFPageProxy>
    // 他にも必要なプロパティやメソッドがあれば追加
  }

  export interface PDFPageProxy {
    getTextContent: () => Promise<TextContent>
    // 他にも必要なプロパティやメソッドがあれば追加
  }

  export interface TextContent {
    items: TextItem[]
    // 他にも必要なプロパティやメソッドがあれば追加
  }

  export interface TextItem {
    str: string
    dir: string
    width: number
    height: number
    transform: number[]
    fontName: string
    // 他にも必要なプロパティやメソッドがあれば追加
  }

  // getDocument 関数のシグネチャ
  export function getDocument(src: string | URL | Uint8Array | PDFDataRangeTransport | DocumentInitParameters): PDFDocumentLoadingTask<PDFDocumentProxy>;

  export interface PDFDocumentLoadingTask<T> {
    promise: Promise<T>;
  }

  // 他に必要な型があればここに追加
}