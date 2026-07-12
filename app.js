/* ==========================================================================
   基板メーカーDB — 訪問した基板メーカーの技術情報を蓄積・更新する生きたDB
   データは端末内(localStorage)に保存。JSONで書き出して repo に残せます。
   ========================================================================== */
(function () {
  "use strict";

  const SCHEMA = window.SCHEMA || [];
  const APP_VERSION = "2.2.0";
  const APP_DATE = "2026-07-09";
  const STORE_KEY = "pcb_makers_v1";   // ※このキーは変更しない (変更するとデータが見えなくなるため)
  const THEME_KEY = "pcb_theme";
  const $ = (s, r = document) => r.querySelector(s);
  const app = $("#app");
  const modalRoot = $("#modal-root");

  /* ---------- SVG アイコン (Feather 由来) ---------- */
  const ICONS = {
    search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/>',
    moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    back:'<path d="M19 12H5M12 19l-7-7 7-7"/>',
    edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    trash:'<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    pin:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    factory:'<path d="M2 20h20M4 20V8l6 4V8l6 4V6l4 2v12"/>',
    layers:'<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    chevron:'<path d="m9 18 6-6-6-6"/>',
    plus2:'<path d="M12 5v14M5 12h14"/>',
    compare:'<path d="M3 3h7v18H3zM14 3h7v18h-7z"/>',
    grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    x:'<path d="M18 6 6 18M6 6l12 12"/>',
    building:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
    drill:'<path d="M14 2h4v4h-4zM6 10h8v4H6zM10 14v4M4 22h12"/>',
    zap:'<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    droplet:'<path d="M12 2s6 6.7 6 11a6 6 0 0 1-12 0c0-4.3 6-11 6-11z"/>',
    beaker:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>',
    battery:'<rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2M6 11v2M10 11v2"/>',
    "git-branch":'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="8" r="3"/><path d="M6 9v6M18 11a9 9 0 0 1-9 9"/>',
    "align-center":'<path d="M17 10H7M19 6H5M19 14H5M17 18H7"/>',
    "align-justify":'<path d="M3 6h18M3 12h18M3 18h18"/>',
    shield:'<path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5z"/>',
    type:'<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
    scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
    sparkles:'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
    "check-circle":'<path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="M22 4 12 14.1l-3-3"/>',
    package:'<path d="M16.5 9.4 7.5 4.2M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 7 2.6 1.6 1.6 0 0 0 8 1.1V1a2 2 0 0 1 4 0v.1A1.6 1.6 0 0 0 15 2.6a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V7a1.6 1.6 0 0 0 1.1 1.5H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
    info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  };
  const svg = (name, size = 18) =>
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ""}</svg>`;

  /* ---------- データ層 ---------- */
  let makers = [];
  // 読み込み: 壊れていたら直前バックアップ→日次バックアップの順で復旧を試みる
  function load() {
    const tryParse = (k) => { try { const d = JSON.parse(localStorage.getItem(k)); return Array.isArray(d) ? d : null; } catch { return null; } };
    makers = tryParse(STORE_KEY);
    if (makers === null) {
      makers = tryParse(STORE_KEY + "_prev") || tryParse(STORE_KEY + "_bak") || [];
      if (makers.length) setTimeout(() => toast("バックアップからデータを復旧しました"), 600);
    }
  }
  // 保存: 直前の状態を _prev に、1日1回 _bak に退避してから書き込む (更新でデータが消えない保険)
  function save() {
    const cur = localStorage.getItem(STORE_KEY);
    if (cur) {
      localStorage.setItem(STORE_KEY + "_prev", cur);
      const day = today();
      if (localStorage.getItem(STORE_KEY + "_bak_date") !== day) {
        localStorage.setItem(STORE_KEY + "_bak", cur);
        localStorage.setItem(STORE_KEY + "_bak_date", day);
      }
    }
    localStorage.setItem(STORE_KEY, JSON.stringify(makers));
  }
  const uid = () => "m" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
  const today = () => new Date().toISOString().slice(0, 10);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function filledCount(m) {
    if (!m.fields) return 0;
    return Object.entries(m.fields).filter(([k, f]) => !k.startsWith("__note_") && f && f.value && String(f.value).trim()).length;
  }
  const TOTAL_FIELDS = SCHEMA.reduce((n, s) => n + s.fields.length, 0);
  const FIELD = {}; SCHEMA.forEach(s => s.fields.forEach(f => { FIELD[f.id] = f; }));
  const OTHER = "__other__";
  const splitVals = v => (v || "").split(/\s*\/\s*/).map(x => x.trim()).filter(Boolean);

  /* ---------- スペック入力 (厚み等を数値ドロップダウンで選択) ---------- */
  const stripUnit = (s, u) => String(s == null ? "" : s).replace(new RegExp(u + "\\s*$"), "").replace(u, "").trim();
  function parseSpec(d, sp) {
    // 保存済み spec を優先。無ければ既存テキスト(value)から数値を抽出して初期値に
    if (d.spec) return d.spec;
    const v = {};
    if (!d.value) return v;
    const nums = String(d.value).match(/[\d.]+/g) || [];
    if (sp.kind === "range") { const t = String(d.value).split(/[～~]/); v.min = stripUnit(t[0] || "", sp.unit); v.max = stripUnit(t[1] || "", sp.unit); }
    else if (sp.kind === "single") { v.v = sp.opts ? String(d.value).trim() : (nums[0] || ""); }
    else if (sp.kind === "parts") { sp.parts.forEach((pt, i) => { if (!pt.opts && nums[i] != null) v[pt.key] = nums[i]; }); }
    return v;
  }
  // 1マス分: opts あり=選択、なし=単位付き数値入力
  function specCell(key, fld, cur, ph) {
    const unit = fld.unit ? `<span class="spec-unit">${esc(fld.unit)}</span>` : "";
    const prefix = fld.prefix ? `<span class="spec-unit">${esc(fld.prefix)}</span>` : "";
    if (fld.opts) {
      const extra = cur && !fld.opts.includes(cur) ? `<option selected>${esc(cur)}</option>` : "";
      return `<span class="spec-cell">${prefix}<select class="fi spec-sel" data-key="${key}">
        <option value="">${esc(ph || "—")}</option>${extra}
        ${fld.opts.map(o => `<option ${cur === o ? "selected" : ""}>${esc(o)}</option>`).join("")}
      </select>${unit}</span>`;
    }
    return `<span class="spec-cell">${prefix}<input class="fi spec-sel spec-num" data-key="${key}" type="number" inputmode="decimal" step="any" value="${esc(cur || "")}" placeholder="${esc(ph || "—")}">${unit}</span>`;
  }
  function specNumBare(key, cur, ph) {
    return `<input class="fi spec-sel spec-num" data-key="${key}" type="number" inputmode="decimal" step="any" value="${esc(cur || "")}" placeholder="${esc(ph || "")}">`;
  }
  function specInner(sp, vals) {
    if (sp.kind === "range")
      return specCell("min", { opts: sp.opts }, vals.min, "最小") + `<span class="spec-sep">～</span>` + specCell("max", { opts: sp.opts, unit: sp.unit }, vals.max, "最大");
    if (sp.kind === "single")
      return specCell("v", { opts: sp.opts, unit: sp.unit, prefix: sp.prefix }, vals.v, sp.opts ? "選択" : "数値");
    // compact parts: 60/60×40um のように区切り文字でつなぐ
    if (sp.compact)
      return sp.parts.map((pt, i) => specNumBare(pt.key, vals[pt.key], pt.label) + (i < sp.parts.length - 1 ? `<span class="spec-sep">${esc(sp.seps[i])}</span>` : "")).join("") + (sp.unit ? `<span class="spec-unit">${esc(sp.unit)}</span>` : "");
    return sp.parts.map(pt => `<span class="spec-part"><span class="spec-plabel">${esc(pt.label)}</span>${specCell(pt.key, pt, vals[pt.key], "—")}</span>`).join("");
  }
  function readSpec(box) {
    const vals = {};
    box.querySelectorAll(".spec-sel").forEach(s => { if (s.value) vals[s.dataset.key] = s.value; });
    return vals;
  }
  function fmtSpec(fid, vals) {
    const sp = FIELD[fid].spec, pre = sp.prefix || "";
    if (sp.kind === "range") { if (vals.min && vals.max) return `${vals.min}～${vals.max}${sp.unit}`; const o = vals.min || vals.max; return o ? `${o}${sp.unit}` : ""; }
    if (sp.kind === "single") return vals.v ? `${pre}${vals.v}${sp.unit || ""}` : "";
    if (sp.compact) {
      const vv = sp.parts.map(pt => vals[pt.key] || "");
      if (vv.every(x => !x)) return "";
      let s = vv[0]; for (let i = 1; i < vv.length; i++) s += sp.seps[i - 1] + vv[i];
      return s + (sp.unit || "");
    }
    return sp.parts.map(pt => vals[pt.key] ? `${pt.label}${(pt.prefix || "")}${vals[pt.key]}${pt.unit || ""}` : null).filter(Boolean).join(" / ");
  }

  /* ---------- 装置メーカー行入力 (メーカー/型番/運転方式/台数/備考) ---------- */
  const EQUIP_MODES = ["Auto", "Semi", "Manu"];
  const PRESET_KEY = "pcb_preset_byfield";   // {fid:[maker,...]} 工程(フィールド)ごとの候補
  const PRESET_EQUIP = "pcb_preset_equip";   // 旧: 種別ごとの全工程共通 (移行用)
  const PRESET_MAT = "pcb_preset_material";
  // 装置行: メーカー / 型番 / 運転方式 / 台数 を横一列、備考は下段
  function equipRowHtml(r) {
    r = r || {};
    return `<div class="row-item" data-kind="equip">
      <div class="row-line">
        <input class="fi er-maker" placeholder="メーカー" value="${esc(r.maker || "")}" autocomplete="off">
        <input class="fi er-model" placeholder="型番" value="${esc(r.model || "")}">
        <select class="fi er-mode" title="運転方式">
          <option value="">方式</option>
          ${EQUIP_MODES.map(o => `<option ${r.mode === o ? "selected" : ""}>${o}</option>`).join("")}
        </select>
        <input class="fi er-qty" type="number" inputmode="numeric" min="0" placeholder="台" value="${esc(r.qty || "")}">
      </div>
      <input class="fi er-note" placeholder="備考 (回転数・分解能など)" value="${esc(r.note || "")}">
    </div>`;
  }
  // 材料行: メーカー / 品番 を横一列、備考は下段
  function materialRowHtml(r) {
    r = r || {};
    return `<div class="row-item" data-kind="material">
      <div class="row-line">
        <input class="fi er-maker" placeholder="メーカー" value="${esc(r.maker || "")}" autocomplete="off">
        <input class="fi er-model" placeholder="品番・グレード" value="${esc(r.model || "")}">
      </div>
      <input class="fi er-note" placeholder="備考 (顧客・用途など)" value="${esc(r.note || "")}">
    </div>`;
  }
  // デスミア行: ウェット/ドライで入力項目が変わる
  function desmearRowHtml(r) {
    r = r || {};
    const t = r.type || "";
    const inp = (dk, ph, val, extra = "") => `<input class="fi" data-dk="${dk}" placeholder="${esc(ph)}" value="${esc(val || "")}" ${extra}>`;
    return `<div class="row-item desmear-item" data-kind="desmear">
      <div class="dm-head">
        <div class="optchips" style="margin:0;overflow:visible">
          <span class="optchip dm-type ${t === "wet" ? "on" : ""}" data-t="wet">ウェット</span>
          <span class="optchip dm-type ${t === "dry" ? "on" : ""}" data-t="dry">ドライ</span>
        </div>
      </div>
      <div class="dm-wet" style="${t === "wet" ? "" : "display:none"}">
        <div class="dm-grid">
          <label class="dm-l">構成<select class="fi" data-dk="config"><option value="">—</option>${["水平", "バッチ"].map(o => `<option ${r.config === o ? "selected" : ""}>${o}</option>`).join("")}</select></label>
          <label class="dm-l">台数${inp("qty", "台", r.qty, 'type="number" inputmode="numeric" min="0"')}</label>
        </div>
        ${inp("freq", "ウェイトロス確認頻度 (例: 毎ロット)", r.freq)}
        ${inp("spec", "規格 (例: 0.25-0.35mg/cm²)", r.spec)}
      </div>
      <div class="dm-dry" style="${t === "dry" ? "" : "display:none"}">
        <div class="dm-grid">
          ${inp("maker", "メーカー", r.maker)}
          ${inp("model", "型番", r.model)}
        </div>
        <div class="dm-grid">
          ${inp("gas", "ガス種類 (例: O2/CF4)", r.gas)}
          ${inp("qty", "台数", r.qty, 'type="number" inputmode="numeric" min="0"')}
        </div>
        ${inp("freq", "ウェイトロス確認頻度 (例: 毎ロット)", r.freq)}
        ${inp("spec", "規格 (例: 0.15-0.35mg)", r.spec)}
      </div>
    </div>`;
  }
  function readDesmearRow(item) {
    const type = (item.querySelector(".dm-type.on") || {}).dataset ? item.querySelector(".dm-type.on").dataset.t : "";
    const block = item.querySelector(type === "dry" ? ".dm-dry" : ".dm-wet");
    const g = dk => { const el = block && block.querySelector(`[data-dk="${dk}"]`); return el ? el.value.trim() : ""; };
    return { type, config: g("config"), maker: g("maker"), model: g("model"), gas: g("gas"), qty: g("qty"), freq: g("freq"), spec: g("spec") };
  }
  function fmtDesmear(r) {
    const p = [];
    if (r.type === "wet") { p.push("ウェット" + (r.config ? `(${r.config})` : "")); if (r.qty) p.push(r.qty + "台"); }
    else if (r.type === "dry") { p.push("ドライ"); [r.maker, r.model].filter(Boolean).forEach(x => p.push(x)); if (r.gas) p.push("ガス:" + r.gas); if (r.qty) p.push(r.qty + "台"); }
    else return "";
    if (r.spec) p.push("規格:" + r.spec);
    if (r.freq) p.push("確認:" + r.freq);
    return p.join(" ");
  }
  // 汎用の構造化行 (schemaの rowform.cols 定義に従って入力欄を生成)
  function rowformRowHtml(f, r) {
    r = r || {};
    // ラベルは上に置かず placeholder に。各セル1行でコンパクトに
    const cell = fld => {
      const v = r[fld.key] || "";
      if (fld.type === "select")
        return `<select class="fi" data-dk="${fld.key}"><option value="">${esc(fld.label)}</option>${fld.opts.map(o => `<option ${v === o ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
      const cls = fld.suggest ? "fi er-maker" : "fi";
      const extra = fld.type === "num" ? 'type="number" inputmode="numeric" min="0"' : "";
      return `<input class="${cls}" data-dk="${fld.key}" value="${esc(v)}" placeholder="${esc(fld.label)}" ${extra} autocomplete="off">`;
    };
    const rowHtmlOf = rows => rows.map(row => row.length > 1 ? `<div class="dm-grid">${row.map(cell).join("")}</div>` : cell(row[0])).join("");
    const gate = f.rowform.gate;
    if (gate) {
      // 先頭列=ゲート(可否など)。ゲート値が gate.show の時だけ残りを表示
      const gcell = f.rowform.cols[0], rest = f.rowform.cols.slice(1);
      const shown = (r[gate.key] || "") === gate.show;
      const gsel = gcell[0];
      const gv = r[gate.key] || "";
      const gselHtml = `<select class="fi rf-gate" data-dk="${gsel.key}" data-show="${esc(gate.show)}"><option value="">${esc(gsel.label)}</option>${gsel.opts.map(o => `<option ${gv === o ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
      return `<div class="row-item rowform-item">
        ${gselHtml}
        <div class="rf-gated" style="${shown ? "" : "display:none"}">${rowHtmlOf(rest)}</div>
      </div>`;
    }
    return `<div class="row-item rowform-item">${rowHtmlOf(f.rowform.cols)}</div>`;
  }
  function readRowform(item, f) {
    const o = {};
    f.rowform.cols.flat().forEach(fld => { const el = item.querySelector(`[data-dk="${fld.key}"]`); if (el && el.value.trim()) o[fld.key] = el.value.trim(); });
    return o;
  }
  function fmtRowform(f, r) {
    const flat = f.rowform.cols.flat();
    if (flat.length === 1) return r[flat[0].key] || "";
    return flat.map(fld => r[fld.key] ? `${fld.label}:${r[fld.key]}` : null).filter(Boolean).join(" / ");
  }
  function fieldKind(f) { return f.equip ? "equip" : f.chemical ? "chemical" : f.material ? "material" : f.desmear ? "desmear" : null; }
  function isRowField(f) { return !!(fieldKind(f) || f.rowform); }
  function suggestCol(f) { return f.rowform ? f.rowform.cols.flat().find(c => c.suggest) : null; }
  // 候補の対象になる「メーカー欄」を持つフィールドの種別 (設定ページ/サジェスト用)
  function makerFieldKind(f) {
    const k = fieldKind(f);
    if (k === "equip" || k === "material" || k === "chemical") return k;
    const sc = suggestCol(f); return sc ? (sc.kind || "material") : null;
  }
  // フィールド定義に応じた1行分のHTML (スワイプで削除/複製できるようラップ)
  function rowInnerHtml(f, r) {
    if (f.rowform) return rowformRowHtml(f, r);
    if (f.desmear) return desmearRowHtml(r);
    return fieldKind(f) === "equip" ? equipRowHtml(r) : materialRowHtml(r);
  }
  function rowItemHtml(f, r) {
    // single(可否など単一行)はスワイプ削除/複製なしでそのまま
    if (f.rowform && f.rowform.single) return rowInnerHtml(f, r);
    return `<div class="row-wrap">
      <div class="row-act left"><button type="button" class="row-dup-btn">${svg("plus2", 15)} 複製</button></div>
      <div class="row-act right"><button type="button" class="row-del-btn">${svg("trash", 15)} 削除</button></div>
      ${rowInnerHtml(f, r)}
    </div>`;
  }
  function readOneRow(item, f) {
    if (f.rowform) return readRowform(item, f);
    if (f.desmear) return readDesmearRow(item);
    const q = s => { const el = item.querySelector(s); return el ? el.value.trim() : ""; };
    return { maker: q(".er-maker"), model: q(".er-model"), mode: q(".er-mode"), qty: q(".er-qty"), note: q(".er-note") };
  }
  function readRows(box) {
    const f = FIELD[box.dataset.fid] || {};
    if (f.rowform)
      return [...box.querySelectorAll(".row-item")].map(it => readRowform(it, f)).filter(o => Object.keys(o).length);
    if (f.desmear)
      return [...box.querySelectorAll(".desmear-item")].map(readDesmearRow).filter(r => r.type && (r.config || r.maker || r.model || r.gas || r.qty || r.freq || r.spec));
    return [...box.querySelectorAll(".row-item")].map(row => {
      const q = s => { const el = row.querySelector(s); return el ? el.value.trim() : ""; };
      return { maker: q(".er-maker"), model: q(".er-model"), mode: q(".er-mode"), qty: q(".er-qty"), note: q(".er-note") };
    }).filter(r => r.maker || r.model || r.mode || r.qty || r.note);
  }
  // 表示/比較/書出用のテキスト
  function fmtRowByField(f, r) {
    if (f && f.rowform) return fmtRowform(f, r);
    if (r.type) return fmtDesmear(r);
    const p = [];
    if (r.maker) p.push(r.maker);
    if (r.model) p.push(r.model);
    if (r.qty) p.push(r.qty + "台");
    if (r.mode) p.push("(" + r.mode + ")");
    if (r.note) p.push("— " + r.note);
    return p.join(" ");
  }
  // 候補は「工程ごと(=フィールドごと)」に分離。設備/材料/薬液も別の欄なので自然に分かれる
  function getPreset() { try { return JSON.parse(localStorage.getItem(PRESET_KEY)) || {}; } catch { return {}; } }
  function presetFor(fid) { const p = getPreset()[fid]; return Array.isArray(p) ? p : []; }
  function makerSuggestions(fid) {
    // ①この工程の欄に設定登録した候補 + ②この工程の欄に過去入力したメーカー (他工程は混ぜない)
    const s = new Set(presetFor(fid));
    makers.forEach(mk => ((mk.fields && mk.fields[fid] && mk.fields[fid].rows) || []).forEach(r => { if (r.maker) s.add(String(r.maker).trim()); }));
    return [...s].filter(Boolean);
  }
  // メーカー入力欄にフォーカスした時だけ、その欄の真下にインライン表示する候補バー
  // (position:fixed の浮遊ポップアップはiOSキーボードで位置がズレて不安定なため、DOMに直接差し込む)
  let sugBox = null;
  function hideSug() { if (sugBox) { sugBox.remove(); sugBox = null; } }
  function showSug(input) {
    const box = input.closest(".row-box"); if (!box) return;
    const q = input.value.trim().toLowerCase();
    const list = makerSuggestions(box.dataset.fid).filter(s => !q || s.toLowerCase().includes(q)).slice(0, 12);
    hideSug();
    if (!list.length) return;
    sugBox = document.createElement("div");
    sugBox.className = "sugbox";
    sugBox.innerHTML = list.map(s => `<span class="sug-chip">${esc(s)}</span>`).join("");
    // 入力欄(のある行)の直後に差し込む → 常に欄の真下・キーボードでもズレない
    const anchor = input.closest(".row-line") || input;
    anchor.insertAdjacentElement("afterend", sugBox);
    sugBox.querySelectorAll(".sug-chip").forEach(it => it.addEventListener("pointerdown", ev => {
      ev.preventDefault();  // フォーカスを外さず(=blurさせず)チップで確定
      input.value = it.textContent;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      hideSug();
    }));
  }

  // 編集モーダル用の委任リスナー (1回だけ登録し、開いている編集画面のフックに転送)
  let editorHooks = null;
  ["input", "change", "click", "focusin", "focusout"].forEach(type =>
    modalRoot.addEventListener(type, e => { if (editorHooks && editorHooks[type]) editorHooks[type](e); }));

  // 行スワイプ: 左スワイプ=右に「削除」、右スワイプ=左に「複製」を表示 (iOSメール風)
  // 工程切替スワイプと競合しないよう、行を横に動かしている間は rowSwiping=true にして親のスワイプを無効化
  let rowSwiping = false;
  const OPEN_W = 92;            // アクションボタンの表示幅
  let sw = null;               // {wrap,item,x0,y0,base,horiz}
  function closeOpenRows(except) {
    modalRoot.querySelectorAll(".row-wrap.open").forEach(w => { if (w !== except) { w.classList.remove("open"); w.querySelector(".row-item").style.transform = ""; } });
  }
  function rowTouchStart(e) {
    const wrap = e.target.closest(".row-wrap");
    // 行内ならどこから始めてもOK (横移動を検知した時だけスワイプ扱い=タップ入力は邪魔しない)。
    // アクションボタン自体の上では開始しない
    if (!wrap || e.target.closest(".row-act")) { sw = null; return; }
    const t = e.touches[0];
    const open = wrap.classList.contains("open");
    sw = { wrap, item: wrap.querySelector(".row-item"), x0: t.clientX, y0: t.clientY, base: wrap.dataset.side === "left" ? OPEN_W : wrap.dataset.side === "right" ? -OPEN_W : 0, horiz: false, openBefore: open };
    sw.item.style.transition = "none";
  }
  function rowTouchMove(e) {
    if (!sw) return;
    const t = e.touches[0], dx = t.clientX - sw.x0, dy = t.clientY - sw.y0;
    if (!sw.horiz) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dx) <= Math.abs(dy)) { sw = null; return; }  // 縦スクロール優先
      sw.horiz = true; rowSwiping = true; closeOpenRows(sw.wrap);
    }
    e.preventDefault();
    let x = sw.base + dx;
    x = Math.max(-OPEN_W - 20, Math.min(OPEN_W + 20, x));  // 少しだけオーバードラッグ許容
    sw.item.style.transform = `translateX(${x}px)`;
  }
  function rowTouchEnd() {
    if (!sw) return;
    const cur = sw; sw = null;
    if (!cur.horiz) return;
    setTimeout(() => { rowSwiping = false; }, 30);
    cur.item.style.transition = "";
    const m = new DOMMatrix(getComputedStyle(cur.item).transform);
    const x = m.m41;
    if (x <= -OPEN_W / 2) { cur.wrap.classList.add("open"); cur.wrap.dataset.side = "right"; cur.item.style.transform = `translateX(-${OPEN_W}px)`; }
    else if (x >= OPEN_W / 2) { cur.wrap.classList.add("open"); cur.wrap.dataset.side = "left"; cur.item.style.transform = `translateX(${OPEN_W}px)`; }
    else { cur.wrap.classList.remove("open"); cur.wrap.dataset.side = ""; cur.item.style.transform = ""; }
  }
  modalRoot.addEventListener("touchstart", rowTouchStart, { passive: true });
  modalRoot.addEventListener("touchmove", rowTouchMove, { passive: false });
  modalRoot.addEventListener("touchend", rowTouchEnd, { passive: true });
  modalRoot.addEventListener("touchcancel", () => { if (sw) { sw.item.style.transform = ""; sw = null; } }, { passive: true });

  /* ---------- ルーティング (ハッシュ) ---------- */
  function router() {
    const h = location.hash.slice(1);
    if (h.startsWith("maker/")) return renderDetail(h.slice(6));
    if (h === "compare") return renderCompare();
    if (h === "settings") return renderSettings();
    return renderList();
  }
  const go = (h) => { location.hash = h; };

  /* ---------- トップバー ---------- */
  function topbar() {
    return `
    <div class="topbar"><div class="topbar-inner">
      <div class="brand" onclick="location.hash=''">
        <img src="icon.svg" alt="">
        <div><h1>基板メーカーDB</h1><small>SUBSTRATE MAKER DB · v${APP_VERSION}</small></div>
      </div>
      <div class="searchbox">
        <span class="ico">${svg("search", 16)}</span>
        <input id="q" type="search" placeholder="メーカー名・所在地・タグで検索…" autocomplete="off">
      </div>
      <button class="iconbtn" id="themeBtn" title="テーマ切替">${svg(document.documentElement.dataset.theme === "light" ? "moon" : "sun")}</button>
      <button class="iconbtn" id="setBtn" title="設定 (メーカー候補)">${svg("settings")}</button>
      <button class="iconbtn" id="importBtn" title="JSON読込">${svg("upload")}</button>
      <button class="iconbtn" id="exportBtn" title="JSON書出">${svg("download")}</button>
      <button class="btn primary" id="addBtn">${svg("plus", 16)} 追加</button>
      <input type="file" id="fileInput" accept="application/json" hidden>
    </div></div>`;
  }
  function bindTop() {
    const q = $("#q");
    if (q) { q.value = state.query; q.oninput = () => { state.query = q.value; renderCards(); }; }
    $("#themeBtn").onclick = toggleTheme;
    $("#setBtn").onclick = () => go("settings");
    $("#addBtn").onclick = () => openEditor(null);
    $("#exportBtn").onclick = exportJSON;
    $("#importBtn").onclick = () => $("#fileInput").click();
    $("#fileInput").onchange = importJSON;
  }

  /* ---------- 一覧画面 ---------- */
  const state = { query: "", filter: "all", sort: "updated" };

  function renderList() {
    window.onkeydown = null;
    const filled = makers.filter(m => filledCount(m) > 0).length;
    const avgFields = makers.length ? Math.round(makers.reduce((n, m) => n + filledCount(m), 0) / makers.length) : 0;
    const visits = makers.reduce((n, m) => n + (m.visits ? m.visits.length : 0), 0);
    app.innerHTML = topbar() + `
      <div class="wrap">
        <div class="statgrid">
          <div class="stat"><span class="n">${makers.length}</span><span class="l">${svg("building", 14)} 登録メーカー</span></div>
          <div class="stat"><span class="n">${visits}</span><span class="l">${svg("pin", 14)} 訪問記録</span></div>
          <div class="stat"><span class="n">${SCHEMA.length}</span><span class="l">${svg("layers", 14)} 調査カテゴリ</span></div>
          <div class="stat"><span class="n">${avgFields}<small style="font-size:13px;color:var(--faint)">/${TOTAL_FIELDS}</small></span><span class="l">${svg("check-circle", 14)} 平均入力項目</span></div>
        </div>
        <div class="toolbar">
          <div class="chips" id="tagChips"></div>
          <div class="spacer" style="flex:1"></div>
          <select class="select" id="sortSel">
            <option value="updated">更新日順</option>
            <option value="name">名前順</option>
            <option value="rating">評価順</option>
            <option value="filled">入力率順</option>
          </select>
          <button class="btn ghost sm" id="cmpBtn">${svg("compare", 15)} 比較</button>
        </div>
        <div class="grid" id="cards"></div>
        <div class="app-foot">基板メーカーDB <b>v${APP_VERSION}</b> (${APP_DATE})<br>
        データはこの端末のブラウザ内に保存され、アプリを更新しても消えません（直前＋日次の自動バックアップ付き）。<br>
        端末の故障や機種変更に備えて、定期的に ⬇ JSON書き出しでのバックアップをおすすめします。</div>
      </div>
      <button class="fab" id="fab" title="メーカーを追加" aria-label="メーカーを追加">${svg("plus", 26)}</button>`;
    bindTop();
    $("#sortSel").value = state.sort;
    $("#sortSel").onchange = e => { state.sort = e.target.value; renderCards(); };
    $("#cmpBtn").onclick = () => go("compare");
    $("#fab").onclick = () => openEditor(null);
    renderTagChips();
    renderCards();
  }

  function allTags() {
    const s = new Set();
    makers.forEach(m => (m.tags || []).forEach(t => s.add(t)));
    return [...s];
  }
  function renderTagChips() {
    const box = $("#tagChips"); if (!box) return;
    const tags = allTags();
    box.innerHTML = `<span class="chip ${state.filter === "all" ? "active" : ""}" data-f="all">すべて</span>` +
      tags.map(t => `<span class="chip ${state.filter === t ? "active" : ""}" data-f="${esc(t)}">${esc(t)}</span>`).join("");
    box.querySelectorAll(".chip").forEach(c => c.onclick = () => { state.filter = c.dataset.f; renderTagChips(); renderCards(); });
  }

  function visibleMakers() {
    let list = makers.slice();
    const q = state.query.trim().toLowerCase();
    if (q) list = list.filter(m => (m.name + " " + (m.location || "") + " " + (m.country || "") + " " + (m.tags || []).join(" ")).toLowerCase().includes(q));
    if (state.filter !== "all") list = list.filter(m => (m.tags || []).includes(state.filter));
    const s = state.sort;
    list.sort((a, b) => s === "name" ? a.name.localeCompare(b.name, "ja")
      : s === "rating" ? (b.rating || 0) - (a.rating || 0)
      : s === "filled" ? filledCount(b) - filledCount(a)
      : (b.updatedAt || "").localeCompare(a.updatedAt || ""));
    return list;
  }

  function stars(n) {
    n = n || 0;
    let h = "";
    for (let i = 1; i <= 5; i++) h += `<span class="${i <= n ? "" : "off"}">★</span>`;
    return `<div class="stars">${h}</div>`;
  }

  function renderCards() {
    const box = $("#cards"); if (!box) return;
    const list = visibleMakers();
    if (!list.length) {
      box.innerHTML = `<div class="empty" style="grid-column:1/-1">
        ${svg("factory", 56)}
        <h2>${makers.length ? "該当するメーカーがありません" : "まだメーカーが登録されていません"}</h2>
        <p>右上の「追加」から、訪問した基板メーカーの情報を登録しましょう。</p>
        ${makers.length ? "" : `<button class="btn primary" onclick="document.getElementById('addBtn').click()">${svg("plus", 16)} 最初のメーカーを追加</button>`}
      </div>`;
      return;
    }
    box.innerHTML = list.map(m => {
      const pct = Math.round(filledCount(m) / TOTAL_FIELDS * 100);
      const initial = (m.name || "?").trim().charAt(0);
      const tags = (m.tags || []).slice(0, 3).map((t, i) => `<span class="tag ${i % 2 ? "g" : ""}">${esc(t)}</span>`).join("");
      return `<div class="mcard" onclick="location.hash='maker/${m.id}'">
        <div class="mcard-top">
          <div class="avatar">${esc(initial)}</div>
          <div style="flex:1;min-width:0">
            <h3>${esc(m.name)}</h3>
            <div class="loc">${svg("pin", 12)} ${esc(m.location || "所在地未登録")}${m.country && m.country !== "—" ? " ・ " + esc(m.country) : ""}</div>
            ${stars(m.rating)}
          </div>
        </div>
        <div class="tagrow">${tags || '<span class="tag g">未分類</span>'}</div>
        <div class="mcard-foot">
          <span><span class="filled">${filledCount(m)}</span> / ${TOTAL_FIELDS} 項目 (${pct}%)</span>
          <span>${svg("clock", 12)} ${esc(m.updatedAt || m.date || "—")}</span>
        </div>
      </div>`;
    }).join("");
  }

  /* ---------- 詳細画面 ---------- */
  let openSections = {};
  function renderDetail(id) {
    const m = makers.find(x => x.id === id);
    if (!m) { go(""); return; }
    const pct = Math.round(filledCount(m) / TOTAL_FIELDS * 100);
    const initial = (m.name || "?").trim().charAt(0);

    const navChips = SCHEMA.map((s, i) => `<span class="chip sec-tab" data-si="${i}">${esc(s.section)}</span>`).join("");

    const visits = (m.visits || []).slice().sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    const timeline = visits.length ? `<div class="timeline">${visits.map(v => `
      <div class="tl-item">
        <span class="tl-date">${esc(v.date || "")}</span><span class="tl-author">${esc(v.author || "")}</span>
        <div class="tl-memo">${esc(v.memo || "")}</div>
      </div>`).join("")}</div>` : `<p style="color:var(--faint)">訪問記録はまだありません。「訪問記録を追加」から記録できます。</p>`;

    app.innerHTML = topbar() + `
      <div class="wrap">
        <button class="btn ghost sm" style="margin-bottom:14px" onclick="location.hash=''">${svg("back", 15)} 一覧へ戻る</button>
        <div class="detail-hero">
          <div class="dh-top">
            <div class="avatar">${esc(initial)}</div>
            <div style="flex:1;min-width:200px">
              <h2>${esc(m.name)}</h2>
              <div class="dh-meta">
                ${m.factory ? `<span>${svg("factory", 14)} ${esc(m.factory)}</span>` : ""}
                <span>${svg("pin", 14)} ${esc(m.location || "所在地未登録")}${m.country && m.country !== "—" ? " ・ " + esc(m.country) : ""}</span>
                <span>${svg("clock", 14)} 更新 ${esc(m.updatedAt || m.date || "—")}</span>
              </div>
              ${stars(m.rating)}
              <div class="tagrow">${(m.tags || []).map((t, i) => `<span class="tag ${i % 2 ? "g" : ""}">${esc(t)}</span>`).join("") || ""}</div>
            </div>
            <div class="dh-actions">
              <button class="btn ghost sm" id="visitBtn">${svg("pin", 15)} 訪問記録を追加</button>
              <button class="btn primary sm" id="editBtn">${svg("edit", 15)} 基本情報</button>
              <button class="btn danger sm" id="delBtn">${svg("trash", 15)}</button>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar"><i style="width:${pct}%"></i></div>
            <small>調査項目 ${filledCount(m)} / ${TOTAL_FIELDS} 記入済 (${pct}%)</small>
          </div>
        </div>

        <div class="acc" style="margin-bottom:16px">
          <div class="acc-head open" style="cursor:default">
            <div class="acc-ico">${svg("pin", 18)}</div><h3>訪問記録 / メモ</h3>
            <button class="btn ghost sm" id="visitBtn2">${svg("plus", 14)} 追加</button>
          </div>
          <div class="acc-body" style="display:block">${timeline}</div>
        </div>

        <div class="section-nav" id="secTabs"><span class="chip ${state.hideEmpty ? "active" : ""}" id="heChip">未記入を隠す</span>${navChips}</div>
        <div class="swipe-hint">← 左右にスワイプで工程を切り替え →</div>
        <div id="pagerWrap"></div>
      </div>`;
    bindTop();
    $("#editBtn").onclick = () => openEditor(m.id);
    $("#delBtn").onclick = () => delMaker(m.id);
    $("#visitBtn").onclick = $("#visitBtn2").onclick = () => openVisit(m.id);
    $("#heChip").onclick = () => { state.hideEmpty = !state.hideEmpty; renderDetail(id); };
    app.querySelectorAll(".sec-tab").forEach(c => c.onclick = () => setSec(+c.dataset.si));

    // ---- 工程ページャー: 1工程=1ページ、スワイプ/タブ/矢印で切替 ----
    const pagerEl = $("#pagerWrap");
    function setSec(i, dir) {
      const t = Math.max(0, Math.min(SCHEMA.length - 1, i));
      if (dir === undefined) dir = t > (state.secIdx || 0) ? "l" : t < (state.secIdx || 0) ? "r" : "";
      state.secIdx = t;
      updatePager(dir);
    }
    function updatePager(dir) {
      const si = Math.max(0, Math.min(SCHEMA.length - 1, state.secIdx || 0));
      state.secIdx = si;
      const sec = SCHEMA[si];
      const secFilled = sec.fields.filter(f => m.fields && m.fields[f.id] && m.fields[f.id].value).length;
      const secNote = (m.fields && m.fields["__note_" + sec.section] && m.fields["__note_" + sec.section].value) || "";
      const rows = sec.fields.map(f => {
        const d = (m.fields && m.fields[f.id]) || {};
        const val = d.value && String(d.value).trim();
        if (state.hideEmpty && !val) return "";
        const showSub = f.sub && !f.spec;   // スペック項目のサブ(書式ヒント)は冗長なので詳細でも隠す
        return `<div class="field">
          <div class="field-label">${esc(f.label)}${showSub ? ` <span class="field-sub-inline">${esc(f.sub.split("\n")[0])}</span>` : ""}</div>
          <div class="field-val ${val ? "" : "blank"}">${val ? esc(d.value) : "未記入"}</div>
        </div>`;
      }).join("") + (secNote ? `<div class="field"><div class="field-remark">📝 ${esc(secNote)}</div></div>` : "");
      const anim = dir === "l" ? "slide-l" : dir === "r" ? "slide-r" : "";
      pagerEl.innerHTML = `
        <div class="pager-nav">
          <button class="iconbtn" id="pgPrev" ${si === 0 ? "disabled" : ""}>${svg("back", 16)}</button>
          <span class="pn-label">${si + 1} / ${SCHEMA.length}</span>
          <button class="iconbtn pg-next" id="pgNext" ${si === SCHEMA.length - 1 ? "disabled" : ""}>${svg("back", 16)}</button>
        </div>
        <div class="acc open page-card ${anim}">
          <div class="acc-head" style="cursor:default">
            <div class="acc-ico">${svg(sec.icon, 18)}</div>
            <h3>${esc(sec.section)}</h3>
            <span class="acc-count">${secFilled}/${sec.fields.length}</span>
            <button class="iconbtn sec-edit" title="この工程を編集">${svg("edit", 14)}</button>
          </div>
          <div class="acc-body" style="display:block">${rows || `<div class="field"><div class="field-val blank">（未記入のみ — 「未記入を隠す」を解除すると表示されます）</div></div>`}
            <button type="button" class="btn ghost edit-cta">${svg("edit", 15)} この工程を編集</button>
          </div>
        </div>`;
      $("#pgPrev").onclick = () => setSec(si - 1, "r");
      $("#pgNext").onclick = () => setSec(si + 1, "l");
      pagerEl.querySelectorAll(".sec-edit,.edit-cta").forEach(b => b.onclick = () => openEditor(m.id, si));
      app.querySelectorAll(".sec-tab").forEach(c => {
        const on = +c.dataset.si === si;
        c.classList.toggle("active", on);
        if (on) c.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
      });
    }
    // スワイプ検出 (縦スクロールと区別: 横60px以上かつ横>縦x1.6)
    let tx = 0, ty = 0;
    pagerEl.addEventListener("touchstart", e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
    pagerEl.addEventListener("touchend", e => {
      const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) > 60 && Math.abs(dx) > 1.6 * Math.abs(dy)) {
        if (dx < 0) setSec(state.secIdx + 1, "l"); else setSec(state.secIdx - 1, "r");
      }
    }, { passive: true });
    // PCは ←→ キーでも切替
    window.onkeydown = e => {
      if (modalRoot.innerHTML || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
      if (e.key === "ArrowRight") setSec(state.secIdx + 1, "l");
      if (e.key === "ArrowLeft") setSec(state.secIdx - 1, "r");
    };
    updatePager();
  }
  window.__toggleSec = function (el) {
    const acc = el.closest(".acc");
    acc.classList.toggle("open");
    openSections[acc.dataset.sec] = acc.classList.contains("open");
  };

  /* ---------- 訪問記録の追加 ---------- */
  function openVisit(id) {
    const m = makers.find(x => x.id === id); if (!m) return;
    modal(`訪問記録を追加 — ${esc(m.name)}`, `
      <div class="form-grid">
        <div class="form-row"><label class="fl">訪問日</label><input class="fi" id="v-date" type="date" value="${today()}"></div>
        <div class="form-row"><label class="fl">記録者</label><input class="fi" id="v-author" placeholder="担当者名" value="${esc(state.author || '')}"></div>
      </div>
      <div class="form-row"><label class="fl">メモ / 所感</label><textarea class="fi" id="v-memo" rows="5" placeholder="工場の印象、対応、更新した内容、次回確認事項など"></textarea></div>
    `, () => {
      const memo = $("#v-memo").value.trim();
      if (!memo) { toast("メモを入力してください"); return false; }
      state.author = $("#v-author").value.trim();
      m.visits = m.visits || [];
      m.visits.push({ date: $("#v-date").value || today(), author: state.author, memo });
      m.updatedAt = today();
      save(); closeModal(); renderDetail(id); toast("訪問記録を追加しました");
    });
  }

  /* ---------- 追加 / 編集フォーム ---------- */
  // 1カテゴリ分の入力ブロックを生成（選択肢のある項目はチップ表示）
  function secBlock(m, sec, open) {
    const filled = sec.fields.filter(f => m.fields && m.fields[f.id] && m.fields[f.id].value).length;
    return `
      <details class="edit-section" ${open ? "open" : ""}>
        <summary><div class="acc-ico">${svg(sec.icon, 15)}</div>${esc(sec.section)} <span class="acc-count" style="margin-left:auto">${filled}/${sec.fields.length} 記入</span></summary>
        <div class="es-body">
          ${sec.fields.map(f => {
            const d = (m.fields && m.fields[f.id]) || {};
            // スペック入力: 数値/選択。単一・範囲は「ラベル＋入力」を1行に (サブ表示や備考は無し)
            if (f.spec) {
              const vals = parseSpec(d, f.spec);
              // 単一/範囲/2〜3部品まで「ラベル＋入力」を1行に
              const inline = f.spec.kind !== "parts" || f.spec.parts.length <= 3;
              return `<div class="efield ${inline ? "efield-inline" : ""}">
                <label class="fl">${esc(f.label)}</label>
                <div class="spec-box" data-fid="${f.id}"><div class="spec-row">${specInner(f.spec, vals)}</div></div>
                ${!d.spec && d.value ? `<div class="fhint">現在: ${esc(d.value)}</div>` : ""}
              </div>`;
            }
            // 設備 / 材料 / 薬液 / デスミア / 汎用構造化(rowform): 行入力 (行追加可)
            if (isRowField(f)) {
              const kind = fieldKind(f) || "rowform";
              const simple = kind === "equip" || kind === "material" || kind === "chemical";
              const rows = (d.rows && d.rows.length) ? d.rows : (d.value && simple ? [{ note: d.value }] : [{}]);
              const addLabel = f.rowform ? (f.rowform.add || "行を追加")
                : kind === "equip" ? "装置を追加" : kind === "chemical" ? "薬液を追加" : kind === "desmear" ? "設備を追加" : "材料を追加";
              const single = f.rowform && f.rowform.single;
              return `<div class="efield">
                <label class="fl">${esc(f.label)}</label>
                <div class="row-box" data-fid="${f.id}" data-kind="${kind}">
                  ${(single ? rows.slice(0, 1) : rows).map(r => rowItemHtml(f, r)).join("")}
                  ${single ? "" : `<button type="button" class="btn ghost sm eq-add">${svg("plus", 13)} ${addLabel}</button>`}
                </div>
              </div>`;
            }
            // 選択式 (単一/複数): チップ + その他 (備考は無し)
            if (f.opts) {
              const sel = splitVals(d.value);
              const custom = sel.filter(x => !f.opts.includes(x));
              const otherOn = custom.length > 0;
              return `<div class="efield">
                <label class="fl">${esc(f.label)}${f.multi ? ' <span class="multi-tag">複数選択可</span>' : ""}</label>
                <div class="optchips" data-for="${f.id}" data-multi="${f.multi ? 1 : 0}">
                  ${f.opts.map(o => `<span class="optchip ${sel.includes(o) ? "on" : ""}" data-val="${esc(o)}">${esc(o)}</span>`).join("")}
                  <span class="optchip other-chip ${otherOn ? "on" : ""}" data-val="${OTHER}">その他…</span>
                </div>
                <input class="fi other-input" data-for="${f.id}" placeholder="その他（自由入力）" value="${esc(custom.join(" / "))}" style="${otherOn ? "" : "display:none"}">
                <input type="hidden" data-fid="${f.id}" data-k="value" value="${esc(d.value || "")}">
              </div>`;
            }
            // 通常項目: 回答のみ (備考は工程末尾にまとめて1つ)
            return `<div class="efield">
              <label class="fl">${esc(f.label)}${f.sub ? ` <span class="field-sub-inline">${esc(f.sub.split("\n")[0])}</span>` : ""}</label>
              <textarea class="fi" data-fid="${f.id}" data-k="value" rows="1" placeholder="${esc(f.example ? "例: " + f.example : "")}">${esc(d.value || "")}</textarea>
            </div>`;
          }).join("")}
          <div class="efield sec-note-field">
            <label class="fl">${svg("edit", 13)} この工程の備考</label>
            <textarea class="fi" data-fid="__note_${esc(sec.section)}" data-k="value" rows="2" placeholder="工程全体の補足・気づき (任意)">${esc((m.fields && m.fields["__note_" + sec.section] && m.fields["__note_" + sec.section].value) || "")}</textarea>
          </div>
        </div>
      </details>`;
  }

  // openEditor(id) = 基本情報の編集 / openEditor(id, secIdx) = 工程の編集(スワイプ・◀▶で移動)
  // 新規はまず基本情報だけ入力 → 保存後すぐ工程1の編集シートが開き、スワイプで19工程を連続入力できる
  function openEditor(id, onlySec) {
    const isNew = !id;
    const m = isNew
      ? { id: uid(), name: "", factory: "", location: "", country: "", rating: 0, tags: [], visits: [], fields: {}, date: today(), updatedAt: today() }
      : JSON.parse(JSON.stringify(makers.find(x => x.id === id)));
    if (!m) return;
    const scoped = onlySec != null;

    let body;
    if (scoped) {
      const sec = SCHEMA[onlySec];
      body = `
        <div class="ed-nav">
          <button type="button" class="iconbtn" id="edPrev" ${onlySec === 0 ? "disabled" : ""}>${svg("back", 16)}</button>
          <span class="pn-label">${onlySec + 1} / ${SCHEMA.length}　${esc(sec.section)}</span>
          <button type="button" class="iconbtn pg-next" id="edNext" ${onlySec === SCHEMA.length - 1 ? "disabled" : ""}>${svg("back", 16)}</button>
        </div>
        <div class="swipe-hint">← スワイプでも前後の工程へ移動できます（自動保存） →</div>
        ${secBlock(m, sec, true)}`;
    } else {
      body = `
      <div class="form-grid">
        <div class="form-row"><label class="fl">会社名 *</label><input class="fi" id="e-name" value="${esc(m.name)}" placeholder="例: TSB工場"></div>
        <div class="form-row"><label class="fl">工場名</label><input class="fi" id="e-factory" value="${esc(m.factory || '')}" placeholder="例: 第2工場"></div>
        <div class="form-row"><label class="fl">所在地</label><input class="fi" id="e-loc" value="${esc(m.location || '')}" placeholder="例: 深圳 / 滋賀県"></div>
        <div class="form-row"><label class="fl">国 / 地域</label><input class="fi" id="e-country" value="${esc(m.country === '—' ? '' : (m.country || ''))}" placeholder="例: 中国 / 日本"></div>
      </div>
      <div class="form-row"><label class="fl">タグ (カンマ区切り)</label><input class="fi" id="e-tags" value="${esc((m.tags || []).join(', '))}" placeholder="例: 車載, HDI, 量産"></div>
      <div class="form-row"><label class="fl">評価</label>
        <div class="rating-input" id="e-rating">${[1,2,3,4,5].map(i => `<span class="${i <= (m.rating || 0) ? "on" : ""}" data-v="${i}">★</span>`).join("")}</div>
      </div>
      ${isNew ? `<p style="color:var(--faint);font-size:12.5px;margin:6px 0 0">保存すると、工程ごとの調査項目（全${SCHEMA.length}工程）をスワイプしながら入力できます。</p>` : ""}`;
    }

    const title = scoped
      ? esc(m.name)
      : (isNew ? "メーカーを追加" : `基本情報 — ${esc(m.name)}`);

    modal(title, body, () => doSave(0));

    // 評価 (基本情報編集時のみ)
    let curRating = m.rating || 0;
    const rEl = $("#e-rating");
    if (rEl) rEl.querySelectorAll("span").forEach(s => {
      s.onclick = () => { curRating = +s.dataset.v; rEl.querySelectorAll("span").forEach(x => x.classList.toggle("on", +x.dataset.v <= curRating)); };
    });

    // 工程編集中: ◀▶ボタン と 左右スワイプ で前後の工程へ (現在の入力は自動保存)
    if (scoped) {
      $("#edPrev").onclick = () => doSave(-1);
      $("#edNext").onclick = () => doSave(1);
      const sb = modalRoot.querySelector(".sheet-body");
      let stx = 0, sty = 0;
      sb.addEventListener("touchstart", e => { stx = e.touches[0].clientX; sty = e.touches[0].clientY; }, { passive: true });
      sb.addEventListener("touchend", e => {
        if (rowSwiping) return;   // 行スワイプ中は工程切替しない
        const dx = e.changedTouches[0].clientX - stx, dy = e.changedTouches[0].clientY - sty;
        if (Math.abs(dx) > 70 && Math.abs(dx) > 1.6 * Math.abs(dy)) {
          if (dx < 0 && onlySec < SCHEMA.length - 1) doSave(1);
          else if (dx > 0 && onlySec > 0) doSave(-1);
        }
      }, { passive: true });
    }

    // 選択チップ: 単一=1つだけON / 複数=トグル。「その他」ONで自由入力欄を表示。
    // 値は hidden input に " / " 区切りで保持 (プリセット + その他自由入力)
    const chipHidden = g => modalRoot.querySelector(`input[type="hidden"][data-fid="${g.dataset.for}"][data-k="value"]`);
    const otherInput = fid => modalRoot.querySelector(`.other-input[data-for="${fid}"]`);
    // DOM(チップ + その他入力) から hidden 値を再計算
    function writeChipValue(g) {
      const fid = g.dataset.for, h = chipHidden(g); if (!h) return;
      const arr = [...g.querySelectorAll(".optchip.on")].filter(c => c.dataset.val !== OTHER).map(c => c.dataset.val);
      const otherChip = g.querySelector(".other-chip"), oi = otherInput(fid);
      if (otherChip && otherChip.classList.contains("on") && oi && oi.value.trim()) arr.push(...splitVals(oi.value));
      h.value = arr.join(" / ");
      h.dispatchEvent(new Event("input", { bubbles: true }));
    }
    // hidden 値 → チップ/その他入力 の状態へ (下書き復元・初期化用)
    function syncChips() {
      modalRoot.querySelectorAll(".optchips").forEach(g => {
        const fid = g.dataset.for, h = chipHidden(g); if (!h) return;
        const opts = (FIELD[fid] && FIELD[fid].opts) || [];
        const sel = splitVals(h.value), custom = sel.filter(x => !opts.includes(x));
        g.querySelectorAll(".optchip").forEach(c =>
          c.classList.toggle("on", c.dataset.val === OTHER ? custom.length > 0 : sel.includes(c.dataset.val)));
        const oi = otherInput(fid);
        if (oi) { oi.style.display = custom.length > 0 ? "" : "none"; oi.value = custom.join(" / "); }
      });
    }
    modalRoot.querySelectorAll(".optchip").forEach(c => c.onclick = () => {
      const g = c.closest(".optchips"), multi = g.dataset.multi === "1";
      const isOther = c.dataset.val === OTHER, oi = otherInput(g.dataset.for);
      if (multi) {
        c.classList.toggle("on");
      } else {
        const wasOn = c.classList.contains("on");
        g.querySelectorAll(".optchip").forEach(x => x.classList.remove("on"));
        if (!wasOn) c.classList.add("on");
      }
      if (oi) {
        const otherChip = g.querySelector(".other-chip"), show = otherChip.classList.contains("on");
        oi.style.display = show ? "" : "none";
        if (!show) oi.value = "";
        if (show && isOther) setTimeout(() => oi.focus(), 0);
      }
      writeChipValue(g);
    });
    // 「その他」自由入力の変更を hidden に反映
    modalRoot.querySelectorAll(".other-input").forEach(oi =>
      oi.addEventListener("input", () => writeChipValue(oi.closest(".efield").querySelector(".optchips"))));

    // 下書き自動保存 (入力途中で閉じても復元できる)
    const DKEY = "pcb_draft_v1";
    const dtag = (isNew ? "new" : id) + ":" + (scoped ? onlySec : "all");
    function snapshot() {
      const vals = { hdr: {}, f: {}, eq: {}, sp: {} };
      ["e-name", "e-factory", "e-loc", "e-country", "e-tags"].forEach(k => { const el = $("#" + k); if (el) vals.hdr[k] = el.value; });
      modalRoot.querySelectorAll("input[data-fid],textarea[data-fid]").forEach(el => { if (el.value) vals.f[el.dataset.fid + "|" + el.dataset.k] = el.value; });
      modalRoot.querySelectorAll(".row-box").forEach(box => { vals.eq[box.dataset.fid] = readRows(box); });
      modalRoot.querySelectorAll(".spec-box").forEach(box => { vals.sp[box.dataset.fid] = readSpec(box); });
      return vals;
    }
    function applySnap(vals) {
      Object.entries(vals.hdr || {}).forEach(([k, v]) => { const el = $("#" + k); if (el) el.value = v; });
      Object.entries(vals.f || {}).forEach(([kk, v]) => {
        const [fid, k] = kk.split("|");
        const el = modalRoot.querySelector(`[data-fid="${fid}"][data-k="${k}"]`);
        if (el) el.value = v;
      });
      Object.entries(vals.eq || {}).forEach(([fid, rows]) => {
        const box = modalRoot.querySelector(`.row-box[data-fid="${fid}"]`);
        if (!box) return;
        box.querySelectorAll(".row-wrap, .row-item").forEach(r => r.remove());
        const add = box.querySelector(".eq-add");
        const bf = FIELD[box.dataset.fid] || {};
        (rows.length ? rows : [{}]).forEach(r => add.insertAdjacentHTML("beforebegin", rowItemHtml(bf, r)));
      });
      Object.entries(vals.sp || {}).forEach(([fid, sv]) => {
        const box = modalRoot.querySelector(`.spec-box[data-fid="${fid}"]`);
        if (box) box.querySelectorAll(".spec-sel").forEach(s => { if (sv[s.dataset.key] != null) s.value = sv[s.dataset.key]; });
      });
      syncChips();
    }
    let dTimer = null;
    function clearDraft() { clearTimeout(dTimer); localStorage.removeItem(DKEY); }
    try {
      const d = JSON.parse(localStorage.getItem(DKEY) || "null");
      if (d && d.t === dtag && Date.now() - d.ts < 86400000) {
        if (confirm("保存されていない下書きがあります。復元しますか？")) applySnap(d.vals);
        else localStorage.removeItem(DKEY);
      }
    } catch (e) {}
    // イベント委任 (動的に追加した装置行にも効く)。propertyで代入し重複登録を防ぐ
    const scheduleDraft = () => {
      clearTimeout(dTimer);
      dTimer = setTimeout(() => localStorage.setItem(DKEY, JSON.stringify({ t: dtag, ts: Date.now(), vals: snapshot() })), 400);
    };
    let sugTimer = null;
    const isMaker = e => e.target.classList && e.target.classList.contains("er-maker");
    editorHooks = {
      input: e => {
        scheduleDraft();
        if (isMaker(e)) { clearTimeout(sugTimer); showSug(e.target); }
      },
      change: e => {
        // ゲート付き行(可否など): 表示/非表示を切替。非表示にした時は中身をクリア
        const g = e.target.closest(".rf-gate");
        if (g) {
          const gated = g.parentElement.querySelector(".rf-gated");
          if (gated) {
            const show = g.value === g.dataset.show;
            gated.style.display = show ? "" : "none";
            if (!show) gated.querySelectorAll("input,select").forEach(el => { el.value = ""; });
          }
        }
        scheduleDraft();
      },
      click: e => {
        // 行スワイプで表示した「削除」
        const delBtn = e.target.closest(".row-del-btn");
        if (delBtn) { delBtn.closest(".row-wrap").remove(); toast("行を削除しました"); scheduleDraft(); return; }
        // 行スワイプで表示した「複製」
        const dupBtn = e.target.closest(".row-dup-btn");
        if (dupBtn) {
          const wrap = dupBtn.closest(".row-wrap"), box = wrap.closest(".row-box");
          const f = FIELD[box.dataset.fid] || {};
          wrap.insertAdjacentHTML("afterend", rowItemHtml(f, readOneRow(wrap.querySelector(".row-item"), f)));
          wrap.classList.remove("open"); wrap.dataset.side = ""; wrap.querySelector(".row-item").style.transform = "";
          toast("行を複製しました"); scheduleDraft(); return;
        }
        // デスミアのウェット/ドライ切替
        const dmt = e.target.closest(".dm-type");
        if (dmt) {
          const item = dmt.closest(".desmear-item"), t = dmt.dataset.t;
          item.querySelectorAll(".dm-type").forEach(x => x.classList.toggle("on", x === dmt));
          item.querySelector(".dm-wet").style.display = t === "wet" ? "" : "none";
          item.querySelector(".dm-dry").style.display = t === "dry" ? "" : "none";
          scheduleDraft(); return;
        }
        const add = e.target.closest(".eq-add");
        if (add) { const box = add.closest(".row-box"); add.insertAdjacentHTML("beforebegin", rowItemHtml(FIELD[box.dataset.fid] || {}, {})); scheduleDraft(); }
      },
      // 別のメーカー欄へ移った時に、前の欄のhideタイマーが新しい候補を消さないようclearする
      focusin: e => { if (isMaker(e)) { clearTimeout(sugTimer); showSug(e.target); } },
      focusout: e => { if (isMaker(e)) { clearTimeout(sugTimer); sugTimer = setTimeout(hideSug, 200); } },
    };
    $("#mCancel").onclick = () => { clearDraft(); closeModal(); };

    // 回答欄はDOMにある項目だけ差し替え、他カテゴリの入力は保持する
    function collectFields() {
      const fields = scoped ? { ...(m.fields || {}) } : {};
      if (scoped) SCHEMA[onlySec].fields.forEach(f => delete fields[f.id]);
      modalRoot.querySelectorAll("input[data-fid],textarea[data-fid]").forEach(el => {
        const fid = el.dataset.fid, k = el.dataset.k, v = el.value.trim();
        if (fid.startsWith("__note_")) { if (v) fields[fid] = { value: v }; else delete fields[fid]; return; }
        if (v) { fields[fid] = fields[fid] || {}; fields[fid][k] = v; }
      });
      // 行入力(装置/材料/薬液/デスミア/構造化): rows と 表示用テキスト(value) を両方保存
      modalRoot.querySelectorAll(".row-box").forEach(box => {
        const fid = box.dataset.fid, bf = FIELD[fid] || {};
        const rows = readRows(box);
        if (rows.length) fields[fid] = { rows, value: rows.map(r => fmtRowByField(bf, r)).join("\n") };
        else delete fields[fid];
      });
      // スペック: spec(選択値) と value(整形テキスト) を保存
      modalRoot.querySelectorAll(".spec-box").forEach(box => {
        const fid = box.dataset.fid, sv = readSpec(box);
        if (Object.keys(sv).length) fields[fid] = { spec: sv, value: fmtSpec(fid, sv) };
        else delete fields[fid];
      });
      return fields;
    }

    function doSave(delta) {
      if (!scoped) {
        const name = $("#e-name").value.trim();
        if (!name) { toast("会社名を入力してください"); return false; }
        m.name = name;
        m.factory = $("#e-factory").value.trim();
        m.location = $("#e-loc").value.trim();
        m.country = $("#e-country").value.trim() || "—";
        m.tags = $("#e-tags").value.split(",").map(t => t.trim()).filter(Boolean);
        m.rating = curRating;
        // 基本情報の保存では調査項目(m.fields)には触らない
      } else {
        m.fields = collectFields();
      }
      m.updatedAt = today();
      if (isNew) { m.visits = m.visits || []; makers.push(m); }
      else { const idx = makers.findIndex(x => x.id === id); makers[idx] = m; }
      save(); clearDraft();
      if (delta && scoped) {
        const t = onlySec + delta;
        if (t >= 0 && t < SCHEMA.length) {
          toast("保存しました");
          state.secIdx = t;
          router();
          openEditor(m.id, t);
          return;
        }
      }
      closeModal();
      if (isNew) {
        // 新規: 詳細画面に移動し、すぐ工程1からスワイプ入力を始められるようにする
        toast("基本情報を保存しました。工程情報を入力できます");
        state.secIdx = 0;
        go("maker/" + m.id); router();
        openEditor(m.id, 0);
        return;
      }
      toast("保存しました");
      go("maker/" + m.id); router();
    }

    // auto-grow textareas
    modalRoot.querySelectorAll("textarea.fi").forEach(t => {
      const grow = () => { t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight, 200) + "px"; };
      t.addEventListener("input", grow); grow();
    });
  }

  function delMaker(id) {
    const m = makers.find(x => x.id === id);
    if (!confirm(`「${m.name}」を削除しますか？この操作は取り消せません。`)) return;
    makers = makers.filter(x => x.id !== id); save(); go(""); toast("削除しました");
  }

  /* ---------- 設定画面 (工程ごと・種別ごとのメーカー候補) ---------- */
  const KIND_LABEL = { equip: "設備", material: "材料", chemical: "薬液" };
  function renderSettings() {
    window.onkeydown = null;
    const preset = getPreset();
    // 各フィールドの過去入力からの自動候補数
    const autoCount = fid => { const s = new Set(); makers.forEach(mk => ((mk.fields && mk.fields[fid] && mk.fields[fid].rows) || []).forEach(r => { if (r.maker) s.add(r.maker.trim()); })); return s.size; };
    // メーカー入力欄を持つ工程だけを列挙 (デスミアは候補対象外)
    const groups = SCHEMA.map(sec => ({ sec, fs: sec.fields.filter(f => makerFieldKind(f)) })).filter(g => g.fs.length);

    const groupHtml = groups.map((g, i) => `
      <details class="edit-section" ${i === 0 ? "open" : ""}>
        <summary><div class="acc-ico">${svg(g.sec.icon, 15)}</div>${esc(g.sec.section)} <span class="acc-count" style="margin-left:auto">${g.fs.length}欄</span></summary>
        <div class="es-body">
          ${g.fs.map(f => {
            const k = makerFieldKind(f);
            return `<div class="efield">
              <label class="fl"><span class="kbadge ${k}">${KIND_LABEL[k]}</span> ${esc(f.label)}</label>
              <div class="fhint">過去入力から自動: ${autoCount(f.id)}社${f.sub ? " ・ " + esc(f.sub.split("\n")[0]) : ""}</div>
              <textarea class="fi set-fld" data-fid="${f.id}" rows="3" placeholder="候補メーカーを1行に1社">${esc((preset[f.id] || []).join("\n"))}</textarea>
            </div>`;
          }).join("")}
        </div>
      </details>`).join("");

    app.innerHTML = topbar() + `
      <div class="wrap">
        <button class="btn ghost sm" style="margin-bottom:14px" onclick="location.hash=''">${svg("back", 15)} 一覧へ戻る</button>
        <h2 style="margin:0 0 4px">${svg("settings", 20)} 設定 — メーカー候補</h2>
        <p style="color:var(--muted);margin:0 0 16px;font-size:13.5px">
          候補は<b>工程ごと・種別（<span class="kbadge equip">設備</span><span class="kbadge material">材料</span><span class="kbadge chemical">薬液</span>）ごと</b>に分かれています。
          各欄に候補を登録すると、その工程のメーカー入力欄でだけ候補表示されます（1行に1社）。過去に入力したメーカーも自動で候補に出ます。</p>
        ${groupHtml}
        <div style="display:flex;gap:10px;margin:14px 0 4px">
          <button class="btn primary" id="setSave">${svg("check-circle", 16)} 候補を保存</button>
        </div>

        <div class="set-card" style="margin-top:22px">
          <label class="fl" style="font-size:14px">💾 データのバックアップ</label>
          <p style="color:var(--muted);font-size:12.5px;margin:6px 0 12px">この端末のデータをファイルに保存できます。機種変更や端末故障に備えて定期的な保存をおすすめします。</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <button class="btn ghost" id="setExport">${svg("download", 15)} JSON書き出し</button>
            <button class="btn ghost" id="setImport">${svg("upload", 15)} JSON読み込み</button>
          </div>
        </div>
        <div class="app-foot" style="margin-top:26px">基板メーカーDB v${APP_VERSION} (${APP_DATE})</div>
      </div>`;
    bindTop();
    $("#setSave").onclick = () => {
      const obj = {};
      app.querySelectorAll(".set-fld").forEach(t => {
        const list = [...new Set(t.value.split("\n").map(x => x.trim()).filter(Boolean))];
        if (list.length) obj[t.dataset.fid] = list;
      });
      localStorage.setItem(PRESET_KEY, JSON.stringify(obj));
      toast("メーカー候補を保存しました");
    };
    $("#setExport").onclick = exportJSON;
    $("#setImport").onclick = () => $("#fileInput").click();
  }

  /* ---------- 比較画面 ---------- */
  function renderCompare() {
    window.onkeydown = null;
    if (makers.length < 1) { go(""); return; }
    if (!state.cmp) state.cmp = makers.slice(0, Math.min(3, makers.length)).map(m => m.id);
    const opts = (sel) => makers.map(m => `<option value="${m.id}" ${sel === m.id ? "selected" : ""}>${esc(m.name)}</option>`).join("");
    const cols = state.cmp.filter(id => makers.find(m => m.id === id));
    const selRow = `<div class="toolbar">${[0, 1, 2].map(i =>
      `<select class="select cmp-sel" data-i="${i}"><option value="">— 選択 —</option>${opts(cols[i])}</select>`).join("")}</div>`;

    const chosen = cols.map(id => makers.find(m => m.id === id)).filter(Boolean);
    let rows = "";
    SCHEMA.forEach(sec => {
      rows += `<tr><td class="cmp-sec" colspan="${chosen.length + 1}">${esc(sec.section)}</td></tr>`;
      sec.fields.forEach(f => {
        const vals = chosen.map(m => { const d = (m.fields && m.fields[f.id]) || {}; return d.value ? esc(d.value) : '<span style="color:var(--faint)">—</span>'; });
        // 全て空ならスキップ
        if (vals.every(v => v.includes("var(--faint)"))) return;
        rows += `<tr><td class="lbl">${esc(f.label)}${f.sub ? `<div style="font-size:10.5px;color:var(--faint)">${esc(f.sub)}</div>` : ""}</td>${vals.map(v => `<td>${v}</td>`).join("")}</tr>`;
      });
    });

    app.innerHTML = topbar() + `
      <div class="wrap">
        <button class="btn ghost sm" style="margin-bottom:14px" onclick="location.hash=''">${svg("back", 15)} 一覧へ戻る</button>
        <h2 style="margin:0 0 4px">${svg("compare", 20)} メーカー比較</h2>
        <p style="color:var(--muted);margin:0 0 8px">最大3社を横並びで比較できます（両社とも空欄の項目は非表示）。</p>
        ${selRow}
        <div class="cmp-scroll"><table class="cmp-table">
          <thead><tr><th>項目</th>${chosen.map(m => `<th>${esc(m.name)}<div style="font-size:11px;color:var(--muted);font-weight:500">${esc(m.location || "")}</div></th>`).join("")}</tr></thead>
          <tbody>${rows || `<tr><td colspan="${chosen.length + 1}" style="text-align:center;color:var(--faint);padding:30px">記入済みの項目がありません</td></tr>`}</tbody>
        </table></div>
      </div>`;
    bindTop();
    modalRoot.innerHTML = "";
    app.querySelectorAll(".cmp-sel").forEach(sel => sel.onchange = () => {
      const arr = [...app.querySelectorAll(".cmp-sel")].map(s => s.value).filter(Boolean);
      state.cmp = arr; renderCompare();
    });
  }

  /* ---------- モーダル共通 ---------- */
  let onSave = null;
  function modal(title, bodyHTML, saveFn) {
    onSave = saveFn;
    editorHooks = null;
    hideSug();
    modalRoot.innerHTML = `
      <div class="overlay" id="ov">
        <div class="sheet">
          <div class="sheet-head">
            <h2>${title}</h2>
            <button class="iconbtn" id="mClose">${svg("x")}</button>
          </div>
          <div class="sheet-body">${bodyHTML}</div>
          <div class="sheet-foot">
            <button class="btn ghost" id="mCancel">キャンセル</button>
            <button class="btn primary" id="mSave">保存</button>
          </div>
        </div>
      </div>`;
    $("#ov").onclick = (e) => { if (e.target.id === "ov") closeModal(); };
    $("#mClose").onclick = closeModal;
    $("#mCancel").onclick = closeModal;
    $("#mSave").onclick = () => { if (onSave && onSave() === false) return; };
    document.body.style.overflow = "hidden";
  }
  function closeModal() { hideSug(); modalRoot.innerHTML = ""; document.body.style.overflow = ""; }

  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  /* ---------- 入出力 ---------- */
  function exportJSON() {
    const data = JSON.stringify(makers, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `makers_${today()}.json`;
    a.click(); URL.revokeObjectURL(a.href);
    toast("JSONを書き出しました");
  }
  function importJSON(e) {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(r.result);
        if (!Array.isArray(data)) throw 0;
        const mode = makers.length && confirm("既存データにマージしますか？\n[OK]=マージ / [キャンセル]=置き換え");
        if (mode) {
          const byId = new Map(makers.map(m => [m.id, m]));
          data.forEach(m => byId.set(m.id, m));
          makers = [...byId.values()];
        } else makers = data;
        save(); router(); toast(`${data.length}件を読み込みました`);
      } catch { toast("読み込みに失敗しました（JSON形式を確認）"); }
    };
    r.readAsText(file);
    e.target.value = "";
  }

  /* ---------- テーマ ---------- */
  function toggleTheme() {
    const cur = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = cur;
    localStorage.setItem(THEME_KEY, cur);
    router();
  }

  /* ---------- 初期化 (サンプル読込含む) ---------- */
  // 旧: 種別ごとの全工程共通候補 → 新: 工程(フィールド)ごとの候補 へ一度だけ移行
  function migratePresets() {
    if (localStorage.getItem(PRESET_KEY)) return;
    let eq = [], mat = [];
    try { eq = JSON.parse(localStorage.getItem(PRESET_EQUIP)) || []; } catch {}
    try { mat = JSON.parse(localStorage.getItem(PRESET_MAT)) || []; } catch {}
    if (!eq.length && !mat.length) return;
    const obj = {};
    SCHEMA.forEach(s => s.fields.forEach(f => {
      const k = makerFieldKind(f);
      if (k === "equip" && eq.length) obj[f.id] = [...eq];
      else if ((k === "material" || k === "chemical") && mat.length) obj[f.id] = [...mat];
    }));
    if (Object.keys(obj).length) localStorage.setItem(PRESET_KEY, JSON.stringify(obj));
  }

  function boot() {
    const t = localStorage.getItem(THEME_KEY);
    if (t) document.documentElement.dataset.theme = t;
    load();
    migratePresets();
    const seeded = localStorage.getItem("pcb_seeded");
    if (!makers.length && !seeded) {
      fetch("data/makers.sample.json").then(r => r.ok ? r.json() : null).then(d => {
        if (d && Array.isArray(d)) { makers = d; save(); }
        localStorage.setItem("pcb_seeded", "1");
        router();
      }).catch(() => { localStorage.setItem("pcb_seeded", "1"); router(); });
    } else {
      router();
    }
    window.addEventListener("hashchange", router);
  }
  boot();
})();
