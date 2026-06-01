# 📈 나의 종목 분석 노트 (Equity Research)

개인투자자용 종목 분석 정적 사이트입니다. 증권사 리포트 형식으로 종목을 정리하고,
**GitHub Pages에 올리면 어느 PC·휴대폰에서든** URL로 바로 열람할 수 있습니다.

---

## 1. 폴더 구조

```
equity-research/
├─ index.html          # 메인 페이지 (열기만 하면 동작)
├─ assets/
│  ├─ style.css        # 디자인
│  └─ app.js           # 렌더링 로직 (외부 라이브러리 없음)
├─ data/
│  └─ stocks.js        # ★ 종목 데이터 — 여기에만 내용이 쌓입니다
└─ README.md
```

> 💡 `data/stocks.js`는 `fetch`가 아니라 `<script>`로 불러오므로,
> 인터넷 없이 `index.html`을 **더블클릭만 해도** 정상 동작합니다. (GitHub Pages·오프라인 모두 OK)

---

## 2. 새 종목 추가하는 법 (핵심 워크플로우)

HTML에서 직접 종목을 조사할 수는 없습니다. 대신:

1. **Claude에게 요청** —
   > "다음 종목을 증권사 리포트 수준으로 조사해서 `equity-research/data/stocks.js`에 추가해줘: **삼성바이오로직스**"
2. Claude가 웹조사 후 `data/stocks.js`의 `window.STOCKS` 배열에 항목을 추가합니다.
3. 변경사항을 GitHub에 **push** → 잠시 후 사이트에 자동 반영됩니다.

수동으로 추가하려면 `data/stocks.js` 맨 아래 `TEMPLATE` 주석을 복사해 채우세요.

---

## 3. GitHub Pages 배포 (최초 1회)

```bash
# 이 폴더(equity-research)에서
git init
git add .
git commit -m "init: 종목 분석 노트"
git branch -M main
git remote add origin https://github.com/<내아이디>/<저장소이름>.git
git push -u origin main
```

그다음 GitHub 저장소에서:
**Settings → Pages → Branch: `main` / `/ (root)` → Save**

→ 몇 분 뒤 `https://<내아이디>.github.io/<저장소이름>/` 주소로 접속 가능.

### 이후 종목을 추가할 때마다
```bash
git add .
git commit -m "add: OOO 종목 분석"
git push
```

---

## 4. Q&A — 질문하고 답 받기 (비동기·무료)

실시간 채팅이 아니라 **GitHub Issue를 메일함처럼** 쓰는 구조입니다. 서버·API 키 불필요.

**흐름**
1. 사이트 상단 **💬 Q&A** → 종목(선택) + 질문 입력 → **질문 보내기** → 내용이 채워진 GitHub Issue가 열림(제출 클릭). 보낸 질문은 "⏳ 분석 대기 중"으로 즉시 표시(브라우저 localStorage).
2. **Claude Code가 이슈를 분석** → `data/qa.js`에 답변 추가 → push.
3. 사이트를 새로고침하면 **답변**에 Q&A가 누적 표시. (대기 중이던 같은 질문은 자동으로 사라짐)

**최초 1회 설정**: `data/config.js`의 `repo`에 `"아이디/저장소이름"` 입력
(비워두면 질문이 클립보드에 복사되어 Claude Code에 직접 붙여넣는 방식으로 동작).

**Claude Code가 답을 처리하는 방법** (이 저장소에서 실행)
```bash
gh issue list --label qna --state open     # 새 질문 확인
# → Claude Code: 각 이슈를 stocks.js·reports로 분석, data/qa.js에 답 추가
gh issue close <번호> -c "사이트 Q&A에 답변 반영"
git add data/qa.js && git commit -m "qa: 답변 추가" && git push
```
> 주기적으로 자동 처리하려면 Claude Code의 `/schedule`(또는 `/loop`)로 "qna 라벨 이슈를 읽어 답하고 push"를 등록하세요.

---

## 5. 사용 팁

- 상단 **검색창**: 종목명·티커·섹터로 필터
- 종목 카드 클릭 → 상세 리포트 (해시 주소라 `...#NVDA` 형태로 **공유·북마크** 가능)
- 모바일에서는 `☰` 버튼으로 목록 토글
- 각 리포트 하단의 **출처 링크**로 원문 확인, **무효화 조건**으로 매도 기준 관리

---

## 6. 면책

본 사이트의 내용은 공개정보 기반의 **개인 학습용 정리**이며 투자 권유가 아닙니다.
수치는 작성 시점 기준으로 오차가 있을 수 있으니, 투자 전 반드시 최신 공시·원문을 확인하세요.
