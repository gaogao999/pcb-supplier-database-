// PCB基板メーカー調査スキーマ（KAGA基板工場調査表 R2 より自動生成）
window.SCHEMA = [
  {
    "section": "会社情報",
    "icon": "building",
    "fields": [
      {
        "id": "f1",
        "label": "従業員",
        "sub": "○○人",
        "example": "1000人"
      },
      {
        "id": "f2",
        "label": "生産キャパシティ",
        "sub": "○○m2/月",
        "example": "20万m2/月"
      },
      {
        "id": "f3",
        "label": "製品のアプリケーション",
        "sub": "○○40%：■■30%：▲▲20％：他10％",
        "example": "車載40%：通信30%：民生20％：他10％"
      },
      {
        "id": "f4",
        "label": "主要顧客",
        "sub": "多い順に5社",
        "example": "SONY、Canon、A社、B社、D社"
      },
      {
        "id": "f5",
        "label": "主な基材メーカー",
        "sub": "FR-4一般材　　  　 Tg＜150℃(TMA)",
        "note": "量産実績のある基材メーカーを全て",
        "example": "Nanya、生益、TUC",
        "material": true
      },
      {
        "id": "f6",
        "label": "主な基材メーカー",
        "sub": "FR-4 High Tg材 　Tg＜150℃(TMA)",
        "note": "量産実績のある基材メーカーを全て",
        "example": "Nanya、生益、TUC",
        "material": true
      },
      {
        "id": "f7",
        "label": "主な基材メーカー",
        "sub": "低誘電材",
        "note": "量産実績のある基材メーカーを全て",
        "example": "EMC、TUC",
        "material": true
      },
      {
        "id": "f8",
        "label": "主な基材メーカー",
        "sub": "アルミ基材",
        "note": "量産実績のある基材メーカーを全て",
        "example": "華正",
        "material": true
      },
      {
        "id": "f9",
        "label": "品質認証",
        "sub": "ISO9001/ISO14001 /IATF16949",
        "note": "取得している品質認証全て",
        "example": "ISO9001/ISO14001 /IATF16949"
      },
      {
        "id": "f10",
        "label": "UL番号",
        "example": "E******"
      }
    ]
  },
  {
    "section": "製造情報",
    "icon": "factory",
    "fields": [
      {
        "id": "f11",
        "label": "最大貫通_層構成",
        "example": "12"
      },
      {
        "id": "f12",
        "label": "最大HDI_層構成",
        "example": "3+8+3　／ 10層Any layer"
      },
      {
        "id": "f13",
        "label": "サブトラクティブ パターン形成工法",
        "sub": "印刷法,テンティング法,半田剥離法",
        "note": "プルダウンから選択してください",
        "example": "テンティング法",
        "opts": [
          "印刷法",
          "テンティング法",
          "半田剥離法"
        ],
        "multi": true
      },
      {
        "id": "f14",
        "label": "セミアディティブ パターン形成工法",
        "sub": "MSAP,SAP",
        "note": "プルダウンから選択してください",
        "example": "MSAP",
        "opts": [
          "MSAP",
          "SAP"
        ],
        "multi": true
      },
      {
        "id": "f15",
        "label": "最大WPNLサイズ",
        "sub": "X ｘ Y mm",
        "example": "500 ｘ 600 mm"
      },
      {
        "id": "f16",
        "label": "最大製品サイズ",
        "sub": "X ｘ Y mm",
        "example": "120 ｘ 120 mm"
      },
      {
        "id": "f17",
        "label": "積層サイズ",
        "sub": "定尺 or WPNLサイズ",
        "note": "プルダウンから選択してください",
        "example": "定尺サイズ",
        "opts": [
          "定尺サイズ",
          "WPNLサイズ"
        ]
      }
    ]
  },
  {
    "section": "厚み",
    "icon": "layers",
    "fields": [
      {
        "id": "f18",
        "label": "板厚",
        "sub": "最小～最大",
        "example": "0.2～2.5mm",
        "spec": {
          "kind": "range",
          "unit": "mm",
          "opts": [
            "0.10",
            "0.15",
            "0.20",
            "0.25",
            "0.30",
            "0.40",
            "0.50",
            "0.60",
            "0.70",
            "0.80",
            "1.00",
            "1.20",
            "1.60",
            "2.00",
            "2.40",
            "2.50",
            "3.00",
            "3.20",
            "4.00",
            "5.00",
            "6.00"
          ]
        }
      },
      {
        "id": "f19",
        "label": "最小コア厚み",
        "sub": "最小コア＋銅箔/銅箔um",
        "example": "50um+12/12um",
        "spec": {
          "kind": "parts",
          "parts": [
            {
              "key": "core",
              "label": "コア",
              "unit": "um",
              "opts": [
                "30",
                "40",
                "50",
                "60",
                "75",
                "100",
                "120",
                "150",
                "200",
                "250",
                "300",
                "400",
                "500",
                "600",
                "800",
                "1000"
              ]
            },
            {
              "key": "ct",
              "label": "銅箔(表)",
              "unit": "um",
              "opts": [
                "9",
                "12",
                "18",
                "35",
                "70",
                "105"
              ]
            },
            {
              "key": "cb",
              "label": "銅箔(裏)",
              "unit": "um",
              "opts": [
                "9",
                "12",
                "18",
                "35",
                "70",
                "105"
              ]
            }
          ]
        }
      },
      {
        "id": "f20",
        "label": "最小PP厚み",
        "example": "40um",
        "spec": {
          "kind": "single",
          "unit": "um",
          "opts": [
            "25",
            "30",
            "40",
            "50",
            "60",
            "75",
            "80",
            "100",
            "120",
            "150",
            "180",
            "200"
          ]
        }
      },
      {
        "id": "f21",
        "label": "内層銅箔厚み",
        "sub": "最小～最大oz",
        "example": "1～3oz",
        "spec": {
          "kind": "range",
          "unit": "oz",
          "opts": [
            "1/4",
            "1/3",
            "1/2",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6"
          ]
        }
      },
      {
        "id": "f22",
        "label": "外層銅厚み（銅メッキ込）",
        "sub": "最小～最大oz",
        "example": "1/2～2oz",
        "spec": {
          "kind": "range",
          "unit": "oz",
          "opts": [
            "1/4",
            "1/3",
            "1/2",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6"
          ]
        }
      }
    ]
  },
  {
    "section": "NCドリル加工",
    "icon": "drill",
    "fields": [
      {
        "id": "f23",
        "label": "NCドリル装置メーカー\n保有台数（スピンドル回転数）",
        "sub": "〇〇x□台（△万rpm）\n▲▲x■台（▲万rpm）",
        "example": "HITACHIx50台（200Krpm）\nSchmollx30台（160Krpm）",
        "equip": true
      },
      {
        "id": "f24",
        "label": "ドリルビットメーカー",
        "example": "Union tool",
        "material": true
      },
      {
        "id": "f25",
        "label": "リシャープ方法",
        "note": "プルダウンから選択してください",
        "example": "外注研磨",
        "opts": [
          "自社研磨",
          "外注研磨",
          "使い捨て"
        ]
      },
      {
        "id": "f26",
        "label": "最小THドリル径",
        "sub": "ドリルビット径",
        "example": "φ0.15mm"
      },
      {
        "id": "f27",
        "label": "最小THランド径",
        "sub": "@最小ドリル径",
        "example": "φ0.4mm @ 0.15mm"
      },
      {
        "id": "f28",
        "label": "最小TH間隔",
        "sub": "穴壁間",
        "example": "0.35mm"
      },
      {
        "id": "f29",
        "label": "TH穴ズレ",
        "sub": "@＞Cpk1.33",
        "example": "±0.05mm"
      },
      {
        "id": "f30",
        "label": "最大アスペクト比",
        "example": "8:1"
      }
    ]
  },
  {
    "section": "レーザードリル加工",
    "icon": "zap",
    "fields": [
      {
        "id": "f31",
        "label": "レーザードリル装置メーカー\n保有台数（型番）",
        "sub": "〇〇x□台（型番）\n▲▲x■台（型番）",
        "example": "HITACHIx5台（LUC-2K）\n三菱x10台（GTW6）",
        "equip": true
      },
      {
        "id": "f32",
        "label": "最小レーザーVia径",
        "example": "75um"
      },
      {
        "id": "f33",
        "label": "最小レーザーViaランド径(a)",
        "sub": "@最小レーザーVia径",
        "example": "最小Via径（0.075）＋0.15mm"
      },
      {
        "id": "f34",
        "label": "最小レーザーVia Targetランド径(b)",
        "example": "最小Via径（0.075）＋0.2mm"
      },
      {
        "id": "f35",
        "label": "最小レーザーVia間隔",
        "sub": "Via壁間",
        "example": "0.2mm"
      },
      {
        "id": "f36",
        "label": "Stack Via",
        "note": "プルダウンから選択してください",
        "example": "可 available",
        "opts": [
          "可",
          "不可"
        ]
      },
      {
        "id": "f37",
        "label": "レーザーVia BOTTOM径/TOP径",
        "sub": "●●%以上",
        "example": "80％以上"
      },
      {
        "id": "f38",
        "label": "レーザーVia位置精度",
        "example": "±25um"
      },
      {
        "id": "f39",
        "label": "最大アスペクト比",
        "example": "0.75:1"
      }
    ]
  },
  {
    "section": "デスミア",
    "icon": "droplet",
    "fields": [
      {
        "id": "f40",
        "label": "デスミア設備",
        "sub": "ウェット/ドライ別に、行を追加して登録",
        "desmear": true
      }
    ]
  },
  {
    "section": "無電解銅メッキ",
    "icon": "beaker",
    "fields": [
      {
        "id": "f43",
        "label": "無電解銅メッキ ライン",
        "sub": "ライン(薬液)ごとに行を追加",
        "rowform": {
          "add": "ラインを追加",
          "cols": [
            [
              {
                "key": "maker",
                "label": "薬液メーカー",
                "suggest": true,
                "kind": "chemical"
              }
            ],
            [
              {
                "key": "process",
                "label": "プロセス種類",
                "type": "select",
                "opts": [
                  "PTH",
                  "BH",
                  "PTH+BH",
                  "その他"
                ]
              },
              {
                "key": "model",
                "label": "品番"
              }
            ],
            [
              {
                "key": "config",
                "label": "構成",
                "type": "select",
                "opts": [
                  "水平",
                  "バッチ式"
                ]
              },
              {
                "key": "lines",
                "label": "ライン数",
                "type": "num"
              }
            ],
            [
              {
                "key": "blFreq",
                "label": "バックライト確認頻度"
              }
            ],
            [
              {
                "key": "spec",
                "label": "規格"
              }
            ]
          ]
        }
      },
      {
        "id": "f44",
        "label": "薬液添加（自動 or 手動）",
        "sub": "自動分析装置の有無",
        "example": "ほぼ自動、自動分析装置なし",
        "opts": [
          "自動",
          "手動",
          "半自動"
        ]
      },
      {
        "id": "f48",
        "label": "生産再開後のダミー基板運用ルール",
        "sub": "枚数、ダミー基板の種類、交換頻度",
        "example": "20枚、専用銅張り板（穴あり）\n基材が見えたら交換"
      }
    ]
  },
  {
    "section": "電解銅メッキ",
    "icon": "battery",
    "fields": [
      {
        "id": "f49",
        "label": "電解銅メッキ ライン",
        "sub": "ラインごとに行を追加",
        "rowform": {
          "add": "ラインを追加",
          "cols": [
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "chemical"
              }
            ],
            [
              {
                "key": "model",
                "label": "品番"
              }
            ],
            [
              {
                "key": "config",
                "label": "構成",
                "type": "select",
                "opts": [
                  "水平",
                  "VCP",
                  "バッチ"
                ]
              },
              {
                "key": "acc",
                "label": "厚み精度"
              }
            ],
            [
              {
                "key": "minThk",
                "label": "Min製品厚み"
              }
            ]
          ]
        }
      },
      {
        "id": "f53",
        "label": "フィルドメッキ方法",
        "sub": "フィルドメッキのみ or フラッシュ＋フィルドメッキ",
        "note": "プルダウンから選択してください",
        "example": "断面観察/1WPNL/ロット",
        "opts": [
          "フィルドメッキのみ",
          "フラッシュ＋フィルドメッキ"
        ]
      },
      {
        "id": "f54",
        "label": "パルスメッキの有無",
        "note": "プルダウンから選択してください",
        "example": "0.2mm",
        "opts": [
          "有り",
          "無し"
        ]
      }
    ]
  },
  {
    "section": "微細配線・BGA",
    "icon": "git-branch",
    "fields": [
      {
        "id": "f59",
        "label": "貫通_サブトラ",
        "sub": "最小L/S　×　銅厚（銅メッキ込）",
        "example": "60/60 × 40um"
      },
      {
        "id": "f60",
        "label": "貫通_セミアディティブ",
        "sub": "最小L/S　×　銅厚",
        "example": "45/45 × 12um(M-SAP）"
      },
      {
        "id": "f61",
        "label": "HDI_サブトラ",
        "sub": "最小L/S　×　銅厚（銅メッキ込）",
        "example": "50/50 x  23um"
      },
      {
        "id": "f62",
        "label": "HDI_セミアディティブ",
        "sub": "最小L/S　×　銅厚",
        "example": "実績なし"
      },
      {
        "id": "f55",
        "label": "最小BGAピッチ",
        "sub": "中心距離",
        "example": "0.35mm"
      },
      {
        "id": "f56",
        "label": "最小BGAパッドサイズ",
        "example": "0.2mm"
      }
    ]
  },
  {
    "section": "内層ライン",
    "icon": "align-center",
    "fields": [
      {
        "id": "f66",
        "label": "前処理の粗化処理方法",
        "example": "ソフトエッチング",
        "rowform": {
          "add": "ラインを追加",
          "cols": [
            [
              {
                "key": "method",
                "label": "粗化方式",
                "type": "select",
                "opts": [
                  "ソフトエッチング",
                  "ブラシ",
                  "パーミス",
                  "ブラシ＋パーミス",
                  "化学処理",
                  "その他"
                ]
              },
              {
                "key": "qty",
                "label": "台数",
                "type": "num"
              }
            ]
          ]
        }
      },
      {
        "id": "f67",
        "label": "LDI装置メーカー\n保有台数",
        "sub": "メーカー名\n○ライン（合計□台）",
        "example": "●●\n2ライン（合計4台）",
        "equip": true
      },
      {
        "id": "f68",
        "label": "セミオート露光機保有台数",
        "sub": "●台",
        "example": "5台"
      },
      {
        "id": "f69",
        "label": "レジスト",
        "sub": "ドライフィルム/液体レジスト別に行を追加",
        "example": "Dupon、Eternal",
        "rowform": {
          "add": "行を追加",
          "cols": [
            [
              {
                "key": "type",
                "label": "種類",
                "type": "select",
                "opts": [
                  "ドライフィルム",
                  "液体レジスト"
                ]
              }
            ],
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "material"
              },
              {
                "key": "model",
                "label": "型番"
              }
            ],
            [
              {
                "key": "thk",
                "label": "厚み"
              }
            ]
          ]
        }
      },
      {
        "id": "f70",
        "label": "DES（現像/エッチング/剥離）",
        "sub": "方式ごとに行を追加",
        "rowform": {
          "add": "ラインを追加",
          "cols": [
            [
              {
                "key": "type",
                "label": "方式",
                "type": "select",
                "opts": [
                  "バキューム",
                  "2流体",
                  "揺動"
                ]
              }
            ],
            [
              {
                "key": "devTanks",
                "label": "現像槽数",
                "type": "num"
              },
              {
                "key": "etchTanks",
                "label": "エッチング槽数",
                "type": "num"
              }
            ],
            [
              {
                "key": "qty",
                "label": "台数",
                "type": "num"
              }
            ]
          ]
        }
      }
    ]
  },
  {
    "section": "外層ライン",
    "icon": "align-justify",
    "fields": [
      {
        "id": "f72",
        "label": "前処理の粗化処理方法",
        "example": "ソフトエッチング",
        "rowform": {
          "add": "ラインを追加",
          "cols": [
            [
              {
                "key": "method",
                "label": "粗化方式",
                "type": "select",
                "opts": [
                  "ソフトエッチング",
                  "ブラシ",
                  "パーミス",
                  "ブラシ＋パーミス",
                  "化学処理",
                  "その他"
                ]
              },
              {
                "key": "qty",
                "label": "台数",
                "type": "num"
              }
            ]
          ]
        }
      },
      {
        "id": "f73",
        "label": "LDI装置メーカー\n保有台数",
        "sub": "メーカー名\n○ライン（合計□台）",
        "example": "●●\n2ライン（合計4台）",
        "equip": true
      },
      {
        "id": "f74",
        "label": "セミオート露光機保有台数",
        "sub": "●台",
        "example": "5台"
      },
      {
        "id": "f75",
        "label": "レジスト",
        "sub": "ドライフィルム/液体レジスト別に行を追加",
        "example": "Dupon、Eternal",
        "rowform": {
          "add": "行を追加",
          "cols": [
            [
              {
                "key": "type",
                "label": "種類",
                "type": "select",
                "opts": [
                  "ドライフィルム",
                  "液体レジスト"
                ]
              }
            ],
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "material"
              },
              {
                "key": "model",
                "label": "型番"
              }
            ],
            [
              {
                "key": "thk",
                "label": "厚み"
              }
            ]
          ]
        }
      },
      {
        "id": "f76",
        "label": "DES（現像/エッチング/剥離）",
        "sub": "方式ごとに行を追加",
        "rowform": {
          "add": "ラインを追加",
          "cols": [
            [
              {
                "key": "type",
                "label": "方式",
                "type": "select",
                "opts": [
                  "バキューム",
                  "2流体",
                  "揺動"
                ]
              }
            ],
            [
              {
                "key": "devTanks",
                "label": "現像槽数",
                "type": "num"
              },
              {
                "key": "etchTanks",
                "label": "エッチング槽数",
                "type": "num"
              }
            ],
            [
              {
                "key": "qty",
                "label": "台数",
                "type": "num"
              }
            ]
          ]
        }
      }
    ]
  },
  {
    "section": "ソルダーレジスト加工",
    "icon": "shield",
    "fields": [
      {
        "id": "f78",
        "label": "SR前処理の粗化処理方法",
        "example": "ブラシ＋パーミス／ブラシ＋化学処理",
        "opts": [
          "ブラシ＋パーミス",
          "ブラシ＋化学処理",
          "ブラシのみ",
          "化学処理"
        ]
      },
      {
        "id": "f79",
        "label": "インク塗工方法",
        "sub": "スクリーン印刷/スプレーコーター/ロールコーター",
        "example": "スクリーン印刷とスプレーコーター",
        "opts": [
          "スクリーン印刷",
          "スプレーコーター",
          "ロールコーター"
        ],
        "multi": true
      },
      {
        "id": "f80",
        "label": "SRフィルムの有無",
        "note": "プルダウンから選択してください",
        "example": "無し",
        "opts": [
          "有り",
          "無し"
        ]
      },
      {
        "id": "f81",
        "label": "DI露光装置の有無",
        "note": "プルダウンから選択してください",
        "example": "無し",
        "opts": [
          "有り",
          "無し"
        ]
      },
      {
        "id": "f82",
        "label": "セミオート露光機保有台数",
        "sub": "●台",
        "example": "5台"
      },
      {
        "id": "f83",
        "label": "DI装置メーカー\n保有台数",
        "sub": "メーカー名\n○ライン（合計□台）",
        "example": "●●\n2ライン（合計4台）",
        "equip": true
      },
      {
        "id": "f85",
        "label": "SRズレ公差",
        "example": "±0.05mm"
      },
      {
        "id": "f86",
        "label": "SR開口公差",
        "example": "±0.025mm"
      },
      {
        "id": "f87",
        "label": "最小SR開口サイズ",
        "example": "0.050mm"
      },
      {
        "id": "f88",
        "label": "最小SRダム幅",
        "example": "0.1mm"
      },
      {
        "id": "f89",
        "label": "最小抜き文字幅",
        "example": "0.15mm"
      },
      {
        "id": "f90",
        "label": "アンダーカット量管理の有無",
        "sub": "管理している場合はMax値",
        "example": "25um"
      },
      {
        "id": "f91",
        "label": "使用SR材料",
        "sub": "顧客：メーカー名・品番",
        "example": "SONY：太陽・PSR-2000 SP200HF",
        "material": true
      }
    ]
  },
  {
    "section": "シルク印刷",
    "icon": "type",
    "fields": [
      {
        "id": "f93",
        "label": "インクジェット印刷の可否",
        "sub": "備考欄に使用目的を記載",
        "note": "プルダウンから選択してください",
        "example": "可 available",
        "opts": [
          "可",
          "不可"
        ]
      },
      {
        "id": "f94",
        "label": "印刷方法",
        "sub": "インクジェット/スクリーン",
        "note": "乾燥方法も説明してください",
        "example": "インクジェット、スクリーン",
        "opts": [
          "インクジェット",
          "スクリーン"
        ],
        "multi": true
      },
      {
        "id": "f95",
        "label": "位置精度",
        "example": "±0.05mm"
      },
      {
        "id": "f96",
        "label": "使用シルクインク材料",
        "sub": "色・メーカー名・品番",
        "example": "●●・■",
        "material": true
      },
      {
        "id": "f98",
        "label": "最小文字幅",
        "example": "0.1mm"
      }
    ]
  },
  {
    "section": "外形加工",
    "icon": "scissors",
    "fields": [
      {
        "id": "f99",
        "label": "ルーター加工精度",
        "example": "±0.1mm"
      },
      {
        "id": "f100",
        "label": "金型パンチの有無",
        "note": "プルダウンから選択してください",
        "example": "無し",
        "opts": [
          "有り",
          "無し"
        ]
      },
      {
        "id": "f101",
        "label": "端面THの対応可否",
        "sub": "可能な場合は方法を備考に記載",
        "example": "可、半田剥離法で対応",
        "opts": [
          "可",
          "不可"
        ]
      }
    ]
  },
  {
    "section": "表面処理",
    "icon": "sparkles",
    "fields": [
      {
        "id": "f102",
        "label": "OSP可否",
        "note": "プルダウンから選択してください",
        "example": "可 available",
        "opts": [
          "可",
          "不可"
        ]
      },
      {
        "id": "f103",
        "label": "┗OSPメーカーと材料名",
        "example": "Entek Plus HT",
        "material": true
      },
      {
        "id": "f104",
        "label": "OSPでの実装品質保証期間",
        "example": "6か月"
      },
      {
        "id": "f105",
        "label": "無電解Ni/Auメッキ製造可否",
        "note": "プルダウンから選択してください",
        "example": "可 available",
        "opts": [
          "可",
          "不可"
        ]
      },
      {
        "id": "f106",
        "label": "無電解Ni/Auメッキでの実装品質保証期間",
        "example": "1年"
      },
      {
        "id": "f107",
        "label": "電解Auメッキ（ハード）製造可否",
        "sub": "純度 99.9%",
        "note": "プルダウンから選択してください",
        "example": "不可 not available",
        "opts": [
          "可",
          "不可"
        ]
      },
      {
        "id": "f108",
        "label": "電解Auメッキ（ソフト）製造可否",
        "sub": "純度 99.99％",
        "note": "プルダウンから選択してください",
        "example": "不可 not available",
        "opts": [
          "可",
          "不可"
        ]
      },
      {
        "id": "f109",
        "label": "無電解NiPdAuメッキ　製造可否",
        "note": "プルダウンから選択してください",
        "example": "可 available",
        "opts": [
          "可",
          "不可"
        ]
      },
      {
        "id": "f110",
        "label": "無電解Snメッキ　製造可否",
        "note": "プルダウンから選択してください",
        "example": "可 available",
        "opts": [
          "可",
          "不可"
        ]
      },
      {
        "id": "f111",
        "label": "その他特殊メッキ",
        "note": "その他 保有するメッキ処理を記載",
        "example": "無電解Agメッキ、カーボン印刷"
      }
    ]
  },
  {
    "section": "品質確認",
    "icon": "check-circle",
    "fields": [
      {
        "id": "f112",
        "label": "露光工程の部屋のクリーン度",
        "sub": "内層回路",
        "note": "プルダウンから選択してください",
        "example": "クラス　1000",
        "opts": [
          "クラス100",
          "クラス1,000",
          "クラス10,000",
          "クラス100,000",
          "管理なし"
        ]
      },
      {
        "id": "f113",
        "label": "露光工程の部屋のクリーン度",
        "sub": "外層回路",
        "note": "プルダウンから選択してください",
        "example": "クラス　1000",
        "opts": [
          "クラス100",
          "クラス1,000",
          "クラス10,000",
          "クラス100,000",
          "管理なし"
        ]
      },
      {
        "id": "f114",
        "label": "露光工程の部屋のクリーン度",
        "sub": "ソルダーレジスト",
        "note": "プルダウンから選択してください",
        "example": "クラス　10,000",
        "opts": [
          "クラス100",
          "クラス1,000",
          "クラス10,000",
          "クラス100,000",
          "管理なし"
        ]
      },
      {
        "id": "f115",
        "label": "その他のクリーン度",
        "sub": "レイアップ",
        "note": "プルダウンから選択してください",
        "example": "クラス　100",
        "opts": [
          "クラス100",
          "クラス1,000",
          "クラス10,000",
          "クラス100,000",
          "管理なし"
        ]
      },
      {
        "id": "f116",
        "label": "その他のクリーン度",
        "sub": "外観検査",
        "note": "プルダウンから選択してください",
        "example": "クラス　10万",
        "opts": [
          "クラス100",
          "クラス1,000",
          "クラス10,000",
          "クラス100,000",
          "管理なし"
        ]
      },
      {
        "id": "f117",
        "label": "内層回路検査",
        "sub": "検査方法",
        "note": "プルダウンから選択してください",
        "example": "AOI",
        "opts": [
          "AOI",
          "目視",
          "AOI＋目視"
        ]
      },
      {
        "id": "f118",
        "label": "内層回路検査",
        "sub": "AOI SCANの方法",
        "example": "インライン",
        "opts": [
          "インライン",
          "オフライン"
        ]
      },
      {
        "id": "f119",
        "label": "内層回路検査",
        "sub": "頻度",
        "note": "プルダウンから選択してください",
        "example": "抜き取り Random inspection",
        "opts": [
          "全数",
          "抜き取り"
        ]
      },
      {
        "id": "f120",
        "label": "内層回路検査",
        "sub": "抜き取りの場合の単位",
        "note": "単位を明記してください",
        "example": "パネル",
        "opts": [
          "パネル",
          "ロット",
          "枚"
        ]
      },
      {
        "id": "f121",
        "label": "内層回路検査",
        "sub": "AOIの分解能（最小検出幅）",
        "example": "20um"
      },
      {
        "id": "f122",
        "label": "内層回路検査",
        "sub": "Verify画面のロックタイマー時間",
        "example": "0.5秒"
      },
      {
        "id": "f123",
        "label": "内層回路検査",
        "sub": "Verify画面の倍率",
        "example": "50倍"
      },
      {
        "id": "f124",
        "label": "外層回路検査",
        "sub": "検査方法",
        "note": "プルダウンから選択してください",
        "example": "目視 Visual check only",
        "opts": [
          "AOI",
          "目視",
          "AOI＋目視"
        ]
      },
      {
        "id": "f125",
        "label": "外層回路検査",
        "sub": "AOI SCANの方法",
        "example": "インライン",
        "opts": [
          "インライン",
          "オフライン"
        ]
      },
      {
        "id": "f126",
        "label": "外層回路検査",
        "sub": "頻度",
        "note": "プルダウンから選択してください",
        "example": "抜き取り Random inspection",
        "opts": [
          "全数",
          "抜き取り"
        ]
      },
      {
        "id": "f127",
        "label": "外層回路検査",
        "sub": "抜き取りの場合の単位",
        "note": "単位を明記してください",
        "example": "パネル",
        "opts": [
          "パネル",
          "ロット",
          "枚"
        ]
      },
      {
        "id": "f128",
        "label": "外層回路検査",
        "sub": "AOIの分解能（最小検出幅）",
        "example": "20um"
      },
      {
        "id": "f129",
        "label": "外層回路検査",
        "sub": "Verify画面のロックタイマー時間",
        "example": "0.5秒"
      },
      {
        "id": "f130",
        "label": "外層回路検査",
        "sub": "Verify画面の倍率",
        "example": "50倍"
      },
      {
        "id": "f131",
        "label": "無電解銅メッキ",
        "sub": "バックライト検査頻度",
        "example": "毎ロット"
      },
      {
        "id": "f132",
        "label": "電解銅メッキ",
        "sub": "電解銅メッキ後検査方法、頻度",
        "example": "CMI厚み測定：5点/面/5WPNL/ロット\n断面観察：1WPNL/ロット"
      },
      {
        "id": "f133",
        "label": "NCドリル後の穴ズレ検査方法",
        "sub": "検査方法（どの場所）と頻度\nホールチェッカー、X線検査など",
        "example": "ホールチェッカー：最下基板＊全軸\nX線検査：最上基板＊全軸\nフィルム検査：最下＊全軸"
      },
      {
        "id": "f134",
        "label": "レーザーVia検査",
        "sub": "現像後の検査方法",
        "note": "プルダウンから選択してください",
        "example": "目視 Visual check only",
        "opts": [
          "Hole AOI",
          "目視",
          "なし"
        ]
      },
      {
        "id": "f135",
        "label": "レーザーVia検査",
        "sub": "抜き取り頻度",
        "note": "単位を明記してください",
        "example": "0.1"
      },
      {
        "id": "f136",
        "label": "レーザーVia検査",
        "sub": "レーザーVia検査前後のフロー",
        "note": "Hole AOI前後のフローを説明して下さい",
        "example": "ﾚｰｻﾞｰﾄﾞﾘﾙ→ﾌﾟﾗｽﾞﾏ→Hole AOI→ﾃﾞｽﾐｱ/PTH"
      },
      {
        "id": "f137",
        "label": "ソルダーレジスト",
        "sub": "検査方法",
        "note": "単位を明記してください",
        "example": "パネル"
      },
      {
        "id": "f138",
        "label": "ソルダーレジスト",
        "sub": "抜取り頻度",
        "example": "0.1"
      },
      {
        "id": "f139",
        "label": "反り検査",
        "sub": "検査方法",
        "note": "プルダウンから選択してください",
        "example": "目視 Visual check only",
        "opts": [
          "目視",
          "治具測定",
          "自動測定"
        ]
      },
      {
        "id": "f140",
        "label": "反り検査",
        "sub": "頻度",
        "note": "プルダウンから選択してください",
        "example": "抜き取り Random inspection",
        "opts": [
          "全数",
          "抜き取り"
        ]
      },
      {
        "id": "f141",
        "label": "反り検査",
        "sub": "抜き取りの場合の単位",
        "note": "単位を明記してください",
        "example": "パネル",
        "opts": [
          "パネル",
          "ロット",
          "枚"
        ]
      },
      {
        "id": "f142",
        "label": "インピーダンスコントロール",
        "sub": "管理公差",
        "note": "管理公差を明記してください",
        "example": "±10％"
      },
      {
        "id": "f143",
        "label": "電気チェック",
        "sub": "2端子治具対応装置台数",
        "example": "10台"
      },
      {
        "id": "f144",
        "label": "電気チェック",
        "sub": "2端子フライングチェッカー台数",
        "example": "5台"
      },
      {
        "id": "f145",
        "label": "電気チェック",
        "sub": "4端子治具対応装置台数",
        "example": "3台"
      },
      {
        "id": "f146",
        "label": "電気チェック",
        "sub": "4端子フライングチェッカー台数",
        "example": "1台"
      },
      {
        "id": "f147",
        "label": "外観検査",
        "sub": "AVI装置メーカー\n型番/分解能/台数",
        "note": "保有している装置メーカー全て記載\n不足なら行を追加して下さい",
        "example": "白井\nVISPER710SLZ /25um/ 5台",
        "equip": true
      }
    ]
  },
  {
    "section": "梱包方法",
    "icon": "package",
    "fields": [
      {
        "id": "f149",
        "label": "推奨方法",
        "note": "プルダウンから選択してください",
        "example": "プチプチ",
        "opts": [
          "プチプチ",
          "PEパック",
          "アルミパック",
          "真空パック"
        ],
        "multi": true
      },
      {
        "id": "f150",
        "label": "その他の対応可能な方法",
        "note": "プルダウンから選択してください",
        "example": "PEパック、アルミパック",
        "opts": [
          "プチプチ",
          "PEパック",
          "アルミパック",
          "真空パック"
        ],
        "multi": true
      }
    ]
  },
  {
    "section": "その他技術",
    "icon": "settings",
    "fields": [
      {
        "id": "f151",
        "label": "コアレス",
        "note": "プルダウンから選択してください",
        "example": "可 available",
        "opts": [
          "可",
          "不可"
        ]
      },
      {
        "id": "f152",
        "label": "プラズマデスミア処理",
        "note": "プルダウンから選択してください",
        "example": "不可 not available",
        "opts": [
          "可",
          "不可"
        ]
      },
      {
        "id": "f153",
        "label": "バックドリル",
        "note": "プルダウンから選択してください",
        "example": "不可 not available",
        "opts": [
          "可",
          "不可"
        ]
      },
      {
        "id": "f154",
        "label": "リフロースクリーニング可否(出荷前のビア断線確認)",
        "note": "プルダウンから選択してください",
        "example": "可 available",
        "opts": [
          "可",
          "不可"
        ]
      },
      {
        "id": "f155",
        "label": "QR印字対応可否",
        "note": "プルダウンから選択してください",
        "example": "可 available",
        "opts": [
          "可",
          "不可"
        ]
      }
    ]
  }
];
