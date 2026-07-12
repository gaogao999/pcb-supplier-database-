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
        "example": "1000人",
        "spec": {
          "kind": "single",
          "unit": "人"
        }
      },
      {
        "id": "f2",
        "label": "生産キャパシティ",
        "sub": "○○m2/月",
        "example": "20万m2/月",
        "spec": {
          "kind": "single",
          "unit": "m²/月"
        }
      },
      {
        "id": "f3",
        "label": "製品のアプリケーション",
        "sub": "分野ごとに行を追加 (比率%)",
        "example": "車載40%：通信30%：民生20％：他10％",
        "rowform": {
          "add": "分野を追加",
          "cols": [
            [
              {
                "key": "seg",
                "label": "分野",
                "type": "select",
                "opts": [
                  "車載",
                  "通信",
                  "民生",
                  "産業",
                  "医療",
                  "サーバー/DC",
                  "航空宇宙",
                  "その他"
                ]
              },
              {
                "key": "pct",
                "label": "比率%",
                "type": "num"
              }
            ]
          ]
        }
      },
      {
        "id": "f4",
        "label": "主要顧客",
        "example": "SONY、Canon、A社、B社、D社",
        "rowform": {
          "add": "顧客を追加",
          "cols": [
            [
              {
                "key": "name",
                "label": "顧客名"
              },
              {
                "key": "tier",
                "label": "系列",
                "type": "select",
                "opts": [
                  "日系",
                  "中国系",
                  "台湾系",
                  "韓国系",
                  "欧米系",
                  "その他"
                ]
              }
            ]
          ]
        }
      },
      {
        "id": "f5",
        "label": "FR-4一般材",
        "note": "量産実績のある基材メーカーを全て",
        "example": "Nanya、生益、TUC",
        "rowform": {
          "add": "メーカーを追加",
          "cols": [
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "material"
              }
            ]
          ]
        }
      },
      {
        "id": "f6",
        "label": "FR-4 High Tg材",
        "note": "量産実績のある基材メーカーを全て",
        "example": "Nanya、生益、TUC",
        "rowform": {
          "add": "メーカーを追加",
          "cols": [
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "material"
              }
            ]
          ]
        }
      },
      {
        "id": "f7",
        "label": "低誘電材",
        "note": "量産実績のある基材メーカーを全て",
        "example": "EMC、TUC",
        "rowform": {
          "add": "メーカーを追加",
          "cols": [
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "material"
              }
            ]
          ]
        }
      },
      {
        "id": "f8",
        "label": "アルミ基材",
        "note": "量産実績のある基材メーカーを全て",
        "example": "華正",
        "rowform": {
          "add": "メーカーを追加",
          "cols": [
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "material"
              }
            ]
          ]
        }
      },
      {
        "id": "f9",
        "label": "品質認証",
        "sub": "ISO9001/ISO14001 /IATF16949",
        "note": "取得している品質認証全て",
        "example": "ISO9001/ISO14001 /IATF16949",
        "opts": [
          "ISO9001",
          "ISO14001",
          "IATF16949",
          "ISO13485",
          "AS9100",
          "UL"
        ],
        "multi": true
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
        "example": "12",
        "spec": {
          "kind": "single",
          "unit": "層",
          "opts": [
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "16",
            "18",
            "20",
            "24",
            "28",
            "32",
            "36",
            "40"
          ]
        }
      },
      {
        "id": "f12",
        "label": "最大HDI_層構成",
        "example": "3+8+3　／ 10層Any layer",
        "spec": {
          "kind": "parts",
          "parts": [
            {
              "key": "bu",
              "label": "ビルドアップ(片側)",
              "unit": "層"
            },
            {
              "key": "core",
              "label": "コア",
              "unit": "層"
            }
          ]
        }
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
        "example": "500 ｘ 600 mm",
        "spec": {
          "kind": "parts",
          "parts": [
            {
              "key": "x",
              "label": "X",
              "unit": "mm"
            },
            {
              "key": "y",
              "label": "Y",
              "unit": "mm"
            }
          ]
        }
      },
      {
        "id": "f16",
        "label": "最大製品サイズ",
        "sub": "X ｘ Y mm",
        "example": "120 ｘ 120 mm",
        "spec": {
          "kind": "parts",
          "parts": [
            {
              "key": "x",
              "label": "X",
              "unit": "mm"
            },
            {
              "key": "y",
              "label": "Y",
              "unit": "mm"
            }
          ]
        }
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
              "key": "foil",
              "label": "銅箔",
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
        "label": "内層/外層 銅箔厚み",
        "sub": "最小～最大oz",
        "example": "1～3oz",
        "spec": {
          "kind": "parts",
          "parts": [
            {
              "key": "inner",
              "label": "内層",
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
            },
            {
              "key": "outer",
              "label": "外層",
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
        "example": "φ0.15mm",
        "spec": {
          "kind": "single",
          "unit": "mm",
          "prefix": "φ"
        }
      },
      {
        "id": "f27",
        "label": "最小THランド径",
        "sub": "@最小ドリル径",
        "example": "φ0.4mm @ 0.15mm",
        "spec": {
          "kind": "parts",
          "parts": [
            {
              "key": "land",
              "label": "ランド径",
              "unit": "mm",
              "prefix": "φ"
            },
            {
              "key": "at",
              "label": "@ドリル径",
              "unit": "mm"
            }
          ]
        }
      },
      {
        "id": "f28",
        "label": "最小TH間隔",
        "sub": "穴壁間",
        "example": "0.35mm",
        "spec": {
          "kind": "single",
          "unit": "mm"
        }
      },
      {
        "id": "f29",
        "label": "TH穴ズレ",
        "sub": "@＞Cpk1.33",
        "example": "±0.05mm",
        "spec": {
          "kind": "single",
          "unit": "mm",
          "prefix": "±"
        }
      },
      {
        "id": "f30",
        "label": "最大アスペクト比",
        "example": "8:1",
        "spec": {
          "kind": "single",
          "unit": ":1"
        }
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
        "example": "75um",
        "spec": {
          "kind": "single",
          "unit": "um"
        }
      },
      {
        "id": "f33",
        "label": "レーザーViaランド径",
        "example": "最小Via径（0.075）＋0.15mm",
        "spec": {
          "kind": "parts",
          "parts": [
            {
              "key": "a",
              "label": "ランド径a",
              "unit": "um"
            },
            {
              "key": "b",
              "label": "Target径b",
              "unit": "um"
            }
          ]
        }
      },
      {
        "id": "f35",
        "label": "最小レーザーVia間隔",
        "sub": "Via壁間",
        "example": "0.2mm",
        "spec": {
          "kind": "single",
          "unit": "mm"
        }
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
        "example": "80％以上",
        "spec": {
          "kind": "single",
          "unit": "%以上"
        }
      },
      {
        "id": "f38",
        "label": "レーザーVia位置精度",
        "example": "±25um",
        "spec": {
          "kind": "single",
          "unit": "um",
          "prefix": "±"
        }
      },
      {
        "id": "f39",
        "label": "最大アスペクト比",
        "example": "0.75:1",
        "spec": {
          "kind": "single",
          "unit": ":1"
        }
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
      },
      {
        "id": "f131",
        "label": "バックライト検査頻度",
        "opts": [
          "毎ロット",
          "抜き取り",
          "全数",
          "その他"
        ]
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
        "example": "60/60 × 40um",
        "spec": {
          "kind": "parts",
          "compact": true,
          "unit": "um",
          "seps": [
            "/",
            "×"
          ],
          "parts": [
            {
              "key": "l",
              "label": "L"
            },
            {
              "key": "s",
              "label": "S"
            },
            {
              "key": "t",
              "label": "銅厚"
            }
          ]
        }
      },
      {
        "id": "f60",
        "label": "貫通_セミアディティブ",
        "sub": "最小L/S　×　銅厚",
        "example": "45/45 × 12um(M-SAP）",
        "spec": {
          "kind": "parts",
          "compact": true,
          "unit": "um",
          "seps": [
            "/",
            "×"
          ],
          "parts": [
            {
              "key": "l",
              "label": "L"
            },
            {
              "key": "s",
              "label": "S"
            },
            {
              "key": "t",
              "label": "銅厚"
            }
          ]
        }
      },
      {
        "id": "f61",
        "label": "HDI_サブトラ",
        "sub": "最小L/S　×　銅厚（銅メッキ込）",
        "example": "50/50 x  23um",
        "spec": {
          "kind": "parts",
          "compact": true,
          "unit": "um",
          "seps": [
            "/",
            "×"
          ],
          "parts": [
            {
              "key": "l",
              "label": "L"
            },
            {
              "key": "s",
              "label": "S"
            },
            {
              "key": "t",
              "label": "銅厚"
            }
          ]
        }
      },
      {
        "id": "f62",
        "label": "HDI_セミアディティブ",
        "sub": "最小L/S　×　銅厚",
        "example": "実績なし",
        "spec": {
          "kind": "parts",
          "compact": true,
          "unit": "um",
          "seps": [
            "/",
            "×"
          ],
          "parts": [
            {
              "key": "l",
              "label": "L"
            },
            {
              "key": "s",
              "label": "S"
            },
            {
              "key": "t",
              "label": "銅厚"
            }
          ]
        }
      },
      {
        "id": "f55",
        "label": "最小BGAピッチ",
        "sub": "中心距離",
        "example": "0.35mm",
        "spec": {
          "kind": "single",
          "unit": "mm"
        }
      },
      {
        "id": "f56",
        "label": "最小BGAパッドサイズ",
        "example": "0.2mm",
        "spec": {
          "kind": "single",
          "unit": "mm"
        }
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
        "id": "f156",
        "label": "ラミネーター",
        "equip": true
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
        "example": "5台",
        "spec": {
          "kind": "single",
          "unit": "台"
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
        "example": "5台",
        "spec": {
          "kind": "single",
          "unit": "台"
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
        "label": "前処理（粗化・台数）",
        "rowform": {
          "add": "ラインを追加",
          "cols": [
            [
              {
                "key": "method",
                "label": "粗化方式",
                "type": "select",
                "opts": [
                  "ブラシ＋パーミス",
                  "ブラシ＋化学処理",
                  "ブラシのみ",
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
        "id": "f79",
        "label": "印刷方法",
        "rowform": {
          "add": "ラインを追加",
          "cols": [
            [
              {
                "key": "method",
                "label": "印刷方法",
                "type": "select",
                "opts": [
                  "スクリーン印刷",
                  "スプレーコーター",
                  "ロールコーター",
                  "インクジェット"
                ]
              }
            ],
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "equip"
              },
              {
                "key": "model",
                "label": "装置名"
              }
            ]
          ]
        }
      },
      {
        "id": "f91",
        "label": "使用インク",
        "rowform": {
          "add": "インクを追加",
          "cols": [
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "material"
              },
              {
                "key": "model",
                "label": "品番"
              }
            ]
          ]
        }
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
        "example": "5台",
        "spec": {
          "kind": "single",
          "unit": "台"
        }
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
        "example": "±0.05mm",
        "spec": {
          "kind": "single",
          "unit": "mm",
          "prefix": "±"
        }
      },
      {
        "id": "f86",
        "label": "SR開口公差",
        "example": "±0.025mm",
        "spec": {
          "kind": "single",
          "unit": "mm",
          "prefix": "±"
        }
      },
      {
        "id": "f87",
        "label": "最小SR開口サイズ",
        "example": "0.050mm",
        "spec": {
          "kind": "single",
          "unit": "mm"
        }
      },
      {
        "id": "f88",
        "label": "最小SRダム幅",
        "example": "0.1mm",
        "spec": {
          "kind": "single",
          "unit": "mm"
        }
      },
      {
        "id": "f89",
        "label": "最小抜き文字幅",
        "example": "0.15mm",
        "spec": {
          "kind": "single",
          "unit": "mm"
        }
      },
      {
        "id": "f90",
        "label": "アンダーカット量管理の有無",
        "sub": "管理している場合はMax値",
        "example": "25um"
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
        "label": "印刷方式",
        "rowform": {
          "add": "ラインを追加",
          "cols": [
            [
              {
                "key": "method",
                "label": "印刷方式",
                "type": "select",
                "opts": [
                  "インクジェット",
                  "スクリーン"
                ]
              }
            ],
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "equip"
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
        "id": "f95",
        "label": "位置精度",
        "example": "±0.05mm",
        "spec": {
          "kind": "single",
          "unit": "mm",
          "prefix": "±"
        }
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
        "example": "0.1mm",
        "spec": {
          "kind": "single",
          "unit": "mm"
        }
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
        "example": "±0.1mm",
        "spec": {
          "kind": "single",
          "unit": "mm",
          "prefix": "±"
        }
      },
      {
        "id": "f157",
        "label": "ルーター装置",
        "equip": true
      },
      {
        "id": "f158",
        "label": "ルータービットメーカー",
        "material": true
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
        "label": "OSP",
        "rowform": {
          "single": true,
          "gate": {
            "key": "avail",
            "show": "可"
          },
          "cols": [
            [
              {
                "key": "avail",
                "label": "可否",
                "opts": [
                  "可",
                  "不可"
                ]
              }
            ],
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "chemical"
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
                  "バッチ",
                  "縦型",
                  "その他"
                ]
              },
              {
                "key": "warr",
                "label": "実装保証",
                "type": "select",
                "opts": [
                  "3か月",
                  "6か月",
                  "1年",
                  "2年"
                ]
              }
            ]
          ]
        }
      },
      {
        "id": "f105",
        "label": "無電解Ni/Au(ENIG)",
        "rowform": {
          "single": true,
          "gate": {
            "key": "avail",
            "show": "可"
          },
          "cols": [
            [
              {
                "key": "avail",
                "label": "可否",
                "opts": [
                  "可",
                  "不可"
                ]
              }
            ],
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "chemical"
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
                  "バッチ",
                  "縦型",
                  "その他"
                ]
              },
              {
                "key": "warr",
                "label": "実装保証",
                "type": "select",
                "opts": [
                  "3か月",
                  "6か月",
                  "1年",
                  "2年"
                ]
              }
            ]
          ]
        }
      },
      {
        "id": "f107",
        "label": "電解Au(ハード)",
        "rowform": {
          "single": true,
          "gate": {
            "key": "avail",
            "show": "可"
          },
          "cols": [
            [
              {
                "key": "avail",
                "label": "可否",
                "opts": [
                  "可",
                  "不可"
                ]
              }
            ],
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "chemical"
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
                  "バッチ",
                  "縦型",
                  "その他"
                ]
              }
            ]
          ]
        }
      },
      {
        "id": "f108",
        "label": "電解Au(ソフト)",
        "rowform": {
          "single": true,
          "gate": {
            "key": "avail",
            "show": "可"
          },
          "cols": [
            [
              {
                "key": "avail",
                "label": "可否",
                "opts": [
                  "可",
                  "不可"
                ]
              }
            ],
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "chemical"
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
                  "バッチ",
                  "縦型",
                  "その他"
                ]
              }
            ]
          ]
        }
      },
      {
        "id": "f109",
        "label": "無電解NiPdAu(ENEPIG)",
        "rowform": {
          "single": true,
          "gate": {
            "key": "avail",
            "show": "可"
          },
          "cols": [
            [
              {
                "key": "avail",
                "label": "可否",
                "opts": [
                  "可",
                  "不可"
                ]
              }
            ],
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "chemical"
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
                  "バッチ",
                  "縦型",
                  "その他"
                ]
              }
            ]
          ]
        }
      },
      {
        "id": "f110",
        "label": "無電解Sn",
        "rowform": {
          "single": true,
          "gate": {
            "key": "avail",
            "show": "可"
          },
          "cols": [
            [
              {
                "key": "avail",
                "label": "可否",
                "opts": [
                  "可",
                  "不可"
                ]
              }
            ],
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "chemical"
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
                  "バッチ",
                  "縦型",
                  "その他"
                ]
              }
            ]
          ]
        }
      },
      {
        "id": "f111",
        "label": "その他特殊メッキ",
        "rowform": {
          "single": true,
          "gate": {
            "key": "avail",
            "show": "可"
          },
          "cols": [
            [
              {
                "key": "avail",
                "label": "可否",
                "opts": [
                  "可",
                  "不可"
                ]
              }
            ],
            [
              {
                "key": "maker",
                "label": "メーカー",
                "suggest": true,
                "kind": "chemical"
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
                  "バッチ",
                  "縦型",
                  "その他"
                ]
              }
            ]
          ]
        }
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
          "クラス1,000",
          "クラス5,000",
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
          "クラス1,000",
          "クラス5,000",
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
          "クラス1,000",
          "クラス5,000",
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
          "クラス1,000",
          "クラス5,000",
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
          "クラス1,000",
          "クラス5,000",
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
        "example": "20um",
        "spec": {
          "kind": "single",
          "unit": "um"
        }
      },
      {
        "id": "f122",
        "label": "内層回路検査",
        "sub": "Verify画面のロックタイマー時間",
        "example": "0.5秒",
        "spec": {
          "kind": "single",
          "unit": "秒"
        }
      },
      {
        "id": "f123",
        "label": "内層回路検査",
        "sub": "Verify画面の倍率",
        "example": "50倍",
        "spec": {
          "kind": "single",
          "unit": "倍"
        }
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
        "example": "20um",
        "spec": {
          "kind": "single",
          "unit": "um"
        }
      },
      {
        "id": "f129",
        "label": "外層回路検査",
        "sub": "Verify画面のロックタイマー時間",
        "example": "0.5秒",
        "spec": {
          "kind": "single",
          "unit": "秒"
        }
      },
      {
        "id": "f130",
        "label": "外層回路検査",
        "sub": "Verify画面の倍率",
        "example": "50倍",
        "spec": {
          "kind": "single",
          "unit": "倍"
        }
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
        "example": "±10％",
        "spec": {
          "kind": "single",
          "unit": "%",
          "prefix": "±"
        }
      },
      {
        "id": "f143",
        "label": "電気チェック",
        "sub": "2端子治具対応装置台数",
        "example": "10台",
        "spec": {
          "kind": "single",
          "unit": "台"
        }
      },
      {
        "id": "f144",
        "label": "電気チェック",
        "sub": "2端子フライングチェッカー台数",
        "example": "5台",
        "spec": {
          "kind": "single",
          "unit": "台"
        }
      },
      {
        "id": "f145",
        "label": "電気チェック",
        "sub": "4端子治具対応装置台数",
        "example": "3台",
        "spec": {
          "kind": "single",
          "unit": "台"
        }
      },
      {
        "id": "f146",
        "label": "電気チェック",
        "sub": "4端子フライングチェッカー台数",
        "example": "1台",
        "spec": {
          "kind": "single",
          "unit": "台"
        }
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
