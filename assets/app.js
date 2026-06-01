/* =========================================================
 *  종목 분석 사이트 렌더러 (무의존성 vanilla JS)
 * ========================================================= */
(function () {
  "use strict";
  var STOCKS = window.STOCKS || [];

  // ---------- 유틸 ----------
  function el(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function num(n, d) {
    if (n == null || n === "" || isNaN(n)) return "—";
    return Number(n).toLocaleString("ko-KR", { maximumFractionDigits: d == null ? 1 : d });
  }
  function money(v, cur) {
    if (v == null || v === "") return "—";
    return (cur === "$" ? "$" : "") + num(v, cur === "$" ? 2 : 0) + (cur === "원" ? "원" : "");
  }
  function pct(n, d) { return n == null ? "—" : num(n, d == null ? 1 : d) + "%"; }
  function upside(s) {
    if (!s.targetPrice || !s.currentPrice) return null;
    return (s.targetPrice - s.currentPrice) / s.currentPrice * 100;
  }

  // ---------- 무료 리서치 바로가기 링크 (국가·티커로 자동 생성) ----------
  function researchLinks(s) {
    var t = encodeURIComponent(s.ticker), ex = encodeURIComponent(s.exchange || ""), L = [];
    if (s.country === "한국") {
      L.push(["네이버 금융", "https://finance.naver.com/item/main.naver?code=" + t]);
      L.push(["한경 컨센서스", "https://markets.hankyung.com/consensus"]);
      L.push(["FnGuide 기업정보", "https://comp.fnguide.com/SVO2/ASP/SVD_Main.asp?gicode=A" + t]);
      L.push(["DART 전자공시", "https://dart.fss.or.kr/"]);
    } else {
      L.push(["SEC EDGAR(공시)", "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&ticker=" + t + "&type=10-K&dateb=&owner=include&count=40"]);
      L.push(["StockAnalysis", "https://stockanalysis.com/stocks/" + t + "/"]);
      L.push(["Finviz", "https://finviz.com/quote.ashx?t=" + t]);
      L.push(["실적 콜(MarketBeat)", "https://www.marketbeat.com/stocks/" + ex + "/" + t + "/earnings/"]);
    }
    (s.links || []).forEach(function (x) { if (x && x.url) L.push([x.title || x.url, x.url]); });
    return '<div class="rlinks-wrap"><span class="rl-label">🔗 리서치 바로가기 (무료 · 로그인 불필요)</span>' +
      '<div class="rlinks">' + L.map(function (p) {
        return '<a class="rlink" href="' + esc(p[1]) + '" target="_blank" rel="noopener">' + esc(p[0]) + " ↗</a>";
      }).join("") + "</div></div>";
  }

  // ---------- 사이드바 목록 ----------
  function renderList(filter) {
    var box = el("list");
    var q = (filter || "").trim().toLowerCase();
    var items = STOCKS.filter(function (s) {
      if (!q) return true;
      return (s.name + " " + s.ticker + " " + s.sector + " " + s.country)
        .toLowerCase().indexOf(q) >= 0;
    });
    el("count").textContent = items.length + " 종목";
    if (!items.length) { box.innerHTML = '<div class="empty" style="padding:24px">검색 결과 없음</div>'; return; }
    var cur = location.hash.replace("#", "");
    box.innerHTML = items.map(function (s) {
      var up = upside(s);
      var upTxt = up == null ? "" :
        '<span class="c-up" style="color:' + (up >= 0 ? "var(--up)" : "var(--down)") + '">' +
        (up >= 0 ? "▲" : "▼") + " 상승여력 " + num(Math.abs(up), 1) + "%</span>";
      return '<div class="card ' + (s.ticker === cur ? "active" : "") + '" data-t="' + esc(s.ticker) + '">' +
        '<div class="c-top"><span class="c-name">' + esc(s.name) + '</span>' +
        '<span class="c-tic">' + esc(s.ticker) + " · " + esc(s.exchange) + "</span></div>" +
        '<div class="c-sec">' + esc(s.sector) + " · " + esc(s.country) + "</div>" +
        '<div class="c-bot"><span class="badge ' + esc(s.rating) + '">' + esc(s.rating) + "</span>" +
        upTxt + "</div></div>";
    }).join("");
    Array.prototype.forEach.call(box.querySelectorAll(".card"), function (c) {
      c.onclick = function () { location.hash = c.getAttribute("data-t"); };
    });
  }

  // ---------- SVG 막대차트 (매출/영업이익) ----------
  function chart(fin) {
    var rows = fin.rows || [];
    if (!rows.length) return "";
    var W = 560, H = 200, pad = 34, gap = 24;
    var maxV = 0;
    rows.forEach(function (r) {
      maxV = Math.max(maxV, r.revenue || 0, r.opIncome || 0);
    });
    maxV = maxV * 1.15 || 1;
    var groupW = (W - pad * 2 - gap * (rows.length - 1)) / rows.length;
    var barW = groupW / 2 - 3;
    var base = H - 26;
    var svg = '<svg viewBox="0 0 ' + W + " " + H + '" width="100%" preserveAspectRatio="xMidYMid meet">';
    // y 기준선
    for (var g = 0; g <= 3; g++) {
      var y = 18 + (base - 18) * g / 3;
      svg += '<line x1="' + pad + '" y1="' + y + '" x2="' + (W - pad) + '" y2="' + y +
        '" stroke="#eef0f3"/>';
    }
    rows.forEach(function (r, i) {
      var x = pad + i * (groupW + gap);
      var rh = Math.max(0, (r.revenue || 0) / maxV * (base - 18));
      var oh = Math.max(0, (r.opIncome || 0) / maxV * (base - 18));
      // 매출
      svg += '<rect x="' + x + '" y="' + (base - rh) + '" width="' + barW + '" height="' + rh +
        '" rx="2" fill="#2e5496"/>';
      if (r.revenue != null)
        svg += '<text x="' + (x + barW / 2) + '" y="' + (base - rh - 4) + '" font-size="9" fill="#2e5496" text-anchor="middle">' + num(r.revenue, 0) + "</text>";
      // 영업이익
      var x2 = x + barW + 6;
      svg += '<rect x="' + x2 + '" y="' + (base - oh) + '" width="' + barW + '" height="' + oh +
        '" rx="2" fill="#c55a11"/>';
      if (r.opIncome != null)
        svg += '<text x="' + (x2 + barW / 2) + '" y="' + (base - oh - 4) + '" font-size="9" fill="#c55a11" text-anchor="middle">' + num(r.opIncome, 0) + "</text>";
      // 연도
      svg += '<text x="' + (x + groupW / 2) + '" y="' + (H - 8) + '" font-size="11" fill="#6b7280" text-anchor="middle">' + esc(r.year) + "</text>";
    });
    svg += "</svg>";
    return '<div class="chart-wrap"><div class="legend">' +
      '<span><i style="background:#2e5496"></i>매출</span>' +
      '<span><i style="background:#c55a11"></i>영업이익</span>' +
      "<span>(단위: " + esc(fin.unit) + ")</span></div>" + svg + "</div>";
  }

  // ---------- 리포트 ----------
  function renderReport(s) {
    var cur = s.currency, up = upside(s);
    var upClass = up == null ? "" : (up >= 0 ? "up" : "down");
    var upTxt = up == null ? "" : (up >= 0 ? "▲ " : "▼ ") + num(Math.abs(up), 1) + "%";

    // KPI
    var kpis = [
      { l: "현재가", v: money(s.currentPrice, cur), s: "" },
      { l: "목표가", v: money(s.targetPrice, cur), s: upTxt, c: upClass },
      { l: "매수희망가", v: s.buyZone || "—", s: "" },
      { l: "손절가", v: money(s.stopLoss, cur), s: "" },
      { l: "시가총액", v: s.marketCap || "—", s: "" }
    ].map(function (k) {
      return '<div class="kpi"><div class="k-l">' + esc(k.l) + '</div><div class="k-v">' +
        esc(k.v) + '</div><div class="k-s ' + (k.c || "") + '">' + esc(k.s) + "</div></div>";
    }).join("");

    // 밸류에이션 스냅샷
    var sn = s.snapshot || {};
    var snap =
      '<table class="tbl snap"><tr><td>PER</td><td>' + num(sn.per, 1) + '</td>' +
      '<td>PBR</td><td>' + num(sn.pbr, 1) + '</td></tr>' +
      '<tr><td>EV/EBITDA</td><td>' + num(sn.evEbitda, 1) + '</td>' +
      '<td>배당수익률</td><td>' + pct(sn.dividendYield, 1) + '</td></tr>' +
      '<tr><td>ROE</td><td>' + pct(sn.roe, 0) + '</td>' +
      '<td>52주 범위</td><td>' + esc(sn.week52 || "—") + '</td></tr></table>';

    // 세그먼트
    var seg = (s.segments || []).map(function (g) {
      return '<div class="seg"><div class="s-top"><span>' + esc(g.name) + '</span><span>' +
        num(g.pct, 0) + '%</span></div><div class="s-bar"><div class="s-fill" style="width:' +
        Math.min(100, g.pct) + '%"></div></div></div>';
    }).join("");

    // 실적표
    var fr = (s.financials && s.financials.rows) || [];
    var finTbl = '<table class="tbl"><tr><th>항목</th>' +
      fr.map(function (r) { return "<th>" + esc(r.year) + "</th>"; }).join("") + "</tr>";
    var defs = [
      ["매출액", "revenue", 1], ["영업이익", "opIncome", 1],
      ["영업이익률", "opMargin", "pct"], ["순이익", "netIncome", 1], ["EPS", "eps", 2]
    ];
    defs.forEach(function (d) {
      finTbl += "<tr><td>" + d[0] + "</td>" + fr.map(function (r) {
        var v = r[d[1]];
        return "<td>" + (d[2] === "pct" ? pct(v, 1) : num(v, d[2])) + "</td>";
      }).join("") + "</tr>";
    });
    finTbl += "</table>";

    // 촉매 / 리스크
    function ul(arr) { return '<ul class="list-min">' + (arr || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }

    // Peer 비교
    var peers = (s.valuation && s.valuation.peers) || [];
    var peerTbl = peers.length ? '<table class="tbl"><tr><th>종목</th><th>PER</th><th>PBR</th><th>EV/EBITDA</th></tr>' +
      peers.map(function (p, i) {
        return '<tr class="' + (i === 0 ? "hl" : "") + '"><td>' + esc(p.name) + "</td><td>" +
          num(p.per, 1) + "</td><td>" + num(p.pbr, 1) + "</td><td>" + num(p.evEbitda, 1) + "</td></tr>";
      }).join("") + "</table>" : "";

    // 체크리스트
    var check = '<ul class="check">' + (s.checklist || []).map(function (c) {
      var cls = c.ok === true ? "ok" : c.ok === false ? "no" : "na";
      var mk = c.ok === true ? "✓" : c.ok === false ? "✕" : "?";
      return '<li><span class="mk ' + cls + '">' + mk + "</span>" + esc(c.q) + "</li>";
    }).join("") + "</ul>";

    // 증권사 리포트 비교
    var br = s.brokerReports, brokerSec = "";
    if (br && br.rows && br.rows.length) {
      var brRows = br.rows.map(function (r) {
        var nameCell = r.pdf
          ? '<a href="' + esc(r.pdf) + '" target="_blank" rel="noopener">' + esc(r.broker) + " 📄</a>"
          : esc(r.broker);
        var opCls = r.opinion === "매수" ? "매수" : (r.opinion === "매도" ? "매도" : "중립");
        return "<tr><td>" + nameCell + "</td><td>" + esc(r.date) +
          '</td><td><span class="badge ' + opCls + '">' + esc(r.opinion) + "</span></td><td>" +
          money(r.target, cur) + '</td><td style="text-align:left">' + esc(r.note) + "</td></tr>";
      }).join("");
      var avgRow = br.avgTarget ? '<tr class="hl"><td>평균 목표가</td><td>—</td><td>—</td><td>' +
        money(br.avgTarget, cur) + '</td><td style="text-align:left">' +
        (br.rows.length + "개 리포트 단순평균") + "</td></tr>" : "";
      brokerSec = '<section class="blk"><h3>📑 증권사 리포트 (참고)</h3>' +
        '<table class="tbl"><tr><th>증권사</th><th>날짜</th><th>의견</th><th>목표가</th><th>핵심 코멘트</th></tr>' +
        brRows + avgRow + "</table>" +
        (br.note ? '<p style="margin-top:10px">' + esc(br.note) + "</p>" : "") +
        '<p class="disclaimer" style="border:none;padding-top:6px">※ 리포트 원문(PDF)은 개인 학습용입니다. 공개 저장소(public repo)에 올릴 경우 저작권에 유의하세요.</p>' +
        "</section>";
    }

    // 출처
    var src = '<ul class="sources">' + (s.sources || []).map(function (x) {
      return '<li><a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.title) + " ↗</a></li>";
    }).join("") + "</ul>";

    var html =
      '<div class="report"><div class="rep-head"><div class="rh-top">' +
        '<h2>' + esc(s.name) + '</h2>' +
        '<span class="badge ' + esc(s.rating) + '" style="font-size:13px">투자의견 ' + esc(s.rating) + '</span>' +
        '<div class="asof">' + esc(s.ticker) + " · " + esc(s.exchange) + "<br>기준일 " + esc(s.asOf) + "</div></div>" +
        '<div class="sub">' + esc(s.sector) + " · " + esc(s.country) + "</div></div>" +
      '<div class="kpis">' + kpis + "</div>" +
      '<div class="body">' +

        researchLinks(s) +

        '<section class="blk"><h3>📌 투자 아이디어 (Thesis)</h3>' +
          '<div class="lead">' + esc(s.thesis) + "</div></section>" +

        '<section class="blk"><h3>✅ 핵심 투자포인트</h3><ul class="points">' +
          (s.points || []).map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></section>" +

        '<section class="blk"><h3>💹 밸류에이션 스냅샷</h3>' + snap + "</section>" +

        '<section class="blk"><h3>🏭 비즈니스모델 & 매출 구성</h3>' +
          '<p>' + esc(s.businessModel) + "</p>" + seg + "</section>" +

        '<section class="blk"><h3>🛡️ 산업 · 경쟁 · 해자(Moat)</h3><p>' + esc(s.industry) + "</p></section>" +

        '<section class="blk"><h3>📊 실적 추이 (PL)</h3>' + finTbl + chart(s.financials || {}) + "</section>" +

        '<section class="blk"><h3>⚡ 촉매 vs 리스크</h3><div class="cols2">' +
          '<div class="pane cat"><h4>성장 드라이버 / 촉매(Catalyst)</h4>' + ul(s.catalysts) + "</div>" +
          '<div class="pane risk"><h4>리스크 / 체크 포인트</h4>' + ul(s.risks) + "</div></div></section>" +

        '<section class="blk"><h3>⚖️ Valuation · Peer 비교</h3>' + peerTbl +
          '<p style="margin-top:10px">' + esc((s.valuation && s.valuation.comment) || "") + "</p></section>" +

        brokerSec +

        '<section class="blk"><h3>🚨 무효화 조건 (매도 기준)</h3>' +
          '<div class="invalid"><b>이게 틀리면 판다 · </b>' + esc(s.invalidation || "—") + "</div></section>" +

        '<section class="blk"><h3>🧾 투자 전 체크리스트</h3>' + check + "</section>" +

        '<section class="blk"><h3>🔗 출처</h3>' + src +
          '<div class="disclaimer">※ 본 자료는 공개정보를 바탕으로 한 <b>개인 학습용 정리</b>이며 투자 권유가 아닙니다. ' +
          '수치는 작성 시점 기준이며 오차가 있을 수 있으니, 투자 판단 전 반드시 최신 공시·원문을 확인하세요.</div>' +
        "</section>" +
      "</div></div>";

    el("main").innerHTML = html;
    document.title = s.name + " · 종목 분석";
  }

  // ---------- 안내 화면 ----------
  function renderHome() {
    var prompt = "다음 종목을 증권사 리포트 수준으로 조사해서 equity-research/data/stocks.js 에 추가해줘: [티커/종목명]";
    el("main").innerHTML =
      '<div class="empty"><h2>📈 나의 종목 분석 노트</h2>' +
      '<p>왼쪽 목록에서 종목을 선택하면 증권사 리포트 형식의 분석을 볼 수 있습니다.<br>' +
      '현재 <b>' + STOCKS.length + '개</b> 종목이 정리되어 있습니다.</p></div>' +
      '<div class="howto"><h3>➕ 새 종목 추가하는 법</h3>' +
      '<p>HTML에서 직접 조사하긴 어렵습니다. 대신 <b>Claude에게 아래처럼 요청</b>하면 ' +
      '제가 조사해서 <code>data/stocks.js</code>에 추가해 드립니다. 그 후 GitHub에 push 하면 어느 PC에서든 보입니다.</p>' +
      '<div class="lead" style="margin:10px 0">' + esc(prompt) + '</div>' +
      '<button class="copybtn" id="copyp">요청 문구 복사</button> ' +
      '<span id="copied" style="font-size:12px;color:var(--buy);display:none">복사됨!</span></div>';
    var b = el("copyp");
    if (b) b.onclick = function () {
      navigator.clipboard && navigator.clipboard.writeText(prompt);
      var c = el("copied"); if (c) { c.style.display = "inline"; setTimeout(function () { c.style.display = "none"; }, 1500); }
    };
  }

  // ---------- Q&A (비동기 · GitHub Issue 경유) ----------
  var PEND_KEY = "qna_pending_v1";
  function loadPending() {
    try { return JSON.parse(localStorage.getItem(PEND_KEY) || "[]"); } catch (e) { return []; }
  }
  function savePending(a) { try { localStorage.setItem(PEND_KEY, JSON.stringify(a)); } catch (e) {} }

  function claudePrompt(q, ticker) {
    return "[종목분석 사이트 Q&A]\n종목: " + (ticker || "-") + "\n질문: " + q +
      "\n\n(stocks.js와 reports 폴더를 참고해 분석하고, data/qa.js 에 답변을 추가해줘)";
  }
  function issueUrl(q, ticker) {
    var repo = (window.SITE_CONFIG || {}).repo || "";
    var title = "[Q&A] " + q.slice(0, 50);
    var body = "종목: " + (ticker || "-") + "\n\n" + q +
      "\n\n---\n(종목분석 사이트 Q&A에서 생성 · Claude Code가 분석 후 data/qa.js에 답변 추가)";
    return "https://github.com/" + repo + "/issues/new?labels=qna&title=" +
      encodeURIComponent(title) + "&body=" + encodeURIComponent(body);
  }
  function copyText(t) {
    if (navigator.clipboard) navigator.clipboard.writeText(t);
  }
  function tickerName(t) {
    var s = STOCKS.filter(function (x) { return x.ticker === t; })[0];
    return s ? s.name : t;
  }

  function renderQA() {
    var repo = (window.SITE_CONFIG || {}).repo || "";
    var answered = (window.QA || []).slice().sort(function (a, b) {
      return String(b.date || "").localeCompare(String(a.date || ""));
    });
    var answeredQs = {};
    answered.forEach(function (x) { answeredQs[(x.question || "").trim()] = true; });
    var pending = loadPending().filter(function (p) { return !answeredQs[(p.question || "").trim()]; });

    var opts = '<option value="">(종목 선택 안 함)</option>' + STOCKS.map(function (s) {
      return '<option value="' + esc(s.ticker) + '">' + esc(s.name) + " (" + esc(s.ticker) + ")</option>";
    }).join("");

    var repoNote = repo
      ? '<span class="ok">연결됨: ' + esc(repo) + "</span>"
      : '<span class="warn">저장소 미설정 → 질문이 클립보드에 복사됩니다. (data/config.js의 repo 입력)</span>';

    var ask =
      '<div class="qa-ask">' +
        '<div class="qa-row"><select id="qa-stock" class="qa-stock">' + opts + "</select>" +
          '<span class="qa-repo">' + repoNote + "</span></div>" +
        '<textarea id="qa-input" class="qa-input" rows="3" placeholder="예) 삼성전자 2026E 영업이익 추정이 너무 공격적인 거 아냐? 보수적으로 보면 목표가가 얼마야?"></textarea>' +
        '<div class="qa-btns"><button class="btn-primary" id="qa-send">질문 보내기 (GitHub Issue)</button>' +
          '<button class="btn-ghost" id="qa-copy">질문 복사</button></div>' +
      "</div>";

    var pend = pending.length ? pending.slice().reverse().map(function (p) {
      return '<div class="qa-item pending"><div class="qa-q">' +
        (p.ticker ? '<span class="qa-chip">' + esc(tickerName(p.ticker)) + "</span>" : "") +
        '<span class="qa-date">' + esc(p.date) + '</span><span class="qa-status">⏳ 분석 대기 중</span></div>' +
        '<div class="qa-qtext">' + esc(p.question) + "</div>" +
        '<div class="qa-actions"><a href="#" data-copy="' + esc(p.id) + '">프롬프트 복사</a> · ' +
        '<a href="#" data-del="' + esc(p.id) + '">삭제</a></div></div>';
    }).join("") : "";

    var feed = answered.map(function (x) {
      return '<div class="qa-item"><div class="qa-q">' +
        (x.ticker ? '<span class="qa-chip">' + esc(tickerName(x.ticker)) + "</span>" : "") +
        '<span class="qa-date">' + esc(x.date) + "</span></div>" +
        '<div class="qa-qtext">Q. ' + esc(x.question) + "</div>" +
        '<div class="qa-a">' + (x.answer || "") + "</div></div>";
    }).join("");

    el("main").innerHTML =
      '<div class="qa-wrap"><h2 class="qa-title">💬 Q&A — 종목에 대해 물어보세요</h2>' +
      '<p class="qa-help">질문을 보내면 GitHub Issue로 전달됩니다. <b>Claude Code가 종목데이터·리포트를 분석해 답을 사이트에 추가</b>합니다(실시간 아님). ' +
      '답변이 추가되면 최신 사이트에서 아래에 표시됩니다.</p>' +
      ask +
      (pend ? '<h3 class="qa-sec">보낸 질문</h3>' + pend : "") +
      '<h3 class="qa-sec">답변</h3>' + (feed || '<div class="empty" style="padding:24px">아직 답변이 없습니다.</div>') +
      "</div>";

    var send = el("qa-send"), copy = el("qa-copy");
    function curVals() {
      var q = (el("qa-input") || {}).value || "";
      var tk = (el("qa-stock") || {}).value || "";
      return { q: q.trim(), tk: tk };
    }
    if (send) send.onclick = function () {
      var v = curVals(); if (!v.q) { el("qa-input").focus(); return; }
      var p = loadPending();
      p.push({ id: "q" + Date.now(), date: new Date().toISOString().slice(0, 10), question: v.q, ticker: v.tk, status: "pending" });
      savePending(p);
      if (repo) window.open(issueUrl(v.q, v.tk), "_blank");
      else { copyText(claudePrompt(v.q, v.tk)); alert("저장소가 설정되지 않아 질문을 클립보드에 복사했습니다.\nClaude Code에 붙여넣으면 됩니다."); }
      renderQA();
    };
    if (copy) copy.onclick = function () {
      var v = curVals(); if (!v.q) { el("qa-input").focus(); return; }
      copyText(claudePrompt(v.q, v.tk)); copy.textContent = "복사됨!";
      setTimeout(function () { copy.textContent = "질문 복사"; }, 1500);
    };
    Array.prototype.forEach.call(el("main").querySelectorAll("[data-del]"), function (a) {
      a.onclick = function (e) {
        e.preventDefault();
        savePending(loadPending().filter(function (x) { return x.id !== a.getAttribute("data-del"); }));
        renderQA();
      };
    });
    Array.prototype.forEach.call(el("main").querySelectorAll("[data-copy]"), function (a) {
      a.onclick = function (e) {
        e.preventDefault();
        var p = loadPending().filter(function (x) { return x.id === a.getAttribute("data-copy"); })[0];
        if (p) { copyText(claudePrompt(p.question, p.ticker)); a.textContent = "복사됨!"; setTimeout(function () { a.textContent = "프롬프트 복사"; }, 1500); }
      };
    });
  }

  // ---------- 라우팅 ----------
  function route() {
    var t = location.hash.replace("#", "");
    if (t === "qna") { renderQA(); renderList(el("q") ? el("q").value : ""); window.scrollTo(0, 0); return; }
    var s = STOCKS.filter(function (x) { return x.ticker === t; })[0];
    if (s) renderReport(s); else renderHome();
    renderList(el("q") ? el("q").value : "");
    if (window.innerWidth <= 860) { var sb = el("sidebar"); if (sb && s) sb.classList.add("hide"); }
    window.scrollTo(0, 0);
  }

  // ---------- 초기화 ----------
  document.addEventListener("DOMContentLoaded", function () {
    var q = el("q");
    if (q) q.oninput = function () { renderList(q.value); };
    var mt = el("menuToggle");
    if (mt) mt.onclick = function () { el("sidebar").classList.toggle("hide"); };
    window.addEventListener("hashchange", route);
    route();
  });
})();
