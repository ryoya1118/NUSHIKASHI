// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // srcディレクトリ以下のすべてのJS/TS関連ファイル
    "./tabs/**/*.{js,jsx,ts,tsx}" // もしtabsディレクトリがsrcの外にあるなら。あなたの場合はsrcの中なので上記でカバーされます。
    // より具体的に書くなら "./src/tabs/**/*.tsx"
  ],
  darkMode: "class", // Plasmoのドキュメントに合わせて
  theme: {
    extend: {}
  },
  plugins: []
}
