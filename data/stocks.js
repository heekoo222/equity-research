/* =============================================================
 *  종목 분석 데이터  (stocks.js)
 *  - 이 파일에 종목 객체를 추가하면 사이트에 자동 반영됩니다.
 *  - Claude에게 "○○ 종목 추가해줘" 라고 하면 이 배열에 항목을 채워줍니다.
 *  - 스키마는 README.md 또는 맨 아래 TEMPLATE 주석 참고.
 * ============================================================= */
window.STOCKS = [

  /* ----------------------------- 삼성전자 ----------------------------- */
  {
    ticker: "005930",
    name: "삼성전자",
    exchange: "KOSPI",
    country: "한국",
    sector: "반도체 / IT",
    currency: "원",
    asOf: "2026-06-01",

    rating: "매수",                 // 매수 / 중립 / 매도
    currentPrice: 330000,
    targetPrice: 360000,            // 증권사 4곳 목표가 27만~40만원(평균 33만), 최근 상향 반영
    buyZone: "300,000 ~ 320,000",
    stopLoss: 270000,
    marketCap: "약 1,970조 원 (≈ $1.4T)",

    snapshot: {
      per: 41.2,        // 후행(트레일링) 기준 — 2025 이익 회복 초기라 높게 보임
      pbr: 3.5,
      evEbitda: null,
      dividendYield: 0.4,
      roe: 9.0,
      week52: "—"
    },

    thesis:
      "메모리 다운사이클의 바닥을 지나 2025년 이익이 급반등했고(영업이익 +33%), " +
      "AI 서버용 HBM(고대역폭메모리)과 DDR5 수요가 2026~2027년 메모리 슈퍼사이클을 견인할 전망. " +
      "시장은 여전히 과거의 사이클 변동성과 파운드리 적자를 우려하지만, HBM 점유율 회복과 " +
      "메모리 가격 상승이 맞물리면 이익 체력이 구조적으로 한 단계 올라설 수 있다는 것이 핵심 논거.",

    points: [
      "2026년 1분기 DS(반도체) 영업이익률 66%, 전사 영업이익 57.2조 원으로 역대 최대 분기 기록",
      "HBM3E/HBM4의 엔비디아 등 AI 고객 납품 확대 → 메모리 믹스 개선",
      "증권사 4곳 2026E 영업이익 추정 약 337조~365조 원 — 메모리 슈퍼사이클을 적극 반영(공격적 가정)",
      "파운드리·디스플레이는 회복 진행형 — 추가 업사이드 요인"
    ],

    businessModel:
      "사업은 크게 ①DS(반도체: 메모리 DRAM·NAND, 시스템LSI, 파운드리) ②DX(가전·모바일: MX 스마트폰, VD TV·가전) " +
      "③SDC(삼성디스플레이) ④Harman(전장·오디오)으로 구성. 이익의 대부분은 DS(메모리)에서 발생하며, " +
      "메모리는 가격 사이클에 따라 이익 변동성이 큰 구조.",

    segments: [
      { name: "DS (반도체)", pct: 60 },
      { name: "DX (가전·모바일)", pct: 28 },
      { name: "SDC (디스플레이)", pct: 8 },
      { name: "Harman / 기타", pct: 4 }
    ],

    industry:
      "메모리 반도체는 삼성전자·SK하이닉스·마이크론 3강 과점 구조. 막대한 설비투자(capex)와 미세공정 기술이 " +
      "진입장벽(해자)로 작용. AI 데이터센터 투자가 메모리 수요의 새로운 축으로 부상하며, HBM은 고부가·고마진 " +
      "제품으로 경쟁의 핵심 무대가 됨. 다만 후발주자(중국 CXMT 등)의 범용 메모리 추격은 장기 리스크.",

    financials: {
      unit: "조원",
      rows: [
        { year: "2023",  revenue: 258.9, opIncome: 6.6,   opMargin: 2.5,  netIncome: 15.5, eps: null },
        { year: "2024",  revenue: 300.9, opIncome: 32.7,  opMargin: 10.9, netIncome: 34.5, eps: null },
        { year: "2025",  revenue: 333.6, opIncome: 43.6,  opMargin: 13.1, netIncome: 45.2, eps: null },
        { year: "2026E", revenue: 670.0, opIncome: 350.0, opMargin: 52.2, netIncome: 290.0, eps: null }
      ]
    },

    catalysts: [
      "HBM4 양산·주요 AI 고객 퀄(품질인증) 통과 및 점유율 확대",
      "DRAM·NAND 가격 상승 사이클 지속 (메모리 슈퍼사이클)",
      "파운드리 가동률 회복 및 대형 고객 수주",
      "주주환원 정책 강화(배당·자사주) 가능성"
    ],

    risks: [
      "메모리 가격의 높은 사이클 변동성 — 수요 둔화 시 이익 급감",
      "파운드리 부문 적자 지속 및 TSMC와의 기술 격차",
      "중국 메모리 업체(CXMT 등)의 범용 제품 추격",
      "환율·지정학(미·중 반도체 규제) 리스크",
      "현재 후행 PER이 높아 보이는 점 — 이익 정상화 속도가 중요"
    ],

    valuation: {
      comment:
        "후행 PER 41배는 2024년까지 이익이 눌려 있어 높게 보이는 착시. 2026년 이익 추정치 기준 " +
        "선행(forward) PER은 크게 낮아질 수 있어, 이익 추정의 신뢰도가 밸류에이션 판단의 핵심. " +
        "PBR 3.5배는 역사적 밴드 상단부 — 이익 레벨업이 확인돼야 정당화됨. (아래 Peer 수치는 개략치, 업데이트 권장)",
      peers: [
        { name: "삼성전자",   per: 41.2, pbr: 3.5,  evEbitda: null },
        { name: "SK하이닉스", per: 9.0,  pbr: 2.2,  evEbitda: null },
        { name: "Micron",     per: 13.0, pbr: 2.5,  evEbitda: null },
        { name: "TSMC",       per: 22.0, pbr: 6.5,  evEbitda: null }
      ]
    },

    brokerReports: {
      note: "2026년 4~5월 발표분. 작성 시점 주가는 19.6만~27만원이었고 이후 33만원대로 상승해 평균 목표가에 근접 → 추가 상향 여부가 관건. 4곳 모두 '매수'이나 2026E 이익 추정은 매우 공격적이라 가정의 실현 여부를 함께 점검 필요.",
      avgTarget: 330000,
      rows: [
        { broker: "iM증권",     date: "2026.05.15", opinion: "매수", target: 400000, note: "FY26 영업이익 352조·ROE 48% 전망, P/B 4.0배 적용해 목표가 상향 (4곳 중 최고가)", pdf: "reports/삼성전자/iM증권_2026-05-15.pdf" },
        { broker: "IBK투자증권", date: "2026.04.08", opinion: "매수", target: 350000, note: "AI 메모리 수요로 DRAM/NAND ASP 상승 본격화, 2026 BPS×PBR 3.2배 적용", pdf: "reports/삼성전자/IBK투자증권_2026-04-08.pdf" },
        { broker: "한화투자증권", date: "2026.04.08", opinion: "매수", target: 300000, note: "반도체 업종 Top Pick, 1Q26 영업이익 57.2조(QoQ +185%)·DRAM ASP +90%", pdf: "reports/삼성전자/한화투자증권_2026-04-08.pdf" },
        { broker: "LS증권",     date: "2026.04.15", opinion: "매수", target: 270000, note: "HBM 우선투자 + NAND 정상화, 2026E DPS 6,438원 (4곳 중 가장 보수적)", pdf: "reports/삼성전자/LS증권_2026-04-15.pdf" }
      ]
    },

    checklist: [
      { q: "사업을 한 문장으로 설명할 수 있는가?", ok: true },
      { q: "최근 매출·이익이 회복/성장 추세인가?", ok: true },
      { q: "부채비율이 과도하지 않은가?", ok: true },
      { q: "분명한 해자(기술·자본 진입장벽)가 있는가?", ok: true },
      { q: "현재 밸류에이션이 합리적인가?", ok: null },
      { q: "무효화 조건(매도 기준)을 정했는가?", ok: true },
      { q: "포트폴리오 비중이 과도하지 않은가?", ok: null }
    ],

    invalidation:
      "HBM 점유율이 추세적으로 하락하거나, 메모리 가격이 4개 분기 연속 하락 전환하면 투자 논거 훼손 → 비중 축소/매도.",

    sources: [
      { title: "FnGuide 기업정보(컨센서스)", url: "https://comp.fnguide.com/SVO2/asp/SVD_Consensus.asp?gicode=A005930" },
      { title: "삼성전자 2025 연간실적(ZDNet)", url: "https://zdnet.co.kr/view/?no=20260129090854" },
      { title: "유진투자증권 리포트(목표가)", url: "https://www.eugenefn.com/common/files/amail//20260130_005930_sophie.yim_114.pdf" }
    ]
  },

  /* ----------------------------- SK하이닉스 ----------------------------- */
  {
    ticker:"000660", name:"SK하이닉스", exchange:"KOSPI", country:"한국", sector:"반도체 (메모리/HBM)", currency:"원",
    asOf:"2026-06-01",
    rating:"매수",
    currentPrice:2350000, targetPrice:3000000, buyZone:"1,950,000 ~ 2,200,000", stopLoss:1600000, marketCap:"약 1,383조원",
    snapshot:{ per:8.0, pbr:7.6, evEbitda:null, dividendYield:0.3, roe:92.8, week52:"203,000 ~ 2,379,000원" },
    thesis:"SK하이닉스는 AI 가속기 핵심 부품인 HBM(고대역폭메모리) 시장 점유율 60%대 1위 사업자로, 엔비디아 차세대 Rubin 플랫폼용 HBM4 물량의 약 70%를 사실상 단독에 가깝게 공급하며 AI 메모리 슈퍼사이클의 최대 수혜를 누리고 있다. 2025년 매출 97.1조원·영업이익 47.2조원으로 역대 최대 실적을 경신했고, 2026년 1분기 분기 영업이익률 70%대로 글로벌 최고 수준의 수익성에 도달했다. HBM 공급 부족이 2027~2028년까지 이어질 것으로 전망되어 단기 이익 가시성은 매우 높으나, 주가가 1년여 만에 급등하며 이미 강한 기대를 반영한 점은 진입 시점 측면에서 검토가 필요하다.",
    points:[
      "HBM 시장 글로벌 1위(점유율 약 60~64%), HBM4 세계 최초 양산 및 엔비디아향 약 70% 물량 확보로 기술·점유율 해자 보유",
      "2025년 매출 97.1조원·영업이익 47.2조원으로 역대 최대 실적, 국내 영업이익 1위로 삼성전자 추월",
      "2026년 1분기 분기 매출 50조원 첫 돌파, 영업이익률 70%대로 메모리 호황 정점의 초고수익성 시현",
      "DRAM(HBM 포함)이 이익의 대부분을 견인, NAND도 eSSD 프리미엄 확대로 흑자 기여 본격화"
    ],
    businessModel:"DRAM·NAND 등 메모리 반도체를 설계·제조·판매하는 종합 메모리 기업으로, 최근 이익의 핵심은 AI 서버용 고부가 HBM이다. 엔비디아·하이퍼스케일러향 HBM 및 고용량 DDR5, 기업용 eSSD가 매출과 마진을 견인하며, 가격은 AI 데이터센터 투자 사이클과 메모리 수급에 강하게 연동된다.",
    segments:[{name:"DRAM",pct:78.0},{name:"NAND",pct:20.0},{name:"기타",pct:2.0}],
    industry:"AI 가속기 수요 폭증으로 HBM 중심의 메모리 슈퍼사이클이 진행 중이며, 2026년 HBM3E가 출하량의 약 2/3, HBM4가 점진적으로 비중을 확대하는 구도다. 카운터포인트 기준 2026년 HBM4 시장은 SK하이닉스 54%, 삼성전자 28%, 마이크론 18%로 전망되며, HBM 공급 부족이 2027~2028년까지 지속될 것으로 예상된다. 다만 메모리는 본질적으로 사이클 산업으로, 증설 경쟁과 공급 정상화 시점이 향후 변수다.",
    financials:{ unit:"조원", rows:[
      {year:"2023", revenue:32.8, opIncome:-7.7, opMargin:-23.5, netIncome:-9.1, eps:null},
      {year:"2024", revenue:66.2, opIncome:23.5, opMargin:35.5, netIncome:19.8, eps:null},
      {year:"2025", revenue:97.1, opIncome:47.2, opMargin:48.6, netIncome:42.9, eps:null},
      {year:"2026E", revenue:140.0, opIncome:80.0, opMargin:57.1, netIncome:null, eps:293767}
    ]},
    catalysts:[
      "엔비디아 Rubin 플랫폼용 HBM4 본격 양산·공급 확대 및 12단 HBM4 단가(개당 600달러 초과) 상승",
      "2026년 HBM3E 약 20% 가격 인상 등 메모리 가격 상승 사이클 지속, 분기 실적 추가 경신 기대",
      "AI 데이터센터 capex 증가에 따른 HBM 공급 부족 2027~2028년까지 장기화 전망"
    ],
    risks:[
      "메모리 산업 특유의 사이클 리스크 — 공급 정상화·증설 경쟁 시 가격·마진 급락 가능성",
      "주가가 1년여 만에 약 9배 급등해 높은 기대 선반영, 단기 변동성 및 밸류에이션 부담",
      "삼성전자·마이크론의 HBM4 추격 가속에 따른 점유율·단가 경쟁 심화 가능성",
      "엔비디아 등 소수 대형 고객 의존도가 높아 고객사 수요·재고 변동에 실적 민감"
    ],
    valuation:{ comment:"2026년 선행 PER 약 6.8~8.0배 수준으로 절대 멀티플은 부담스럽지 않으나, 이는 사이클 정점 부근의 고이익을 분모로 한 수치라 정상화 시 멀티플이 빠르게 높아질 수 있는 점에 유의해야 한다. 2026년 선행 PER이 사상 처음 삼성전자를 추월했고, 일부 외국계(JP모건 등)는 목표가 300만원을 제시. 이익의 질과 사이클 위치를 함께 봐야 하는 구간으로 판단된다.", peers:[
      {name:"SK하이닉스", per:8.0, pbr:7.6, evEbitda:null},
      {name:"삼성전자", per:6.8, pbr:null, evEbitda:null},
      {name:"Micron", per:null, pbr:null, evEbitda:null}
    ]},
    checklist:[
      {q:"사업을 한 문장으로 설명할 수 있는가?", ok:true},
      {q:"최근 매출·이익이 회복/성장 추세인가?", ok:true},
      {q:"부채비율이 과도하지 않은가?", ok:null},
      {q:"분명한 해자가 있는가?", ok:true},
      {q:"현재 밸류에이션이 합리적인가?", ok:null},
      {q:"무효화 조건(매도 기준)을 정했는가?", ok:true},
      {q:"포트폴리오 비중이 과도하지 않은가?", ok:null}
    ],
    invalidation:"HBM 시장 점유율이 삼성전자·마이크론에 의해 50% 아래로 의미 있게 잠식되거나, 엔비디아향 HBM4 물량·단가가 큰 폭으로 축소되는 경우, 또는 분기 영업이익률이 30%대 아래로 추세적으로 하락(사이클 둔화 신호)하면 투자 논리가 훼손된 것으로 보고 비중 축소·매도를 검토한다.",
    sources:[
      {title:"SK하이닉스 2025년 경영실적 발표(뉴스룸)", url:"https://news.skhynix.co.kr/2025-business-results/"},
      {title:"SK hynix to Supply ~2/3 of NVIDIA HBM4 (TrendForce)", url:"https://www.trendforce.com/news/2026/01/28/news-sk-hynix-reportedly-to-supply-about-two-thirds-of-nvidia-hbm4-samsung-targets-early-delivery/"},
      {title:"SK하이닉스 2026 선행 PER 첫 삼성전자 추월(Stockplus)", url:"https://newsroom.stockplus.com/breaking-news/16174"}
    ]
  },

  /* ----------------------------- 알파벳 (구글) ----------------------------- */
  {
    ticker:"GOOGL", name:"알파벳 (구글)", exchange:"NASDAQ", country:"미국", sector:"인터넷 플랫폼 / AI", currency:"$",
    asOf:"2026-06-01",
    rating:"매수",
    currentPrice:380.3, targetPrice:440.0, buyZone:"330.0 ~ 365.0", stopLoss:300.0, marketCap:"약 $4.6T (≈ 6,330조 원)",
    snapshot:{ per:29.0, pbr:8.1, evEbitda:21.5, dividendYield:0.2, roe:34.5, week52:"162.0 ~ 408.6" },
    thesis:"알파벳은 검색·광고의 구조적 현금창출력을 기반으로 클라우드(GCP)와 생성형 AI(Gemini)로 성장축을 확장 중이다. FY25 매출 $402.8B(+15%), 순이익 $132.2B(+32%)에 이어 Q1 26 클라우드가 +63% 성장하며 AI 수요가 실적으로 가시화되고 있다. 다만 $175~185B에 달하는 공격적 capex와 미국·EU 반독점 리스크가 멀티플 상단을 제약하는 양면적 구간으로 판단된다.",
    points:[
      "검색 점유율 90% 내외의 압도적 광고 해자와 YouTube를 통한 안정적 현금흐름 유지",
      "Google Cloud Q1 26 매출 +63%, 영업이익 $6.6B로 흑자 정착 — 백로그 $460B+로 성장 가시성 확대",
      "Gemini App MAU 750M 돌파, AI 구독·엔터프라이즈 매출 본격 기여 시작",
      "FY25 순이익 +32%·EPS +34%로 마진 레버리지 입증, 잉여현금으로 배당·자사주 매입 병행"
    ],
    businessModel:"검색·YouTube 광고가 매출의 핵심 캐시카우이며, 여기서 창출된 현금을 Google Cloud, Gemini AI, Waymo(자율주행) 등 성장·미래사업에 재투자하는 구조. 광고(트래픽 기반)와 클라우드·구독(반복 매출)의 결합으로 수익 다변화를 추진한다.",
    segments:[{name:"검색·광고",pct:55.0},{name:"YouTube",pct:11.0},{name:"Google Cloud",pct:16.0},{name:"기타",pct:18.0}],
    industry:"글로벌 디지털 광고·클라우드·생성형 AI 시장은 AI 전환을 축으로 재편 중이며, 하이퍼스케일러 3사(구글·MS·아마존)가 AI 인프라·모델 경쟁을 주도한다. AI 검색 대체 우려와 동시에 클라우드 AI 수요 폭증이 공존하는 국면이다.",
    financials:{ unit:"$B", rows:[
      {year:"FY23", revenue:307.4, opIncome:84.3, opMargin:27.4, netIncome:73.8, eps:5.8},
      {year:"FY24", revenue:350.0, opIncome:112.4, opMargin:32.1, netIncome:100.1, eps:8.0},
      {year:"FY25", revenue:402.8, opIncome:129.0, opMargin:32.0, netIncome:132.2, eps:10.8},
      {year:"FY26E", revenue:486.0, opIncome:null, opMargin:null, netIncome:null, eps:11.6}
    ]},
    catalysts:[
      "Google Cloud의 60%대 고성장 지속 및 영업이익률 추가 개선",
      "Gemini 기반 AI 구독·검색 광고 수익화(AI Overviews 등) 본격화",
      "Waymo 운영 지역·주간 유료 탑승 확대(2025년 14M+ 탑승)에 따른 신규 가치 부각"
    ],
    risks:[
      "미국·EU·인도 반독점 소송 — 검색 배타계약·광고기술 분할 등 사업구조 강제 변경 가능성",
      "FY26 capex $175~185B로 전년 대비 2배 — 잉여현금흐름·마진 압박 및 AI 투자수익 회수 불확실성",
      "생성형 AI 챗봇이 전통 검색 쿼리를 대체하며 핵심 광고 매출 잠식 우려",
      "고밸류(PER 29x)로 실적 둔화·금리 변동 시 멀티플 디레이팅 리스크"
    ],
    valuation:{ comment:"PER 약 29x로 최근 3년 평균(23x) 대비 프리미엄 구간이나, FY26E EPS $11.6 기준 클라우드·AI 성장을 반영하면 메가캡 빅테크 내에서는 상대적으로 합리적 수준. 다만 capex·규제 변수로 상단은 제한적이라 분할매수 접근이 유효.", peers:[
      {name:"알파벳", per:29.0, pbr:8.1, evEbitda:21.5},
      {name:"메타", per:26.0, pbr:8.5, evEbitda:18.0},
      {name:"마이크로소프트", per:34.0, pbr:11.0, evEbitda:24.0},
      {name:"아마존", per:36.0, pbr:7.0, evEbitda:18.5}
    ]},
    checklist:[
      {q:"사업을 한 문장으로 설명할 수 있는가?", ok:true},
      {q:"최근 매출·이익이 회복/성장 추세인가?", ok:true},
      {q:"부채비율이 과도하지 않은가?", ok:true},
      {q:"분명한 해자가 있는가?", ok:true},
      {q:"현재 밸류에이션이 합리적인가?", ok:null},
      {q:"무효화 조건(매도 기준)을 정했는가?", ok:true},
      {q:"포트폴리오 비중이 과도하지 않은가?", ok:null}
    ],
    invalidation:"검색·광고 매출이 AI 대체로 2개 분기 연속 역성장하거나, 반독점 판결로 검색 사업 분할·핵심 디폴트 계약 강제 해지가 확정되고 클라우드 성장률이 30% 아래로 둔화될 경우. 또는 주가가 손절선 $300(주요 지지·200일선 이탈) 하회 시 포지션 축소.",
    sources:[
      {title:"Alphabet Q1 2026 Earnings Release", url:"https://s206.q4cdn.com/479360582/files/doc_financials/2026/q1/2026q1-alphabet-earnings-release.pdf"},
      {title:"Alphabet Market Cap (CompaniesMarketCap)", url:"https://companiesmarketcap.com/alphabet-google/marketcap/"},
      {title:"Alphabet PE Ratio (MacroTrends)", url:"https://www.macrotrends.net/stocks/charts/GOOGL/alphabet/pe-ratio"}
    ]
  },

  /* ----------------------------- 엔비디아 ----------------------------- */
  {
    ticker: "NVDA",
    name: "엔비디아 (NVIDIA)",
    exchange: "NASDAQ",
    country: "미국",
    sector: "반도체 (AI 가속기)",
    currency: "$",
    asOf: "2026-05-31",

    rating: "매수",
    currentPrice: 212.49,
    targetPrice: 298,               // 애널리스트 컨센서스(37명)
    buyZone: "180 ~ 200",
    stopLoss: 165,
    marketCap: "약 $5.19T (≈ 7,400조 원)",

    snapshot: {
      per: 43.1,        // 후행 기준 (212.49 / FY26 EPS 4.93)
      pbr: 45.0,
      evEbitda: null,
      dividendYield: 0.02,
      roe: 100.0,
      week52: "—"
    },

    thesis:
      "AI 데이터센터 가속기 시장의 압도적 1위로, GPU 하드웨어에 CUDA 소프트웨어 생태계가 결합된 " +
      "강력한 해자를 보유. FY2026 매출 +66%, 순이익 +65%의 폭발적 성장이 Blackwell·Rubin 차세대 " +
      "아키텍처와 추론(inference) 수요로 이어질 전망. 관건은 하이퍼스케일러 capex 사이클의 지속성과 " +
      "높은 밸류에이션을 정당화할 성장 가시성.",

    points: [
      "FY2027 1분기 매출 $81.6B(+85% YoY), 데이터센터 매출 $75.2B로 전체의 약 92%",
      "FY2026 연간: 매출 $215.9B(+66%), 순이익 $120.1B(+65%), EPS $4.93",
      "CUDA 소프트웨어 생태계 = 전환비용 기반의 강력한 해자",
      "Sovereign AI(국가단위 AI 인프라)·추론 수요로 고객군 다변화 진행"
    ],

    businessModel:
      "데이터센터용 AI 가속기(GPU)가 매출의 대부분(약 92%). 그 외 게이밍(지포스), 프로페셔널 " +
      "비주얼라이제이션, 자동차(자율주행) 부문 보유. 하드웨어 단품이 아니라 CUDA·네트워킹(인피니밴드)·" +
      "시스템(서버)까지 묶어 파는 '풀스택' 전략이 가격결정력의 원천.",

    segments: [
      { name: "데이터센터", pct: 92 },
      { name: "게이밍", pct: 5 },
      { name: "프로페셔널/오토 등", pct: 3 }
    ],

    industry:
      "AI 가속기 시장은 엔비디아가 사실상 표준. 경쟁자는 AMD(MI 시리즈)와 빅테크의 자체 칩(구글 TPU, " +
      "아마존 Trainium 등 커스텀 ASIC). 그러나 CUDA 소프트웨어 락인과 개발자 생태계가 진입장벽으로 작용. " +
      "수요는 하이퍼스케일러(클라우드 빅테크)의 AI 투자에 크게 좌우됨.",

    financials: {
      unit: "$B (회계연도)",
      rows: [
        { year: "FY24",  revenue: 60.9,  opIncome: 33.0,  opMargin: 54.2, netIncome: 29.8,  eps: 1.19 },
        { year: "FY25",  revenue: 130.5, opIncome: 81.5,  opMargin: 62.4, netIncome: 72.9,  eps: 2.97 },
        { year: "FY26",  revenue: 215.9, opIncome: 147.0, opMargin: 68.1, netIncome: 120.1, eps: 4.93 },
        { year: "FY27E", revenue: 330.0, opIncome: null,  opMargin: null, netIncome: null,  eps: null }
      ]
    },

    catalysts: [
      "Blackwell / Rubin 차세대 GPU 램프업 및 단가 상승",
      "추론(inference) 수요 본격화 — 학습을 넘어선 신규 수요축",
      "Sovereign AI 등 신규 고객군 확대로 매출 다변화",
      "네트워킹·소프트웨어 매출 비중 증가로 마진 방어"
    ],

    risks: [
      "고객 집중 — 소수 하이퍼스케일러 capex에 매출 의존",
      "경쟁 심화 — AMD 및 빅테크 자체 칩(커스텀 ASIC)",
      "미국의 대중(對中) 수출규제로 인한 시장 제약",
      "높은 밸류에이션 — 성장 둔화 시 멀티플 축소 위험",
      "AI 투자 사이클의 둔화 가능성(과잉투자 논란)"
    ],

    valuation: {
      comment:
        "후행 PER 43배는 초고성장(이익 +65%)을 감안하면 PEG 관점에서 과도하다고만 보기 어려움. " +
        "다만 PBR 45배 등 절대 수준이 높아, 성장 둔화가 확인되는 순간 멀티플 리레이팅(하락) 위험이 큼. " +
        "핵심은 '성장의 지속성' — 분기 가이던스와 capex 동향이 가장 중요한 체크포인트. (Peer 수치는 개략치)",
      peers: [
        { name: "엔비디아", per: 43.1, pbr: 45.0, evEbitda: null },
        { name: "AMD",      per: 35.0, pbr: 4.5,  evEbitda: null },
        { name: "브로드컴",  per: 38.0, pbr: 12.0, evEbitda: null },
        { name: "TSMC",     per: 22.0, pbr: 6.5,  evEbitda: null }
      ]
    },

    checklist: [
      { q: "사업을 한 문장으로 설명할 수 있는가?", ok: true },
      { q: "최근 매출·이익이 회복/성장 추세인가?", ok: true },
      { q: "부채비율이 과도하지 않은가?", ok: true },
      { q: "분명한 해자(생태계 락인)가 있는가?", ok: true },
      { q: "현재 밸류에이션이 합리적인가?", ok: false },
      { q: "무효화 조건(매도 기준)을 정했는가?", ok: true },
      { q: "포트폴리오 비중이 과도하지 않은가?", ok: null }
    ],

    invalidation:
      "데이터센터 매출 증가율이 뚜렷이 둔화되거나, 주요 하이퍼스케일러가 capex 가이던스를 하향하면 " +
      "성장 논거 약화 → 비중 축소.",

    sources: [
      { title: "NVIDIA Q1 FY2027 실적(SEC 8-K)", url: "https://www.sec.gov/Archives/edgar/data/0001045810/000104581026000051/q1fy27pr.htm" },
      { title: "NVIDIA FY2026 연간실적(뉴스룸)", url: "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2026" },
      { title: "NVDA 애널리스트 목표주가(StockAnalysis)", url: "https://stockanalysis.com/stocks/nvda/forecast/" }
    ]
  },

  /* ----------------------------- 마이크로소프트 ----------------------------- */
  {
    ticker:"MSFT", name:"마이크로소프트", exchange:"NASDAQ", country:"미국", sector:"소프트웨어 / 클라우드 / AI", currency:"$",
    asOf:"2026-06-01",
    rating:"매수",
    currentPrice:450.0, targetPrice:540.0, buyZone:"400 ~ 430", stopLoss:355.0, marketCap:"약 $3.3T (≈ 4,560조 원)",
    snapshot:{ per:26.8, pbr:11.0, evEbitda:null, dividendYield:0.8, roe:34.0, week52:"356.3 ~ 555.5" },
    thesis:"Azure가 FY25 +34% 성장하며 클라우드 톱티어 지위를 굳히고, 회사 전체 매출은 $281.7B, 순이익은 사상 첫 $100B을 돌파했다. OpenAI 제휴 기반의 Copilot·AI 서비스가 Office·Windows 생태계 전반에 수익화 경로를 열고 있어 구조적 성장 스토리는 유효하다. 다만 FY25 capex가 $64.6B(+45%)로 급증해 AI 인프라 투자 부담이 단기 마진·잉여현금흐름을 압박할 수 있어, 밸류에이션은 합리적이나 추가 멀티플 확장 여지는 제한적이라는 점에서 매수 의견이되 중립적 관점의 점검이 필요하다.",
    points:[
      "Azure 매출 $75B 돌파·전년비 +34%로 클라우드 성장 재가속, Intelligent Cloud가 전사 성장 견인",
      "FY25 순이익 사상 첫 $100B 초과, 영업이익률 40%대 유지로 압도적 현금창출력 입증",
      "Microsoft 365 Copilot·OpenAI 통합으로 기존 Office/Windows 설치기반의 AI 수익화 본격화",
      "FY25 capex $64.6B(+45%)로 AI 데이터센터 투자 정점 구간, 감가상각 증가가 향후 마진 변수"
    ],
    businessModel:"클라우드(Azure) 구독, Office 365·Dynamics 등 SaaS 구독, Windows·서버 라이선스, 게임(Xbox/Activision), 광고(LinkedIn·Bing)로 구성된 다각화된 소프트웨어·클라우드 사업. 매출의 대부분이 반복(recurring) 구독 기반이며, AI는 Azure OpenAI 및 Copilot 형태로 전 제품군에 횡단 탑재되어 추가 ARPU를 창출.",
    segments:[
      {name:"Productivity(Office 등)",pct:43.0},
      {name:"Intelligent Cloud(Azure 등)",pct:37.6},
      {name:"More Personal Computing",pct:19.4}
    ],
    industry:"글로벌 퍼블릭 클라우드는 생성형 AI 수요로 재가속 국면이며, Azure는 AWS에 이은 2위로 점유율 확대 중. 엔터프라이즈 소프트웨어 전반이 AI 코파일럿 경쟁(구글 Workspace, 세일즈포스 등)에 진입했고, AI 인프라(GPU·데이터센터) 투자 경쟁이 빅테크 capex 사이클을 주도하고 있다.",
    financials:{ unit:"$B", rows:[
      {year:"FY23", revenue:211.9, opIncome:88.5, opMargin:41.8, netIncome:72.4, eps:9.7},
      {year:"FY24", revenue:245.1, opIncome:109.4, opMargin:44.6, netIncome:88.1, eps:11.8},
      {year:"FY25", revenue:281.7, opIncome:128.5, opMargin:45.6, netIncome:101.8, eps:13.6},
      {year:"FY26E", revenue:318.0, opIncome:null, opMargin:null, netIncome:null, eps:null}
    ]},
    catalysts:[
      "Azure 성장률 30%대 유지 및 AI 기여분 가속 확인 시 클라우드 멀티플 재평가",
      "Microsoft 365 Copilot 유료 좌석 확산·ARPU 상승으로 AI 수익화 가시화",
      "AI capex 정점 통과 후 잉여현금흐름 회복 및 자사주 매입·배당 확대"
    ],
    risks:[
      "AI 인프라 capex 급증($64.6B+)에 따른 감가상각 증가와 단기 마진·FCF 압박",
      "OpenAI 의존도 및 제휴 구조 변화·경쟁사 모델 부상에 따른 전략 리스크",
      "Azure 성장 둔화 또는 클라우드 수요 사이클 조정 시 밸류에이션 디레이팅",
      "규제(반독점·AI 규제) 및 게임·광고 등 비핵심 부문 성장 둔화"
    ],
    valuation:{ comment:"PER 약 26.8배로 과거 평균(약 31배) 대비 다소 낮아진 수준이며, 알파벳·아마존 대비 프리미엄은 제한적. 현금창출력과 클라우드·AI 성장성을 감안하면 합리적 구간이나, capex 부담이 EPS 성장에 반영되는 동안에는 추가 멀티플 확장 여력은 제한적으로 판단.", peers:[
      {name:"마이크로소프트", per:26.8, pbr:11.0, evEbitda:null},
      {name:"알파벳", per:28.7, pbr:7.0, evEbitda:null},
      {name:"아마존", per:31.7, pbr:6.2, evEbitda:null},
      {name:"오라클", per:33.8, pbr:null, evEbitda:null}
    ]},
    checklist:[
      {q:"사업을 한 문장으로 설명할 수 있는가?", ok:true},
      {q:"최근 매출·이익이 회복/성장 추세인가?", ok:true},
      {q:"부채비율이 과도하지 않은가?", ok:true},
      {q:"분명한 해자가 있는가?", ok:true},
      {q:"현재 밸류에이션이 합리적인가?", ok:null},
      {q:"무효화 조건(매도 기준)을 정했는가?", ok:true},
      {q:"포트폴리오 비중이 과도하지 않은가?", ok:null}
    ],
    invalidation:"Azure 성장률이 2개 분기 연속 20% 아래로 둔화되며 AI 수익화가 정체되거나, 급증한 capex가 잉여현금흐름·영업이익률을 구조적으로 훼손(영업이익률 40% 하회 고착)하는 신호가 확인되고 주가가 $355(52주 저점·손절선) 아래로 이탈하면 투자 논리가 깨진 것으로 보고 비중을 축소·매도한다.",
    sources:[
      {title:"Microsoft FY2025 Q4 실적(SEC 8-K)", url:"https://www.sec.gov/Archives/edgar/data/0000789019/000095017025100226/msft-ex99_1.htm"},
      {title:"Microsoft (MSFT) - Yahoo Finance", url:"https://finance.yahoo.com/quote/MSFT/"},
      {title:"Microsoft 통계·밸류에이션(StockAnalysis)", url:"https://stockanalysis.com/stocks/msft/statistics/"}
    ]
  },

  /* ----------------------------- 테슬라 ----------------------------- */
  {
    ticker:"TSLA", name:"테슬라 (Tesla)", exchange:"NASDAQ", country:"미국", sector:"전기차 / 자율주행 / 에너지", currency:"$",
    asOf:"2026-06-01",
    rating:"중립",
    currentPrice:435.8, targetPrice:412.0, buyZone:"300 ~ 350", stopLoss:270.0, marketCap:"약 $1.6T (≈ 2,250조 원)",
    snapshot:{ per:423.8, pbr:18.9, evEbitda:null, dividendYield:0.0, roe:4.7, week52:"273.2 ~ 498.8" },
    thesis:"테슬라는 전기차 판매량 둔화(2025년 인도량 약 164만 대로 2년 연속 감소)와 마진 압박에 직면했으나, Q1 2026 총마진 21.1% 회복과 FSD·로보택시, 에너지저장(ESS) 성장으로 '자동차 회사'에서 'AI·자율주행·에너지 플랫폼'으로의 내러티브 전환을 시도하고 있다. 다만 PER 420배 수준의 극단적 밸류에이션은 자율주행·옵티머스 등 아직 실현되지 않은 미래가치를 대부분 선반영한 상태로, 실적 펀더멘털과의 괴리가 크다. 현 주가는 성장 스토리에 대한 신뢰가 유지되어야만 정당화되며, 둔화 신호 누적 시 변동성 확대 위험이 높아 중립 관점에서 분할 접근이 합리적이다.",
    points:[
      "전기차 판매·마진 둔화: 2025년 인도량 약 164만 대(전년비 -8.6%, 2년 연속 감소). 다만 Q1 2026 총마진 21.1%로 회복",
      "FSD·로보택시·자율주행: 밸류에이션의 핵심 동력. 무인 로보택시 상용화·확대 여부가 향후 주가의 최대 변수",
      "에너지저장(ESS) 성장: 2025년 ESS 배치 46.7GWh, Q4 14.2GWh 신기록. 다만 분기 매출 변동성 큼",
      "옵티머스 휴머노이드 로봇 + 극단적 밸류에이션: PER 420배·PBR 19배로 미래 옵션가치 대부분 선반영"
    ],
    businessModel:"전기차(Model 3/Y/S/X, Cybertruck) 제조·판매가 매출의 대부분을 차지하며, 에너지 발전·저장(Powerwall·Megapack)과 FSD 소프트웨어·슈퍼차저·서비스로 수익원을 다변화. 자체 배터리·소프트웨어·충전 인프라 수직계열화와 자율주행 데이터 축적이 차별점이며, 향후 로보택시·옵티머스 로봇을 신성장축으로 제시.",
    segments:[{name:"자동차",pct:73.3},{name:"에너지 발전·저장",pct:13.5},{name:"서비스·기타",pct:13.2}],
    industry:"글로벌 전기차 시장은 보조금 축소·경쟁 심화로 성장세가 둔화되고 BYD 등 중국 업체의 가격 경쟁이 격화되는 국면. 동시에 자율주행(로보택시)과 에너지저장(ESS), 휴머노이드 로봇이 차세대 성장 테마로 부상하며 테슬라는 이 교차점에 위치. 다만 자율주행 규제·안전 검증, 중국 업체 추격이 산업 전반의 핵심 리스크.",
    financials:{ unit:"$B", rows:[
      {year:"FY23", revenue:96.8, opIncome:8.9, opMargin:9.2, netIncome:15.0, eps:4.3},
      {year:"FY24", revenue:97.7, opIncome:7.1, opMargin:7.3, netIncome:7.1, eps:2.0},
      {year:"FY25", revenue:94.8, opIncome:3.8, opMargin:4.0, netIncome:3.8, eps:1.1},
      {year:"FY26E", revenue:100.5, opIncome:null, opMargin:null, netIncome:null, eps:null}
    ]},
    catalysts:[
      "무인 로보택시 서비스 지역 확대 및 규제 승인 가속화",
      "FSD 구독·라이선싱 매출 본격화와 자율주행 안전 데이터 신뢰 확보",
      "에너지저장(ESS) 배치량·마진 동반 성장 및 신차(저가형 모델) 출시 효과"
    ],
    risks:[
      "전기차 인도량 추가 감소 및 가격 인하에 따른 자동차 마진 재악화",
      "FSD·로보택시·옵티머스 상용화 지연 시 성장 내러티브 훼손과 멀티플 디레이팅",
      "PER 420배 수준의 극단적 밸류에이션 — 금리·심리 변화에 따른 급격한 조정 가능성",
      "BYD 등 중국 경쟁사 추격, 규제 크레딧 축소, CEO 리스크(경영 집중도·정치 리스크)"
    ],
    valuation:{ comment:"PER 약 420배, PBR 약 19배로 전통 자동차 업종(토요타 약 11배)은 물론 고성장 BYD(약 19~24배) 대비도 압도적으로 높음. 이는 자율주행·로보택시·옵티머스 등 미실현 미래가치를 대부분 선반영한 결과로, 현금흐름·이익 기반 밸류에이션으로는 정당화가 어려운 수준. 실적 펀더멘털과의 괴리가 커 밸류에이션 자체가 최대 리스크.", peers:[
      {name:"테슬라", per:423.8, pbr:18.9, evEbitda:null},
      {name:"BYD", per:20.0, pbr:null, evEbitda:null},
      {name:"토요타", per:11.1, pbr:null, evEbitda:null}
    ]},
    checklist:[
      {q:"사업을 한 문장으로 설명할 수 있는가?", ok:true},
      {q:"최근 매출·이익이 회복/성장 추세인가?", ok:false},
      {q:"부채비율이 과도하지 않은가?", ok:true},
      {q:"분명한 해자가 있는가?", ok:null},
      {q:"현재 밸류에이션이 합리적인가?", ok:false},
      {q:"무효화 조건(매도 기준)을 정했는가?", ok:true},
      {q:"포트폴리오 비중이 과도하지 않은가?", ok:null}
    ],
    invalidation:"분기 인도량 감소가 2~3개 분기 연속 심화되며 자동차 총마진이 15% 아래로 재하락하거나, 로보택시·FSD 상용화·규제 승인이 명확히 지연되어 성장 내러티브가 훼손될 경우 매도. 주가 기준 $270(52주 저점권) 이탈 시 손절.",
    sources:[
      {title:"Tesla (TSLA) Stock Analysis (stockanalysis.com)", url:"https://stockanalysis.com/stocks/tsla/"},
      {title:"Tesla Q1 2026 Earnings (CNBC)", url:"https://www.cnbc.com/2026/04/22/tesla-tsla-q1-2026-earnings-report.html"},
      {title:"Tesla Q4 & FY2025 Earnings (Teslarati)", url:"https://www.teslarati.com/tesla-tsla-q4-and-fy-2025-earnings-results/"}
    ]
  }

];

