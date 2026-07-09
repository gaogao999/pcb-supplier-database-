/* ==========================================================================
   基板メーカーDB — 訪問した基板メーカーの技術情報を蓄積・更新する生きたDB
   データは端末内(localStorage)に保存。JSONで書き出して repo に残せます。
   ========================================================================== */
(function () {
  "use strict";

  const SCHEMA = window.SCHEMA || [];
  const STORE_KEY = "pcb_makers_v1";
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
  function load() {
    try { makers = JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
    catch { makers = []; }
  }
  function save() { localStorage.setItem(STORE_KEY, JSON.stringify(makers)); }
  const uid = () => "m" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
  const today = () => new Date().toISOString().slice(0, 10);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function filledCount(m) {
    if (!m.fields) return 0;
    return Object.values(m.fields).filter(f => f && f.value && String(f.value).trim()).length;
  }
  const TOTAL_FIELDS = SCHEMA.reduce((n, s) => n + s.fields.length, 0);

  /* ---------- ルーティング (ハッシュ) ---------- */
  function router() {
    const h = location.hash.slice(1);
    if (h.startsWith("maker/")) return renderDetail(h.slice(6));
    if (h === "compare") return renderCompare();
    return renderList();
  }
  const go = (h) => { location.hash = h; };

  /* ---------- トップバー ---------- */
  function topbar() {
    return `
    <div class="topbar"><div class="topbar-inner">
      <div class="brand" onclick="location.hash=''">
        <img src="icon.svg" alt="">
        <div><h1>基板メーカーDB</h1><small>SUBSTRATE MAKER DATABASE</small></div>
      </div>
      <div class="searchbox">
        <span class="ico">${svg("search", 16)}</span>
        <input id="q" type="search" placeholder="メーカー名・所在地・タグで検索…" autocomplete="off">
      </div>
      <button class="iconbtn" id="themeBtn" title="テーマ切替">${svg(document.documentElement.dataset.theme === "light" ? "moon" : "sun")}</button>
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
    $("#addBtn").onclick = () => openEditor(null);
    $("#exportBtn").onclick = exportJSON;
    $("#importBtn").onclick = () => $("#fileInput").click();
    $("#fileInput").onchange = importJSON;
  }

  /* ---------- 一覧画面 ---------- */
  const state = { query: "", filter: "all", sort: "updated" };

  function renderList() {
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
      </div>`;
    bindTop();
    $("#sortSel").value = state.sort;
    $("#sortSel").onchange = e => { state.sort = e.target.value; renderCards(); };
    $("#cmpBtn").onclick = () => go("compare");
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

    const navChips = SCHEMA.map(s => `<span class="chip" onclick="document.getElementById('sec-${s.section}').scrollIntoView({behavior:'smooth',block:'start'})">${esc(s.section)}</span>`).join("");

    const sections = SCHEMA.map((sec, si) => {
      const open = openSections[sec.section] !== false && si < 3 ? true : openSections[sec.section] === true;
      const secFilled = sec.fields.filter(f => m.fields && m.fields[f.id] && m.fields[f.id].value).length;
      const rows = sec.fields.map(f => {
        const d = (m.fields && m.fields[f.id]) || {};
        const val = d.value && String(d.value).trim();
        return `<div class="field">
          <div class="field-label">${esc(f.label)}</div>
          ${f.sub ? `<div class="field-sub">${esc(f.sub)}</div>` : ""}
          <div class="field-val ${val ? "" : "blank"}">${val ? esc(d.value) : "未記入"}</div>
          ${d.remark ? `<div class="field-remark">📝 ${esc(d.remark)}</div>` : ""}
        </div>`;
      }).join("");
      return `<div class="acc ${open ? "open" : ""}" id="sec-${sec.section}" data-sec="${esc(sec.section)}">
        <div class="acc-head" onclick="window.__toggleSec(this)">
          <div class="acc-ico">${svg(sec.icon, 18)}</div>
          <h3>${esc(sec.section)}</h3>
          <span class="acc-count">${secFilled}/${sec.fields.length}</span>
          <span class="acc-chevron">${svg("chevron", 18)}</span>
        </div>
        <div class="acc-body">${rows}</div>
      </div>`;
    }).join("");

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
              <button class="btn primary sm" id="editBtn">${svg("edit", 15)} 編集</button>
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

        <div class="section-nav">${navChips}</div>
        ${sections}
      </div>`;
    bindTop();
    $("#editBtn").onclick = () => openEditor(m.id);
    $("#delBtn").onclick = () => delMaker(m.id);
    $("#visitBtn").onclick = $("#visitBtn2").onclick = () => openVisit(m.id);
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
  function openEditor(id) {
    const isNew = !id;
    const m = isNew
      ? { id: uid(), name: "", factory: "", location: "", country: "", rating: 0, tags: [], visits: [], fields: {}, date: today(), updatedAt: today() }
      : JSON.parse(JSON.stringify(makers.find(x => x.id === id)));
    if (!m) return;

    const secForm = SCHEMA.map((sec, i) => `
      <details class="edit-section" ${i === 0 ? "open" : ""}>
        <summary><div class="acc-ico">${svg(sec.icon, 15)}</div>${esc(sec.section)} <span class="acc-count" style="margin-left:auto">${sec.fields.length}項目</span></summary>
        <div class="es-body">
          ${sec.fields.map(f => {
            const d = (m.fields && m.fields[f.id]) || {};
            return `<div class="efield">
              <label class="fl">${esc(f.label)}</label>
              ${f.sub ? `<div class="fhint">${esc(f.sub)}</div>` : ""}
              <div class="pair">
                <textarea class="fi" data-fid="${f.id}" data-k="value" rows="1" placeholder="${esc(f.example ? "例: " + f.example : "")}">${esc(d.value || "")}</textarea>
                <input class="fi" data-fid="${f.id}" data-k="remark" placeholder="備考 / 補足${f.note ? " — " + esc(f.note) : ""}" value="${esc(d.remark || "")}">
              </div>
            </div>`;
          }).join("")}
        </div>
      </details>`).join("");

    const body = `
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
      <h3 style="margin:20px 0 10px;font-size:15px;color:var(--brand2)">調査項目 (KAGA基板工場調査表)</h3>
      <p style="color:var(--faint);font-size:12.5px;margin:0 0 12px">各項目に上段=回答、下段=備考。空欄はプレースホルダの記入例を参考に。訪問ごとに少しずつ埋めていけます。</p>
      ${secForm}`;

    modal(isNew ? "メーカーを追加" : `編集 — ${esc(m.name)}`, body, () => {
      const name = $("#e-name").value.trim();
      if (!name) { toast("会社名を入力してください"); return false; }
      m.name = name;
      m.factory = $("#e-factory").value.trim();
      m.location = $("#e-loc").value.trim();
      m.country = $("#e-country").value.trim() || "—";
      m.tags = $("#e-tags").value.split(",").map(t => t.trim()).filter(Boolean);
      m.rating = curRating;
      const fields = {};
      modalRoot.querySelectorAll("[data-fid]").forEach(el => {
        const fid = el.dataset.fid, k = el.dataset.k, v = el.value.trim();
        if (v) { fields[fid] = fields[fid] || {}; fields[fid][k] = v; }
      });
      // remark のみで value 空のものは残す
      m.fields = fields;
      m.updatedAt = today();
      if (isNew) { m.visits = m.visits || []; makers.push(m); }
      else { const idx = makers.findIndex(x => x.id === id); makers[idx] = m; }
      save(); closeModal();
      toast(isNew ? "メーカーを追加しました" : "保存しました");
      go("maker/" + m.id); router();
    });

    // rating interaction
    let curRating = m.rating || 0;
    const rEl = $("#e-rating");
    rEl.querySelectorAll("span").forEach(s => {
      s.onclick = () => { curRating = +s.dataset.v; rEl.querySelectorAll("span").forEach(x => x.classList.toggle("on", +x.dataset.v <= curRating)); };
    });
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

  /* ---------- 比較画面 ---------- */
  function renderCompare() {
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
    modalRoot.innerHTML = `
      <div class="overlay" id="ov">
        <div class="sheet" onclick="event.stopPropagation()">
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
    $("#ov").onclick = closeModal;
    $("#mClose").onclick = closeModal;
    $("#mCancel").onclick = closeModal;
    $("#mSave").onclick = () => { if (onSave && onSave() === false) return; };
    document.body.style.overflow = "hidden";
  }
  function closeModal() { modalRoot.innerHTML = ""; document.body.style.overflow = ""; }

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
  function boot() {
    const t = localStorage.getItem(THEME_KEY);
    if (t) document.documentElement.dataset.theme = t;
    load();
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
