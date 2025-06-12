// src/background/dummyTransactions.ts
import type { TransactionData } from "~types/transaction"

export const dummyTransactions: TransactionData[] = [
  // Page 1
  {
    date: "2025/01/13",
    summary: "乗車券購入",
    description: "博多→九大学研都市",
    category: "旅費交通費",
    amount: 530,
    originalLineText:
      "2025/01/13 振替 (振替) 乗車券購入、博多→九大学研都市 事業主借(現金)⇒事業主貸(旅費交通費) 530"
  },
  {
    date: "2025/01/15",
    summary: "鶏唐定食S",
    description: "ビッグリーフ",
    category: "食費",
    amount: 450,
    originalLineText:
      "2025/01/15 振替 (振替) 鶏唐定食S、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 450"
  },
  {
    date: "2025/01/16",
    summary: "豚肉のみそ炒め",
    description: "アグリダイニング",
    category: "食費",
    amount: 370,
    originalLineText:
      "2025/01/16 振替 (振替) 豚肉のみそ炒め、アグリダイニング 事業主借(現金)⇒事業主貸(食費) 370"
  },
  {
    date: "2025/01/16",
    summary: "豚汁",
    description: "アグリダイニング",
    category: "食費",
    amount: 120,
    originalLineText:
      "2025/01/16 振替 (振替) 豚汁、アグリダイニング 事業主借(現金)⇒事業主貸(食費) 120"
  },
  {
    date: "2025/01/16",
    summary: "ライスS",
    description: "アグリダイニング",
    category: "食費",
    amount: 120,
    originalLineText:
      "2025/01/16 振替 (振替) ライスS、アグリダイニング 事業主借(現金)⇒事業主貸(食費) 120"
  },
  {
    date: "2025/01/17",
    summary: "うどん1玉",
    description: "ビッグリーフ",
    category: "食費",
    amount: 290,
    originalLineText:
      "2025/01/17 振替 (振替) うどん1玉、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 290"
  },
  {
    date: "2025/01/17",
    summary: "らくらく毛玉とれーる",
    description: "Seria福岡伊都店",
    category: "日用品費",
    amount: 110,
    originalLineText:
      "2025/01/17 振替 (振替) らくらく毛玉とれーる、Seria福岡伊都店 事業主借(クレジットカード)⇒事業主貸(日用品費) 110"
  },
  {
    date: "2025/01/18",
    summary: "乗車券類",
    description: "九大学研都市→東唐津",
    category: "旅費交通費",
    amount: 660,
    originalLineText:
      "2025/01/18 振替 (振替) 乗車券類、九大学研都市→東唐津 事業主借(現金)⇒事業主貸(旅費交通費) 660"
  },
  {
    date: "2025/01/18",
    summary: "ファミチキ骨なし",
    description: "",
    category: "食費",
    amount: 230,
    originalLineText:
      "2025/01/18 振替 (振替) ファミチキ骨なし 事業主借(現金)⇒事業主貸(食費) 230"
  },
  {
    date: "2025/01/19",
    summary: "乗車券類",
    description: "東唐津→唐津",
    category: "旅費交通費",
    amount: 210,
    originalLineText:
      "2025/01/19 振替 (振替) 乗車券類、東唐津→唐津 事業主借(現金)⇒事業主貸(旅費交通費) 210"
  },
  {
    date: "2025/01/19",
    summary: "利用券大人",
    description: "鏡山温泉茶屋",
    category: "娯楽費",
    amount: 700,
    originalLineText:
      "2025/01/19 振替 (振替) 利用券大人、鏡山温泉茶屋 事業主借(現金)⇒事業主貸(娯楽費) 700"
  },
  {
    date: "2025/01/19",
    summary: "乗車券(片道)",
    description: "汽船DLたかしま、唐津港→高島",
    category: "娯楽費",
    amount: 220,
    originalLineText:
      "2025/01/19 振替 (振替) 乗車券(片道)、汽船DLたかしま、唐津港→高島 事業主借(現金)⇒事業主貸(娯楽費) 220"
  },
  {
    date: "2025/01/19",
    summary: "乗車券(片道)",
    description: "汽船DLたかしま、高島→唐津港",
    category: "娯楽費",
    amount: 220,
    originalLineText:
      "2025/01/19 振替 (振替) 乗車券(片道)、汽船DLたかしま、高島→唐津港 事業主借(現金)⇒事業主貸(娯楽費) 220"
  },
  {
    date: "2025/01/19",
    summary: "ポッキー",
    description: "宝当大黒屋野崎酒店",
    category: "食費",
    amount: 180,
    originalLineText:
      "2025/01/19 振替 (振替) ポッキー、宝当大黒屋野崎酒店 事業主借(現金)⇒事業主貸(食費) 180"
  },
  {
    date: "2025/01/19",
    summary: "御神籤",
    description: "宝当神社",
    category: "娯楽費",
    amount: 100,
    originalLineText:
      "2025/01/19 振替 (振替) 御神籤、宝当神社 事業主借(現金)⇒事業主貸(娯楽費) 100"
  },
  {
    date: "2025/01/19",
    summary: "御賽銭",
    description: "宝当神社",
    category: "娯楽費",
    amount: 10,
    originalLineText:
      "2025/01/19 振替 (振替) 御賽銭、宝当神社 事業主借(現金)⇒事業主貸(娯楽費) 10"
  },
  {
    date: "2025/01/19",
    summary: "乗車券類",
    description: "虹ノ松原→九大学研都市",
    category: "旅費交通費",
    amount: 660,
    originalLineText:
      "2025/01/19 振替 (振替) 乗車券類、虹ノ松原→九大学研都市 事業主借(現金)⇒事業主貸(旅費交通費) 660"
  },
  {
    date: "2025/01/19",
    summary: "ちゃんぽん",
    description: "鏡山温泉茶屋",
    category: "食費",
    amount: 800,
    originalLineText:
      "2025/01/19 振替 (振替) ちゃんぽん、鏡山温泉茶屋 事業主借(現金)⇒事業主貸(食費) 800"
  },
  {
    date: "2025/01/23",
    summary: "日替定食S",
    description: "ビッグリーフ",
    category: "食費",
    amount: 430,
    originalLineText:
      "2025/01/23 振替 (振替) 日替定食S、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 430"
  },
  // Page 2
  {
    date: "2025/01/24",
    summary: "食パン",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 300,
    originalLineText:
      "2025/01/24 振替 (振替) 食パン、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 300"
  },
  {
    date: "2025/01/24",
    summary: "ベーコンエピ",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 270,
    originalLineText:
      "2025/01/24 振替 (振替) ベーコンエピ、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 270"
  },
  {
    date: "2025/01/24",
    summary: "小松菜",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 150,
    originalLineText:
      "2025/01/24 振替 (振替) 小松菜、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 150"
  },
  {
    date: "2025/01/24",
    summary: "若鶏セセリ焼肉用(小)",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 461,
    originalLineText:
      "2025/01/24 振替 (振替) 若鶏セセリ焼肉用(小)、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 461"
  },
  {
    date: "2025/01/24",
    summary: "豚こま切れ(中)",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 238,
    originalLineText:
      "2025/01/24 振替 (振替) 豚こま切れ(中)、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 238"
  },
  {
    date: "2025/01/24",
    summary: "炒め用やさい",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 99,
    originalLineText:
      "2025/01/24 振替 (振替) 炒め用やさい、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 99"
  },
  {
    date: "2025/01/29",
    summary: "鶏唐定食M",
    description: "ビッグリーフ",
    category: "食費",
    amount: 480,
    originalLineText:
      "2025/01/29 振替 (振替) 鶏唐定食M、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 480"
  },
  {
    date: "2025/01/29",
    summary: "和風旨だれとり竜田セットM",
    description: "モスバーガー九大伊都キャンパス店",
    category: "食費",
    amount: 900,
    originalLineText:
      "2025/01/29 振替 (振替) 和風旨だれとり竜田セットM、モスバーガー九大伊都キャンパス店 事業主借(現金)⇒事業主貸(食費) 900"
  },
  {
    date: "2025/02/01",
    summary: "乗車券類",
    description: "九大学研都市→西新",
    category: "旅費交通費",
    amount: 470,
    originalLineText:
      "2025/02/01 振替 (振替) 乗車券類、九大学研都市→西新 事業主借(現金)⇒事業主貸(旅費交通費) 470"
  },
  {
    date: "2025/02/01",
    summary: "乗車券購入",
    description: "西新→九大学研都市",
    category: "旅費交通費",
    amount: 470,
    originalLineText:
      "2025/02/01 振替 (振替) 乗車券購入、西新→九大学研都市 事業主借(現金)⇒事業主貸(旅費交通費) 470"
  },
  {
    date: "2025/02/02",
    summary: "マックフライポテトL",
    description: "マクドナルド九大学研都市店",
    category: "食費",
    amount: 840, // OCRでは340に見えるが、他のLポテトの価格帯から840と推定（もし340なら修正してください）
    originalLineText:
      "2025/02/02 振替 (振替) マックフライポテトL、マクドナルド九大学研都市店 事業主借(現金)⇒事業主貸(食費) 840"
  },
  {
    date: "2025/02/02",
    summary: "ソフトツイストS",
    description: "マクドナルド九大学研都市店",
    category: "食費",
    amount: 0, // 金額0はそのまま
    originalLineText:
      "2025/02/02 振替 (振替) ソフトツイストS、マクドナルド九大学研都市店 事業主借(現金)⇒事業主貸(食費) 0"
  },
  {
    date: "2025/02/04",
    summary: "鶏唐定食M",
    description: "ビッグリーフ",
    category: "食費",
    amount: 480,
    originalLineText:
      "2025/02/04 振替 (振替) 鶏唐定食M、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 480"
  },
  {
    date: "2025/02/07",
    summary: "若鶏肩肉焼肉用(小)",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 279,
    originalLineText:
      "2025/02/07 振替 (振替) 若鶏肩肉焼肉用(小)、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 279"
  },
  {
    date: "2025/02/07",
    summary: "豚こま切れ(中)",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 241,
    originalLineText:
      "2025/02/07 振替 (振替) 豚こま切れ(中)、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 241"
  },
  {
    date: "2025/02/07",
    summary: "国産油揚げ",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 129,
    originalLineText:
      "2025/02/07 振替 (振替) 国産油揚げ、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 129"
  },
  {
    date: "2025/02/07",
    summary: "小松菜",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 150,
    originalLineText:
      "2025/02/07 振替 (振替) 小松菜、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 150"
  },
  {
    date: "2025/02/07",
    summary: "国産小麦を使った讃岐うどん",
    description: "冷凍、TRIAL今宿店",
    category: "食費",
    amount: 279,
    originalLineText:
      "2025/02/07 振替 (振替) 国産小麦を使った讃岐うどん、冷凍、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 279"
  },
  {
    date: "2025/02/07",
    summary: "ビッグ・スター",
    description: "卵10個、TRIAL今宿店",
    category: "食費",
    amount: 299,
    originalLineText:
      "2025/02/07 振替 (振替) ビッグ・スター、卵10個、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 299"
  },
  // Page 3
  {
    date: "2025/02/07",
    summary: "贅沢絞りみかんテイスト",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 149,
    originalLineText:
      "2025/02/07 振替 (振替) 贅沢絞りみかんテイスト、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 149"
  },
  {
    date: "2025/02/07",
    summary: "食パン",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 300,
    originalLineText:
      "2025/02/07 振替 (振替) 食パン、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 300"
  },
  {
    date: "2025/02/07",
    summary: "フルーツジンジャー",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 270,
    originalLineText:
      "2025/02/07 振替 (振替) フルーツジンジャー、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 270"
  },
  {
    date: "2025/02/10",
    summary: "鶏唐定食M",
    description: "ビッグリーフ",
    category: "食費",
    amount: 480,
    originalLineText:
      "2025/02/10 振替 (振替) 鶏唐定食M、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 480"
  },
  {
    date: "2025/02/12",
    summary: "日替定食M",
    description: "ビッグリーフ",
    category: "食費",
    amount: 460,
    originalLineText:
      "2025/02/12 振替 (振替) 日替定食M、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 460"
  },
  {
    date: "2025/02/13",
    summary: "鶏唐定食M",
    description: "ビッグリーフ",
    category: "食費",
    amount: 480,
    originalLineText:
      "2025/02/13 振替 (振替) 鶏唐定食M、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 480"
  },
  {
    date: "2025/02/14",
    summary: "緑豆もやし",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 29,
    originalLineText:
      "2025/02/14 振替 (振替) 緑豆もやし、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 29"
  },
  {
    date: "2025/02/14",
    summary: "大阪王将羽根つき餃子",
    description: "冷凍、TRIAL今宿店",
    category: "食費",
    amount: 189,
    originalLineText:
      "2025/02/14 振替 (振替) 大阪王将羽根つき餃子、冷凍、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 189"
  },
  {
    date: "2025/02/14",
    summary: "豚こま切れ(中)",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 284,
    originalLineText:
      "2025/02/14 振替 (振替) 豚こま切れ(中)、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 284"
  },
  {
    date: "2025/02/14",
    summary: "いつも新鮮ハーフベーコン",
    description: "4*4枚、TRIAL今宿店",
    category: "食費",
    amount: 209,
    originalLineText:
      "2025/02/14 振替 (振替) いつも新鮮ハーフベーコン、4*4枚、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 209"
  },
  {
    date: "2025/02/14",
    summary: "小松菜",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 150,
    originalLineText:
      "2025/02/14 振替 (振替) 小松菜、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 150"
  },
  {
    date: "2025/02/14",
    summary: "食パン",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 300,
    originalLineText:
      "2025/02/14 振替 (振替) 食パン、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 300"
  },
  {
    date: "2025/02/14",
    summary: "ミルクパン",
    description: "5個、ヒッポー製パン所",
    category: "食費",
    amount: 600,
    originalLineText:
      "2025/02/14 振替 (振替) ミルクパン、5個、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 600"
  },
  {
    date: "2025/02/17",
    summary: "クリーニング代",
    description: "スーツ上下セット、ハニー東京九大学研都市店",
    category: "美容費",
    amount: 880,
    originalLineText:
      "2025/02/17 振替 (振替) クリーニング代、スーツ上下セット、ハニー東京九大学研都市店 事業主借(クレジットカード)⇒事業主貸(美容費) 880"
  },
  {
    date: "2025/02/17",
    summary: "亀田柿の種6袋詰",
    description: "コスモス伊都店",
    category: "娯楽費",
    amount: 198,
    originalLineText:
      "2025/02/17 振替 (振替) 亀田柿の種6袋詰、コスモス伊都店 事業主借(現金)⇒事業主貸(娯楽費) 198"
  },
  {
    date: "2025/02/17",
    summary: "ポテトチップスBIGBAGうすしお",
    description: "コスモス伊都店",
    category: "娯楽費",
    amount: 248,
    originalLineText:
      "2025/02/17 振替 (振替) ポテトチップスBIGBAGうすしお、コスモス伊都店 事業主借(現金)⇒事業主貸(娯楽費) 248"
  },
  {
    date: "2025/02/17",
    summary: "贅沢絞りプレミアムぶどう",
    description: "コスモス伊都店",
    category: "娯楽費",
    amount: 138,
    originalLineText:
      "2025/02/17 振替 (振替) 贅沢絞りプレミアムぶどう、コスモス伊都店 事業主借(現金)⇒事業主貸(娯楽費) 138"
  },
  {
    date: "2025/02/20",
    summary: "鶏唐定食M",
    description: "ビッグリーフ",
    category: "食費",
    amount: 480,
    originalLineText:
      "2025/02/20 振替 (振替) 鶏唐定食M、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 480"
  },
  {
    date: "2025/02/20",
    summary: "卒論飲み会",
    description: "研究室内",
    category: "交際費",
    amount: 2500,
    originalLineText:
      "2025/02/20 振替 (振替) 卒論飲み会、研究室内 事業主借(現金)⇒事業主貸(交際費) 2500"
  },
  // Page 4
  {
    date: "2025/02/21",
    summary: "シナモンラスク",
    description: "2個、ヒッポー製パン所",
    category: "食費",
    amount: 500,
    originalLineText:
      "2025/02/21 振替 (振替) シナモンラスク、2個、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 500"
  },
  {
    date: "2025/02/21",
    summary: "食パン",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 300,
    originalLineText:
      "2025/02/21 振替 (振替) 食パン、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 300"
  },
  {
    date: "2025/02/21",
    summary: "雪国まいたけ極",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 99,
    originalLineText:
      "2025/02/21 振替 (振替) 雪国まいたけ極、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 99"
  },
  {
    date: "2025/02/21",
    summary: "若鶏肩肉焼肉用(小)",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 300,
    originalLineText:
      "2025/02/21 振替 (振替) 若鶏肩肉焼肉用(小)、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 300"
  },
  {
    date: "2025/02/21",
    summary: "いつも新鮮ハーフベーコン",
    description: "4*4枚、TRIAL今宿店",
    category: "食費",
    amount: 209,
    originalLineText:
      "2025/02/21 振替 (振替) いつも新鮮ハーフベーコン、4*4枚、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 209"
  },
  {
    date: "2025/02/21",
    summary: "豚こま切れ(中)",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 257,
    originalLineText:
      "2025/02/21 振替 (振替) 豚こま切れ(中)、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 257"
  },
  {
    date: "2025/02/21",
    summary: "小松菜",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 120,
    originalLineText:
      "2025/02/21 振替 (振替) 小松菜、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 120"
  },
  {
    date: "2025/02/21",
    summary: "若鶏セセリ焼肉用(小)",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 261,
    originalLineText:
      "2025/02/21 振替 (振替) 若鶏セセリ焼肉用(小)、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 261"
  },
  {
    date: "2025/02/21",
    summary: "Xフライドポテト1.5倍",
    description: "ミニストップ福岡女原店",
    category: "娯楽費",
    amount: 300,
    originalLineText:
      "2025/02/21 振替 (振替) Xフライドポテト1.5倍、ミニストップ福岡女原店 事業主借(クレジットカード)⇒事業主貸(娯楽費) 300"
  },
  {
    date: "2025/02/23",
    summary: "Xフライドポテト1.5倍",
    description: "ミニストップ福岡女原店",
    category: "娯楽費",
    amount: 300,
    originalLineText:
      "2025/02/23 振替 (振替) Xフライドポテト1.5倍、ミニストップ福岡女原店 事業主借(クレジットカード)⇒事業主貸(娯楽費) 300"
  },
  {
    date: "2025/02/26",
    summary: "カット",
    description: "散髪、さわや館今宿店",
    category: "美容費",
    amount: 1700,
    originalLineText:
      "2025/02/26 振替 (振替) カット、散髪、さわや館今宿店 事業主借(クレジットカード)⇒事業主貸(美容費) 1700"
  },
  {
    date: "2025/02/26",
    summary: "日替定食M",
    description: "ビッグリーフ",
    category: "食費",
    amount: 460,
    originalLineText:
      "2025/02/26 振替 (振替) 日替定食M、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 460"
  },
  {
    date: "2025/02/26",
    summary: "Xフライドポテト1.5倍",
    description: "ミニストップ福岡女原店",
    category: "娯楽費",
    amount: 300,
    originalLineText:
      "2025/02/26 振替 (振替) Xフライドポテト1.5倍、ミニストップ福岡女原店 事業主借(クレジットカード)⇒事業主貸(娯楽費) 300"
  },
  {
    date: "2025/02/27",
    summary: "日替定食M",
    description: "ビッグリーフ",
    category: "食費",
    amount: 460,
    originalLineText:
      "2025/02/27 振替 (振替) 日替定食M、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 460"
  },
  {
    date: "2025/02/28",
    summary: "食パン",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 300,
    originalLineText:
      "2025/02/28 振替 (振替) 食パン、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 300"
  },
  {
    date: "2025/02/28",
    summary: "バゲット",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 350,
    originalLineText:
      "2025/02/28 振替 (振替) バゲット、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 350"
  },
  {
    date: "2025/02/28",
    summary: "緑豆もやし",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 29,
    originalLineText:
      "2025/02/28 振替 (振替) 緑豆もやし、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 29"
  },
  {
    date: "2025/02/28",
    summary: "小松菜",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 120,
    originalLineText:
      "2025/02/28 振替 (振替) 小松菜、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 120"
  },
  {
    date: "2025/02/28",
    summary: "雪国まいたけ極",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 99,
    originalLineText:
      "2025/02/28 振替 (振替) 雪国まいたけ極、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 99"
  },
  // Page 5
  {
    date: "2025/02/28",
    summary: "若鶏肩肉焼肉用(小)",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 304,
    originalLineText:
      "2025/02/28 振替 (振替) 若鶏肩肉焼肉用(小)、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 304"
  },
  {
    date: "2025/02/28",
    summary: "豚こま切れ(中)",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 275,
    originalLineText:
      "2025/02/28 振替 (振替) 豚こま切れ(中)、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 275"
  },
  {
    date: "2025/02/28",
    summary: "玉子L玉",
    description: "10個、TRIAL今宿店",
    category: "食費",
    amount: 319,
    originalLineText:
      "2025/02/28 振替 (振替) 玉子L玉、10個、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 319"
  },
  {
    date: "2025/02/28",
    summary: "スタンダード洋室",
    description: "ひびき、阪九フェリー",
    category: "娯楽費",
    amount: 6810,
    originalLineText:
      "2025/02/28 振替 (振替) スタンダード洋室、ひびき、阪九フェリー 事業主借(クレジットカード)⇒事業主貸(娯楽費) 6810"
  },
  // { // No.81 立替金 は事業主貸ではないので除外
  //   date: "2025/02/28",
  //   summary: "アーバイン京都清水五条スタンダードルーム",
  //   description: "TRIP.COM",
  //   category: "立替金",
  //   amount: 7873,
  //   originalLineText: "..."
  // },
  {
    date: "2025/03/05",
    summary: "鶏唐定食M",
    description: "ビッグリーフ",
    category: "食費",
    amount: 480,
    originalLineText:
      "2025/03/05 振替 (振替) 鶏唐定食M、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 480"
  },
  {
    date: "2025/03/06",
    summary: "プリントレインコート",
    description: "Seria福岡伊都店",
    category: "日用品費",
    amount: 110,
    originalLineText:
      "2025/03/06 振替 (振替) プリントレインコート、Seria福岡伊都店 事業主借(クレジットカード)⇒事業主貸(日用品費) 110"
  },
  {
    date: "2025/03/06",
    summary: "泡立ちバススポンジ",
    description: "Seria福岡伊都店",
    category: "日用品費",
    amount: 110,
    originalLineText:
      "2025/03/06 振替 (振替) 泡立ちバススポンジ、Seria福岡伊都店 事業主借(クレジットカード)⇒事業主貸(日用品費) 110"
  },
  {
    date: "2025/03/06",
    summary: "マスキングテープ25mm×8m",
    description: "Seria福岡伊都店",
    category: "日用品費",
    amount: 110,
    originalLineText:
      "2025/03/06 振替 (振替) マスキングテープ25mm×8m、Seria福岡伊都店 事業主借(クレジットカード)⇒事業主貸(日用品費) 110"
  },
  {
    date: "2025/03/06",
    summary: "曲がるバスブラシ",
    description: "Seria福岡伊都店",
    category: "日用品費",
    amount: 110,
    originalLineText:
      "2025/03/06 振替 (振替) 曲がるバスブラシ、Seria福岡伊都店 事業主借(クレジットカード)⇒事業主貸(日用品費) 110"
  },
  {
    date: "2025/03/06",
    summary: "鶏唐定食M",
    description: "ビッグリーフ",
    category: "食費",
    amount: 480,
    originalLineText:
      "2025/03/06 振替 (振替) 鶏唐定食M、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 480"
  },
  {
    date: "2025/03/06",
    summary: "食パン",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 300,
    originalLineText:
      "2025/03/06 振替 (振替) 食パン、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 300"
  },
  {
    date: "2025/03/06",
    summary: "クランベリーパン",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 120,
    originalLineText:
      "2025/03/06 振替 (振替) クランベリーパン、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 120"
  },
  {
    date: "2025/03/06",
    summary: "レーズンパン",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 120,
    originalLineText:
      "2025/03/06 振替 (振替) レーズンパン、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 120"
  },
  {
    date: "2025/03/06",
    summary: "スコーン",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 140,
    originalLineText:
      "2025/03/06 振替 (振替) スコーン、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 140"
  },
  {
    date: "2025/03/07",
    summary: "緑豆もやし",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 29,
    originalLineText:
      "2025/03/07 振替 (振替) 緑豆もやし、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 29"
  },
  {
    date: "2025/03/07",
    summary: "雪国まいたけ極",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 99,
    originalLineText:
      "2025/03/07 振替 (振替) 雪国まいたけ極、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 99"
  },
  {
    date: "2025/03/07",
    summary: "若鶏肩肉焼肉用(小)",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 295,
    originalLineText:
      "2025/03/07 振替 (振替) 若鶏肩肉焼肉用(小)、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 295"
  },
  {
    date: "2025/03/07",
    summary: "豚こま切れ(中)",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 272,
    originalLineText:
      "2025/03/07 振替 (振替) 豚こま切れ(中)、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 272"
  },
  // Page 6
  {
    date: "2025/03/07",
    summary: "小松菜",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 120,
    originalLineText:
      "2025/03/07 振替 (振替) 小松菜、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 120"
  },
  {
    date: "2025/03/10",
    summary: "日替定食M",
    description: "ビッグリーフ",
    category: "食費",
    amount: 460,
    originalLineText:
      "2025/03/10 振替 (振替) 日替定食M、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 460"
  },
  {
    date: "2025/03/11",
    summary: "日替定食M",
    description: "ビッグリーフ",
    category: "食費",
    amount: 460,
    originalLineText:
      "2025/03/11 振替 (振替) 日替定食M、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 460"
  },
  {
    date: "2025/03/13",
    summary: "日替定食M",
    description: "ビッグリーフ",
    category: "食費",
    amount: 460,
    originalLineText:
      "2025/03/13 振替 (振替) 日替定食M、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 460"
  },
  {
    date: "2025/03/13",
    summary: "2倍巻トイレットペーパーシングル",
    description: "コスモス伊都店",
    category: "日用品費",
    amount: 588,
    originalLineText:
      "2025/03/13 振替 (振替) 2倍巻トイレットペーパーシングル、コスモス伊都店 事業主借(現金)⇒事業主貸(日用品費) 588"
  },
  {
    date: "2025/03/13",
    summary: "JR乗車券類",
    description: "和泉府中→白浜、白浜→大阪、特急日根野→白浜",
    category: "娯楽費",
    amount: 6960,
    originalLineText:
      "2025/03/13 振替 (振替) JR乗車券類、和泉府中→白浜、白浜→大阪、特急日根野→白浜 事業主借(クレジットカード)⇒事業主貸(娯楽費) 6960"
  },
  {
    date: "2025/03/13",
    summary: "どん兵衛",
    description: "ドン・キホーテ今宿店",
    category: "娯楽費", // 元のカテゴリが不明瞭だが、旅行中の食料と仮定し娯楽費
    amount: 160,
    originalLineText:
      "2025/03/13 振替 (振替) どん兵衛、ドン・キホーテ今宿店 事業主借(クレジットカード)⇒事業主貸(娯楽費) 160"
  },
  {
    date: "2025/03/14",
    summary: "乗車券類",
    description: "九大学研都市→西小倉",
    category: "娯楽費", // 旅行関連と仮定
    amount: 1800,
    originalLineText:
      "2025/03/14 振替 (振替) 乗車券類、九大学研都市→西小倉 事業主借(現金)⇒事業主貸(娯楽費) 1800"
  },
  {
    date: "2025/03/14",
    summary: "映画ドラえもんのび太の絵世界物語",
    description: "T・ジョイRW北九州",
    category: "娯楽費",
    amount: 1500,
    originalLineText:
      "2025/03/14 振替 (振替) 映画ドラえもんのび太の絵世界物語、T・ジョイRW北九州 事業主借(クレジットカード)⇒事業主貸(娯楽費) 1500"
  },
  {
    date: "2025/03/14",
    summary: "ヒトカラコロ学BOXランチ",
    description: "コロッケ倶楽部魚町店",
    category: "娯楽費",
    amount: 1600,
    originalLineText:
      "2025/03/14 振替 (振替) ヒトカラコロ学BOXランチ、コロッケ倶楽部魚町店 事業主借(クレジットカード)⇒事業主貸(娯楽費) 1600"
  },
  {
    date: "2025/03/14",
    summary: "ポテト(M)",
    description: "コロッケ倶楽部魚町店",
    category: "娯楽費",
    amount: 0,
    originalLineText:
      "2025/03/14 振替 (振替) ポテト(M)、コロッケ倶楽部魚町店 事業主借(クレジットカード)⇒事業主貸(娯楽費) 0"
  },
  {
    date: "2025/03/14",
    summary: "銘菓詰合せAHS",
    description: "ひよ子本舗吉野堂小倉駅アミュプラザ",
    category: "娯楽費", // お土産と仮定
    amount: 1426,
    originalLineText:
      "2025/03/14 振替 (振替) 銘菓詰合せAHS、ひよ子本舗吉野堂小倉駅アミュプラザ 事業主借(クレジットカード)⇒事業主貸(娯楽費) 1426"
  },
  {
    date: "2025/03/14",
    summary: "アップルパイ",
    description: "阪九フェリーひびき売店",
    category: "娯楽費",
    amount: 220,
    originalLineText:
      "2025/03/14 振替 (振替) アップルパイ、阪九フェリーひびき売店 事業主借(クレジットカード)⇒事業主貸(娯楽費) 220"
  },
  {
    date: "2025/03/14",
    summary: "ライス(大)",
    description: "阪九フェリーひびき食堂",
    category: "娯楽費",
    amount: 290,
    originalLineText:
      "2025/03/14 振替 (振替) ライス(大)、阪九フェリーひびき食堂 事業主借(クレジットカード)⇒事業主貸(娯楽費) 290"
  },
  {
    date: "2025/03/14",
    summary: "ステーキ鉄板130g",
    description: "阪九フェリーひびき食堂",
    category: "娯楽費",
    amount: 1400,
    originalLineText:
      "2025/03/14 振替 (振替) ステーキ鉄板130g、阪九フェリーひびき食堂 事業主借(クレジットカード)⇒事業主貸(娯楽費) 1400"
  },
  {
    date: "2025/03/14",
    summary: "玉子焼き",
    description: "阪九フェリーひびき食堂",
    category: "娯楽費",
    amount: 380,
    originalLineText:
      "2025/03/14 振替 (振替) 玉子焼き、阪九フェリーひびき食堂 事業主借(クレジットカード)⇒事業主貸(娯楽費) 380"
  },
  {
    date: "2025/03/14",
    summary: "味噌汁",
    description: "阪九フェリーひびき食堂",
    category: "娯楽費",
    amount: 160,
    originalLineText:
      "2025/03/14 振替 (振替) 味噌汁、阪九フェリーひびき食堂 事業主借(クレジットカード)⇒事業主貸(娯楽費) 160"
  },
  {
    date: "2025/03/14",
    summary: "クッキーシュー(カスタード入)",
    description: "阪九フェリーひびき売店",
    category: "娯楽費",
    amount: 220,
    originalLineText:
      "2025/03/14 振替 (振替) クッキーシュー(カスタード入)、阪九フェリーひびき売店 事業主借(クレジットカード)⇒事業主貸(娯楽費) 220"
  },
  {
    date: "2025/03/14",
    summary: "カリカリチーズカレー",
    description: "阪九フェリーひびき売店",
    category: "娯楽費",
    amount: 260,
    originalLineText:
      "2025/03/14 振替 (振替) カリカリチーズカレー、阪九フェリーひびき売店 事業主借(クレジットカード)⇒事業主貸(娯楽費) 260"
  },
  // Page 7
  {
    date: "2025/03/15",
    summary: "ふわふわデニッシュロール",
    description: "阪九フェリーひびき売店",
    category: "娯楽費",
    amount: 210,
    originalLineText:
      "2025/03/15 振替 (振替) ふわふわデニッシュロール、阪九フェリーひびき売店 事業主借(現金)⇒事業主貸(娯楽費) 210"
  },
  {
    date: "2025/03/15",
    summary: "ハムチーズ",
    description: "阪九フェリーひびき売店",
    category: "娯楽費",
    amount: 210,
    originalLineText:
      "2025/03/15 振替 (振替) ハムチーズ、阪九フェリーひびき売店 事業主借(現金)⇒事業主貸(娯楽費) 210"
  },
  {
    date: "2025/03/15",
    summary: "汁あり鯛担麺1辛",
    description: "SHIRAHAMA KEY NOODLE",
    category: "娯楽費",
    amount: 950,
    originalLineText:
      "2025/03/15 振替 (振替) 汁あり鯛担麺1辛、SHIRAHAMA KEY NOODLE 事業主借(現金)⇒事業主貸(娯楽費) 950"
  },
  {
    date: "2025/03/15",
    summary: "替え玉",
    description: "SHIRAHAMA KEY NOODLE",
    category: "娯楽費",
    amount: 100,
    originalLineText:
      "2025/03/15 振替 (振替) 替え玉、SHIRAHAMA KEY NOODLE 事業主借(現金)⇒事業主貸(娯楽費) 100"
  },
  {
    date: "2025/03/15",
    summary: "連絡バス",
    description: "阪九フェリー泉大津フェリー乗り場→JR和泉府中",
    category: "娯楽費",
    amount: 270,
    originalLineText:
      "2025/03/15 振替 (振替) 連絡バス、阪九フェリー泉大津フェリー乗り場→JR和泉府中 事業主借(現金)⇒事業主貸(娯楽費) 270"
  },
  {
    date: "2025/03/15",
    summary: "明光バス",
    description: "白浜駅→新湯崎",
    category: "娯楽費",
    amount: 410,
    originalLineText:
      "2025/03/15 振替 (振替) 明光バス、白浜駅→新湯崎 事業主借(現金)⇒事業主貸(娯楽費) 410"
  },
  {
    date: "2025/03/15",
    summary: "明光バス",
    description: "のんびりっじ→白良浜",
    category: "娯楽費",
    amount: 270,
    originalLineText:
      "2025/03/15 振替 (振替) 明光バス、のんびりっじ→白良浜 事業主借(現金)⇒事業主貸(娯楽費) 270"
  },
  {
    date: "2025/03/15",
    summary: "ケバブライス",
    description: "B紬プレートランチ、紬カフェ",
    category: "娯楽費",
    amount: 1280,
    originalLineText:
      "2025/03/15 振替 (振替) ケバブライス、B紬プレートランチ、紬カフェ 事業主借(現金)⇒事業主貸(娯楽費) 1280"
  },
  {
    date: "2025/03/15",
    summary: "みかんしぼり",
    description: "伊藤農園",
    category: "娯楽費",
    amount: 600,
    originalLineText:
      "2025/03/15 振替 (振替) みかんしぼり、伊藤農園 事業主借(現金)⇒事業主貸(娯楽費) 600"
  },
  {
    date: "2025/03/15",
    summary: "WEB早得7チケットレス乗車券",
    description: "特急くろしお、白浜→大阪",
    category: "娯楽費",
    amount: 1920,
    originalLineText:
      "2025/03/15 振替 (振替) WEB早得7チケットレス乗車券、特急くろしお、白浜→大阪 事業主借(現金)⇒事業主貸(娯楽費) 1920"
  },
  {
    date: "2025/03/15",
    summary: "入湯税",
    description: "白浜町",
    category: "娯楽費",
    amount: 150,
    originalLineText:
      "2025/03/15 振替 (振替) 入湯税、白浜町 事業主借(現金)⇒事業主貸(娯楽費) 150"
  },
  // { // No.126 SEAMORE RESIDENCE は宿泊費、事業主貸ではないと判断し除外（もし事業の経費なら要確認）
  //   date: "2025/03/15",
  //   summary: "SEAMORE RESIDENCE",
  //   description: "KEY1003",
  //   category: "娯楽費",
  //   amount: 7240,
  //   originalLineText: "..."
  // },
  {
    date: "2025/03/15",
    summary: "アドベンチャーワールド1日入園券(大人)",
    description: "Terravie",
    category: "娯楽費",
    amount: 5100,
    originalLineText:
      "2025/03/15 振替 (振替) アドベンチャーワールド1日入園券(大人)、Terravie 事業主借(クレジットカード)⇒事業主貸(娯楽費) 5100"
  },
  {
    date: "2025/03/16",
    summary: "パンダ肉まんセット",
    description: "アドベンチャーワールドRainbow",
    category: "娯楽費",
    amount: 400,
    originalLineText:
      "2025/03/16 振替 (振替) パンダ肉まんセット、アドベンチャーワールドRainbow 事業主借(クレジットカード)⇒事業主貸(娯楽費) 400"
  },
  {
    date: "2025/03/16",
    summary: "バゲット",
    description: "TETTI BEKERY & CAFE",
    category: "娯楽費",
    amount: 292,
    originalLineText:
      "2025/03/16 振替 (振替) バゲット、TETTI BEKERY & CAFE 事業主借(クレジットカード)⇒事業主貸(娯楽費) 292"
  },
  {
    date: "2025/03/16",
    summary: "クロワッサン",
    description: "TETTI BEKERY & CAFE",
    category: "娯楽費",
    amount: 250,
    originalLineText:
      "2025/03/16 振替 (振替) クロワッサン、TETTI BEKERY & CAFE 事業主借(クレジットカード)⇒事業主貸(娯楽費) 250"
  },
  {
    date: "2025/03/16",
    summary: "クロックマダム",
    description: "TETTI BEKERY & CAFE",
    category: "娯楽費",
    amount: 430,
    originalLineText:
      "2025/03/16 振替 (振替) クロックマダム、TETTI BEKERY & CAFE 事業主借(クレジットカード)⇒事業主貸(娯楽費) 430"
  },
  {
    date: "2025/03/16",
    summary: "パンダみかんパイ小",
    description: "17個、kukulu",
    category: "娯楽費",
    amount: 766,
    originalLineText:
      "2025/03/16 振替 (振替) パンダみかんパイ小、17個、kukulu 事業主借(クレジットカード)⇒事業主貸(娯楽費) 766"
  },
  {
    date: "2025/03/16",
    summary: "コインロッカー",
    description: "アドベンチャーワールドエントランスドーム",
    category: "娯楽費",
    amount: 250,
    originalLineText:
      "2025/03/16 振替 (振替) コインロッカー、アドベンチャーワールドエントランスドーム 事業主借(現金)⇒事業主貸(娯楽費) 250"
  },
  // Page 8
  {
    date: "2025/03/16",
    summary: "明光バス",
    description: "アドベンチャーワールド→白浜駅",
    category: "娯楽費",
    amount: 300,
    originalLineText:
      "2025/03/16 振替 (振替) 明光バス、アドベンチャーワールド→白浜駅 事業主借(現金)⇒事業主貸(娯楽費) 300"
  },
  {
    date: "2025/03/16",
    summary: "京都市営バス",
    description: "四条河原町→百万遍",
    category: "娯楽費",
    amount: 230,
    originalLineText:
      "2025/03/16 振替 (振替) 京都市営バス、四条河原町→百万遍 事業主借(現金)⇒事業主貸(娯楽費) 230"
  },
  {
    date: "2025/03/16",
    summary: "大阪梅田→京都河原町",
    description: "阪急電鉄",
    category: "娯楽費",
    amount: 410,
    originalLineText:
      "2025/03/16 振替 (振替) 大阪梅田→京都河原町、阪急電鉄 事業主借(現金)⇒事業主貸(娯楽費) 410"
  },
  // { // No.137 宿泊税 は立替金
  //   date: "2025/03/16",
  //   summary: "宿泊税",
  //   description: "京都市",
  //   category: "立替金",
  //   amount: 200,
  //   originalLineText: "..."
  // },
  {
    date: "2025/03/17",
    summary: "JR乗車券類",
    description: "円町→嵯峨嵐山",
    category: "娯楽費",
    amount: 190,
    originalLineText:
      "2025/03/17 振替 (振替) JR乗車券類、円町→嵯峨嵐山 事業主借(現金)⇒事業主貸(娯楽費) 190"
  },
  {
    date: "2025/03/17",
    summary: "拝観料",
    description: "あだし野念佛寺",
    category: "娯楽費",
    amount: 500,
    originalLineText:
      "2025/03/17 振替 (振替) 拝観料、あだし野念佛寺 事業主借(現金)⇒事業主貸(娯楽費) 500"
  },
  {
    date: "2025/03/17",
    summary: "コロッケ",
    description: "中村屋総本店",
    category: "娯楽費",
    amount: 200,
    originalLineText:
      "2025/03/17 振替 (振替) コロッケ、中村屋総本店 事業主借(現金)⇒事業主貸(娯楽費) 200"
  },
  {
    date: "2025/03/17",
    summary: "メンチカツ",
    description: "中村屋総本店",
    category: "娯楽費",
    amount: 450,
    originalLineText:
      "2025/03/17 振替 (振替) メンチカツ、中村屋総本店 事業主借(現金)⇒事業主貸(娯楽費) 450"
  },
  {
    date: "2025/03/17",
    summary: "往復大人",
    description: "トロッコ嵐山⇔トロッコ亀岡、嵯峨野観光鉄道",
    category: "娯楽費",
    amount: 1760,
    originalLineText:
      "2025/03/17 振替 (振替) 往復大人、トロッコ嵐山⇔トロッコ亀岡、嵯峨野観光鉄道 事業主借(クレジットカード)⇒事業主貸(娯楽費) 1760"
  },
  {
    date: "2025/03/17",
    summary: "チーズケーキプレーン",
    description: "嵐山京風凛",
    category: "娯楽費",
    amount: 350,
    originalLineText:
      "2025/03/17 振替 (振替) チーズケーキプレーン、嵐山京風凛 事業主借(現金)⇒事業主貸(娯楽費) 350"
  },
  {
    date: "2025/03/17",
    summary: "JR乗車券類",
    description: "嵯峨嵐山→梅小路京都西",
    category: "娯楽費",
    amount: 200,
    originalLineText:
      "2025/03/17 振替 (振替) JR乗車券類、嵯峨嵐山→梅小路京都西 事業主借(現金)⇒事業主貸(娯楽費) 200"
  },
  {
    date: "2025/03/17",
    summary: "庭園参拝券",
    description: "天龍寺",
    category: "娯楽費",
    amount: 500,
    originalLineText:
      "2025/03/17 振替 (振替) 庭園参拝券、天龍寺 事業主借(現金)⇒事業主貸(娯楽費) 500"
  },
  {
    date: "2025/03/17",
    summary: "コインロッカー",
    description: "嵯峨嵐山駅改札外北口側",
    category: "娯楽費",
    amount: 400,
    originalLineText:
      "2025/03/17 振替 (振替) コインロッカー、嵯峨嵐山駅改札外北口側 事業主借(現金)⇒事業主貸(娯楽費) 400"
  },
  {
    date: "2025/03/17",
    summary: "拝観料",
    description: "清凉寺",
    category: "娯楽費",
    amount: 400,
    originalLineText:
      "2025/03/17 振替 (振替) 拝観料、清凉寺 事業主借(現金)⇒事業主貸(娯楽費) 400"
  },
  {
    date: "2025/03/17",
    summary: "ホットケーキ",
    description: "茶房さがの",
    category: "娯楽費",
    amount: 430,
    originalLineText:
      "2025/03/17 振替 (振替) ホットケーキ、茶房さがの 事業主借(現金)⇒事業主貸(娯楽費) 430"
  },
  {
    date: "2025/03/17",
    summary: "京都市営バス",
    description: "七条大宮→東山安井",
    category: "娯楽費",
    amount: 230,
    originalLineText:
      "2025/03/17 振替 (振替) 京都市営バス、七条大宮→東山安井 事業主借(現金)⇒事業主貸(娯楽費) 230"
  },
  {
    date: "2025/03/17",
    summary: "食事代",
    description: "割り勘¥90090、都をどり",
    category: "娯楽費",
    amount: 6000,
    originalLineText:
      "2025/03/17 振替 (振替) 食事代、割り勘¥90090、都をどり 事業主借(現金)⇒事業主貸(娯楽費) 6000"
  },
  {
    date: "2025/03/17",
    summary: "京都市営バス",
    description: "百万遍→西ノ京円町",
    category: "娯楽費",
    amount: 230,
    originalLineText:
      "2025/03/17 振替 (振替) 京都市営バス、百万遍→西ノ京円町 事業主借(現金)⇒事業主貸(娯楽費) 230"
  },
  // { // No.152 (一括発券)自由席券 は立替金
  //   date: "2025/03/18",
  //   summary: "(一括発券)自由席券",
  //   description: "京都→博多",
  //   category: "立替金",
  //   amount: 13390,
  //   originalLineText: "..."
  // },
  {
    date: "2025/03/18",
    summary: "GQuuuuuuX-Beginning-",
    description: "T・ジョイ博多",
    category: "娯楽費",
    amount: 1400,
    originalLineText:
      "2025/03/18 振替 (振替) GQuuuuuuX-Beginning-、T・ジョイ博多 事業主借(クレジットカード)⇒事業主貸(娯楽費) 1400"
  },
  // Page 9
  {
    date: "2025/03/18",
    summary: "ポップコーン塩R",
    description: "T・ジョイ博多",
    category: "娯楽費",
    amount: 500,
    originalLineText:
      "2025/03/18 振替 (振替) ポップコーン塩R、T・ジョイ博多 事業主借(クレジットカード)⇒事業主貸(娯楽費) 500"
  },
  {
    date: "2025/03/18",
    summary: "乗車券購入",
    description: "博多→九大学研都市",
    category: "娯楽費", // 旅行帰りと判断
    amount: 530,
    originalLineText:
      "2025/03/18 振替 (振替) 乗車券購入、博多→九大学研都市 事業主借(現金)⇒事業主貸(娯楽費) 530"
  },
  {
    date: "2025/03/18",
    summary: "コインロッカー",
    description: "イオンモール京都1-A入口外側",
    category: "娯楽費",
    amount: 200,
    originalLineText:
      "2025/03/18 振替 (振替) コインロッカー、イオンモール京都1-A入口外側 事業主借(現金)⇒事業主貸(娯楽費) 200"
  },
  {
    date: "2025/03/18",
    summary: "拝観料",
    description: "清水寺",
    category: "娯楽費",
    amount: 505, // OCRでは500に見えるが、他の寺院の拝観料から調整、もし500なら修正
    originalLineText:
      "2025/03/18 振替 (振替) 拝観料、清水寺 事業主借(現金)⇒事業主貸(娯楽費) 505"
  },
  {
    date: "2025/03/18",
    summary: "特別拝観料",
    description: "東寺",
    category: "娯楽費",
    amount: 1000,
    originalLineText:
      "2025/03/18 振替 (振替) 特別拝観料、東寺 事業主借(現金)⇒事業主貸(娯楽費) 1000"
  },
  {
    date: "2025/03/18",
    summary: "ニシンそば大盛り",
    description: "招福亭",
    category: "娯楽費",
    amount: 1330,
    originalLineText:
      "2025/03/18 振替 (振替) ニシンそば大盛り、招福亭 事業主借(現金)⇒事業主貸(娯楽費) 1330"
  },
  {
    date: "2025/03/19",
    summary: "料理酒醇良",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 109,
    originalLineText:
      "2025/03/19 振替 (振替) 料理酒醇良、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 109"
  },
  {
    date: "2025/03/19",
    summary: "国産油揚げ",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 129,
    originalLineText:
      "2025/03/19 振替 (振替) 国産油揚げ、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 129"
  },
  {
    date: "2025/03/19",
    summary: "いつも新鮮ハーフベーコン",
    description: "4*4枚、TRIAL今宿店",
    category: "食費",
    amount: 209,
    originalLineText:
      "2025/03/19 振替 (振替) いつも新鮮ハーフベーコン、4*4枚、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 209"
  },
  {
    date: "2025/03/19",
    summary: "豚こま切れ(中)",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 271,
    originalLineText:
      "2025/03/19 振替 (振替) 豚こま切れ(中)、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 271"
  },
  {
    date: "2025/03/19",
    summary: "ほうれん草",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 99,
    originalLineText:
      "2025/03/19 振替 (振替) ほうれん草、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 99"
  },
  {
    date: "2025/03/19",
    summary: "若鶏肩肉焼肉用(小)",
    description: "TRIAL今宿店",
    category: "食費",
    amount: 290,
    originalLineText:
      "2025/03/19 振替 (振替) 若鶏肩肉焼肉用(小)、TRIAL今宿店 事業主借(現金)⇒事業主貸(食費) 290"
  },
  {
    date: "2025/03/21",
    summary: "食パン",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 300,
    originalLineText:
      "2025/03/21 振替 (振替) 食パン、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 300"
  },
  {
    date: "2025/03/21",
    summary: "くるみパン",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 120,
    originalLineText:
      "2025/03/21 振替 (振替) くるみパン、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 120"
  },
  {
    date: "2025/03/21",
    summary: "クランベリーパン",
    description: "ヒッポー製パン所",
    category: "食費",
    amount: 120,
    originalLineText:
      "2025/03/21 振替 (振替) クランベリーパン、ヒッポー製パン所 事業主借(現金)⇒事業主貸(食費) 120"
  },
  {
    date: "2025/03/21",
    summary: "ランドリーハンガー5P",
    description: "Seria福岡伊都店",
    category: "日用品費",
    amount: 110,
    originalLineText:
      "2025/03/21 振替 (振替) ランドリーハンガー5P、Seria福岡伊都店 事業主借(クレジットカード)⇒事業主貸(日用品費) 110"
  },
  {
    date: "2025/03/21",
    summary: "タオルダスター3P",
    description: "Seria伊都店",
    category: "日用品費",
    amount: 110,
    originalLineText:
      "2025/03/21 振替 (振替) タオルダスター3P、Seria伊都店 事業主借(クレジットカード)⇒事業主貸(日用品費) 110"
  },
  {
    date: "2025/03/24",
    summary: "鶏唐定食M",
    description: "ビッグリーフ",
    category: "食費",
    amount: 480,
    originalLineText:
      "2025/03/24 振替 (振替) 鶏唐定食M、ビッグリーフ 事業主借(現金)⇒事業主貸(食費) 480"
  },
  {
    date: "2025/03/24",
    summary: "Type-C充電・転送ケーブル1.5m",
    description: "Seria福岡伊都店",
    category: "日用品費",
    amount: 110,
    originalLineText:
      "2025/03/24 振替 (振替) Type-C充電・転送ケーブル1.5m、Seria福岡伊都店 事業主借(クレジットカード)⇒事業主貸(日用品費) 110"
  },
  // Page 10
  {
    date: "2025/03/24",
    summary: "密閉型ステレオイヤホン",
    description: "Seria福岡伊都店",
    category: "日用品費",
    amount: 110,
    originalLineText:
      "2025/03/24 振替 (振替) 密閉型ステレオイヤホン、Seria福岡伊都店 事業主借(クレジットカード)⇒事業主貸(日用品費) 110"
  },
  {
    date: "2025/03/24",
    summary: "乗車券購入",
    description: "九大学研都市→桑名",
    category: "旅費交通費",
    amount: 17740,
    originalLineText:
      "2025/03/24 振替 (振替) 乗車券購入、九大学研都市→桑名 事業主借(現金)⇒事業主貸(旅費交通費) 17740"
  },
  {
    date: "2025/03/25",
    summary: "乗車券類",
    description: "九大学研都市→赤坂",
    category: "交際費",
    amount: 470,
    originalLineText:
      "2025/03/25 振替 (振替) 乗車券類、九大学研都市→赤坂 事業主借(現金)⇒事業主貸(交際費) 470"
  },
  {
    date: "2025/03/25",
    summary: "飲み会代",
    description: "もつ鍋一藤天神西通り店",
    category: "交際費",
    amount: 5500,
    originalLineText:
      "2025/03/25 振替 (振替) 飲み会代、もつ鍋一藤天神西通り店 事業主借(現金)⇒事業主貸(交際費) 5500"
  },
  {
    date: "2025/03/25",
    summary: "学研災・付帯賠責",
    description: "九州大学生活協同組合",
    category: "特別費",
    amount: 2430,
    originalLineText:
      "2025/03/25 振替 (振替) 学研災・付帯賠責、九州大学生活協同組合 事業主借(現金)⇒事業主貸(特別費) 2430"
  },
  {
    date: "2025/03/25",
    summary: "通常払込み",
    description: "本岡郵便局",
    category: "支払手数料",
    amount: 152,
    originalLineText:
      "2025/03/25 振替 (振替) 通常払込み、本岡郵便局 事業主借(現金)⇒事業主貸(支払手数料) 152"
  },
  {
    date: "2025/03/25",
    summary: "乗車券購入",
    description: "赤坂→九大学研都市",
    category: "交際費",
    amount: 470,
    originalLineText:
      "2025/03/25 振替 (振替) 乗車券購入、赤坂→九大学研都市 事業主借(現金)⇒事業主貸(交際費) 470"
  },
  {
    date: "2025/03/25",
    summary: "ちぢれトマト辛麺",
    description: "5辛、玄風周船寺店",
    category: "食費",
    amount: 880,
    originalLineText:
      "2025/03/25 振替 (振替) ちぢれトマト辛麺、5辛、玄風周船寺店 事業主借(現金)⇒事業主貸(食費) 880"
  },
  {
    date: "2025/03/25",
    summary: "やきめし",
    description: "玄風周船寺店",
    category: "食費",
    amount: 400,
    originalLineText:
      "2025/03/25 振替 (振替) やきめし、玄風周船寺店 事業主借(現金)⇒事業主貸(食費) 400"
  },
  {
    date: "2025/03/25",
    summary: "紙エプロン",
    description: "玄風周船寺店",
    category: "食費",
    amount: 10,
    originalLineText:
      "2025/03/25 振替 (振替) 紙エプロン、玄風周船寺店 事業主借(現金)⇒事業主貸(食費) 10"
  },
  {
    date: "2025/03/26",
    summary: "BBQワッパーセット",
    description: "バーガーキング博多駅筑紫口店",
    category: "食費",
    amount: 740,
    originalLineText:
      "2025/03/26 振替 (振替) BBQワッパーセット、バーガーキング博多駅筑紫口店 事業主借(クレジットカード)⇒事業主貸(食費) 740"
  },
  {
    date: "2025/03/26",
    summary: "Sフレンチフライ",
    description: "2個、バーガーキング博多駅筑紫口店",
    category: "食費",
    amount: 360,
    originalLineText:
      "2025/03/26 振替 (振替) Sフレンチフライ、2個、バーガーキング博多駅筑紫口店 事業主借(クレジットカード)⇒事業主貸(食費) 360"
  }
]