/* =============================================================
 *  TEMPLATE — 새 종목 추가 시 아래 형태를 복사해서 채우세요.
 * -------------------------------------------------------------
 *  {
 *    ticker:"", name:"", exchange:"", country:"", sector:"", currency:"원|$",
 *    asOf:"YYYY-MM-DD",
 *    rating:"매수|중립|매도",
 *    currentPrice:0, targetPrice:0, buyZone:"", stopLoss:0, marketCap:"",
 *    snapshot:{ per:0, pbr:0, evEbitda:null, dividendYield:0, roe:0, week52:"—" },
 *    thesis:"2~4문장 핵심 논거",
 *    points:["투자포인트1","투자포인트2"],
 *    businessModel:"무엇을 팔아 돈을 버나",
 *    segments:[{name:"부문", pct:0}],
 *    industry:"산업·경쟁·해자",
 *    financials:{ unit:"조원|$B", rows:[
 *        {year:"2024", revenue:0, opIncome:0, opMargin:0, netIncome:0, eps:null}
 *    ]},
 *    catalysts:["촉매1"], risks:["리스크1"],
 *    valuation:{ comment:"", peers:[{name:"", per:0, pbr:0, evEbitda:null}] },
 *    checklist:[{q:"질문", ok:true}],   // ok: true=충족 / false=미흡 / null=확인필요
 *    invalidation:"이게 틀리면 판다",
 *    sources:[{title:"", url:""}],      // 내가 인용한 출처(리포트 하단 표시)
 *    links:[{title:"", url:""}]         // (선택) 리서치 바로가기에 추가할 커스텀 링크(특정 리포트 PDF 등)
 *  }
 *  ※ '리서치 바로가기' 버튼(네이버/한경/FnGuide/DART · EDGAR/StockAnalysis/Finviz/MarketBeat)은
 *    country·ticker로 자동 생성되므로 따로 적지 않아도 모든 종목에 표시됩니다.
 * ============================================================= */
