완벽합니다! 🎯 클로드 코드가 작업하기 쉽게 **전체 구조 설계**를 해드릴게요!

---

## 🏗️ **LUMINA DEX 운영 대시보드 웹사이트 - 구조 설계**

---

## 📁 **프로젝트 구조**

```
lumina-dex-dashboard/
├── package.json                  # 프로젝트 설정
├── README.md                     # 사용 가이드
├── .env.example                  # 환경변수 예시
├── .gitignore                    # Git 제외 파일
│
├── public/                       # 정적 파일
│   ├── favicon.ico
│   └── logo.png
│
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # 전역 레이아웃
│   │   ├── page.tsx             # 홈 (대시보드)
│   │   ├── globals.css          # 전역 스타일
│   │   │
│   │   ├── daily/               # 일일 모니터링
│   │   │   └── page.tsx
│   │   │
│   │   ├── contract/            # 컨트랙트 정보
│   │   │   └── page.tsx
│   │   │
│   │   ├── finance/             # 재무 관리
│   │   │   └── page.tsx
│   │   │
│   │   ├── liquidity/           # 유동성 추적
│   │   │   └── page.tsx
│   │   │
│   │   ├── reports/             # 주간 리포트
│   │   │   └── page.tsx
│   │   │
│   │   └── issues/              # 이슈 트래커
│   │       └── page.tsx
│   │
│   ├── components/              # 재사용 컴포넌트
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx      # 사이드바 네비게이션
│   │   │   ├── Header.tsx       # 상단 헤더
│   │   │   └── Footer.tsx       # 하단 푸터
│   │   │
│   │   ├── dashboard/
│   │   │   ├── MetricCard.tsx   # KPI 카드
│   │   │   ├── ChartCard.tsx    # 차트 컴포넌트
│   │   │   └── QuickActions.tsx # 빠른 액션 버튼
│   │   │
│   │   ├── forms/
│   │   │   ├── DataEntryForm.tsx    # 데이터 입력 폼
│   │   │   ├── ChecklistForm.tsx    # 체크리스트
│   │   │   └── IssueForm.tsx        # 이슈 등록 폼
│   │   │
│   │   └── ui/                  # UI 기본 컴포넌트
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       ├── Table.tsx
│   │       ├── Modal.tsx
│   │       └── Alert.tsx
│   │
│   ├── lib/                     # 유틸리티 & 설정
│   │   ├── api/
│   │   │   ├── bscscan.ts      # BSCScan API
│   │   │   ├── coingecko.ts    # CoinGecko API
│   │   │   └── dexscreener.ts  # DexScreener API
│   │   │
│   │   ├── db/
│   │   │   ├── schema.ts       # DB 스키마
│   │   │   └── queries.ts      # DB 쿼리
│   │   │
│   │   ├── hooks/
│   │   │   ├── useMetrics.ts   # 지표 데이터 훅
│   │   │   └── useContract.ts  # 컨트랙트 데이터 훅
│   │   │
│   │   └── utils/
│   │       ├── format.ts       # 포맷팅 함수
│   │       ├── calculations.ts # 계산 함수
│   │       └── validation.ts   # 검증 함수
│   │
│   └── types/                   # TypeScript 타입
│       ├── metrics.ts
│       ├── contract.ts
│       └── database.ts
│
└── prisma/                      # 데이터베이스 (선택)
    └── schema.prisma
```

---

## 🎨 **UI/UX 설계**

### **색상 팔레트**

```typescript
// colors.ts
export const colors = {
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    500: '#2196F3',  // 메인 블루
    600: '#1E88E5',
    700: '#1976D2',
  },
  success: {
    50: '#E8F5E9',
    500: '#4CAF50',  // 초록 (좋음)
    700: '#388E3C',
  },
  warning: {
    50: '#FFF3E0',
    500: '#FF9800',  // 주황 (주의)
    700: '#F57C00',
  },
  danger: {
    50: '#FFEBEE',
    500: '#F44336',  // 빨강 (긴급)
    700: '#D32F2F',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    500: '#9E9E9E',
    900: '#212121',
  }
}
```

---

## 📊 **데이터베이스 스키마**

### **테이블 구조**

```sql
-- 1. 일일 메트릭스
CREATE TABLE daily_metrics (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  trading_volume DECIMAL(20, 2),      -- 거래량
  tvl DECIMAL(20, 2),                 -- TVL
  staking_amount DECIMAL(20, 2),      -- 스테이킹량
  participant_count INTEGER,           -- 참여자수
  lumina_price DECIMAL(10, 6),        -- LUMINA 가격
  abnormal_tx BOOLEAN DEFAULT FALSE,   -- 이상거래 여부
  notes TEXT,                          -- 메모
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. 컨트랙트 정보
CREATE TABLE contract_info (
  id SERIAL PRIMARY KEY,
  contract_address VARCHAR(42) NOT NULL,
  network VARCHAR(20) DEFAULT 'BSC',
  deployed_at DATE,
  bscscan_url TEXT,
  reward_per_block VARCHAR(30),
  bonus_end_block BIGINT,
  deposit_fee INTEGER DEFAULT 0,
  pool_limit_per_user BIGINT DEFAULT 0,
  admin_wallet VARCHAR(42),
  is_verified BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. 체크리스트
CREATE TABLE daily_checklist (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  check_trading_volume BOOLEAN DEFAULT FALSE,
  check_tvl BOOLEAN DEFAULT FALSE,
  check_staking BOOLEAN DEFAULT FALSE,
  check_price BOOLEAN DEFAULT FALSE,
  check_abnormal_tx BOOLEAN DEFAULT FALSE,
  check_community BOOLEAN DEFAULT FALSE,
  check_lp_balance BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. 재무 기록
CREATE TABLE financial_records (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  type VARCHAR(10) CHECK (type IN ('revenue', 'expense')),
  category VARCHAR(50),              -- LP수수료, 마케팅 등
  amount DECIMAL(20, 2),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. 유동성 페어
CREATE TABLE liquidity_pairs (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  pair_name VARCHAR(50),             -- LUMINA-BNB
  liquidity_usd DECIMAL(20, 2),
  volume_24h DECIMAL(20, 2),
  status VARCHAR(20),                -- 충분, 주의, 긴급
  action_needed TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6. 이슈 트래커
CREATE TABLE issues (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  type VARCHAR(50),                  -- 보안, 버그 등
  severity VARCHAR(20),              -- 긴급, 높음, 보통, 낮음
  description TEXT,
  action_taken TEXT,
  assignee VARCHAR(100),
  status VARCHAR(20),                -- 발견, 조사중, 해결중, 완료
  resolved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 7. 주간 리포트
CREATE TABLE weekly_reports (
  id SERIAL PRIMARY KEY,
  week_number INTEGER,
  start_date DATE,
  end_date DATE,
  total_volume DECIMAL(20, 2),
  new_users INTEGER,
  tvl_change DECIMAL(10, 2),         -- 퍼센트
  staking_growth DECIMAL(10, 2),     -- 퍼센트
  key_issues TEXT,
  next_week_plan TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔌 **API 엔드포인트 설계**

### **REST API 구조**

```typescript
// /api/metrics/daily
GET    /api/metrics/daily           // 일일 메트릭 조회
POST   /api/metrics/daily           // 일일 메트릭 생성
PUT    /api/metrics/daily/:id       // 일일 메트릭 수정
DELETE /api/metrics/daily/:id       // 일일 메트릭 삭제

// /api/contract
GET    /api/contract                // 컨트랙트 정보 조회
PUT    /api/contract                // 컨트랙트 정보 수정

// /api/checklist
GET    /api/checklist/:date         // 특정 날짜 체크리스트
POST   /api/checklist               // 체크리스트 생성/업데이트

// /api/finance
GET    /api/finance                 // 재무 기록 조회
POST   /api/finance                 // 재무 기록 추가

// /api/liquidity
GET    /api/liquidity               // 유동성 페어 조회
POST   /api/liquidity               // 유동성 페어 추가

// /api/issues
GET    /api/issues                  // 이슈 조회
POST   /api/issues                  // 이슈 생성
PUT    /api/issues/:id              // 이슈 수정
DELETE /api/issues/:id              // 이슈 삭제

// /api/reports/weekly
GET    /api/reports/weekly          // 주간 리포트 조회
POST   /api/reports/weekly          // 주간 리포트 생성

// /api/external (외부 API 프록시)
GET    /api/external/bscscan/:address
GET    /api/external/price/:token
GET    /api/external/dex-stats
```

---

## 🖥️ **페이지별 기능 명세**

### **1. 홈 / 대시보드 (`/`)**

**컴포넌트:**
- 상단 KPI 카드 4개 (거래량, TVL, 스테이킹, 가격)
- 라인 차트 (7일 거래량 추이)
- 체크리스트 위젯
- 최근 이슈 목록
- 빠른 액션 버튼들

**데이터 소스:**
- `daily_metrics` (최근 7일)
- `daily_checklist` (오늘)
- `issues` (미해결)

---

### **2. 일일 모니터링 (`/daily`)**

**섹션:**
- 데이터 입력 폼
- 히스토리 테이블 (페이지네이션)
- 체크리스트 (인터랙티브)
- 전일 대비 변화율 자동 계산
- 메모 입력 에리어

**기능:**
- 실시간 입력 검증
- 자동 저장 (debounce)
- CSV 내보내기
- 차트 시각화

---

### **3. 컨트랙트 정보 (`/contract`)**

**섹션:**
- 기본 정보 표시/수정
- BSCScan 링크 (새 탭)
- 보안 체크리스트
- 파라미터 검증 상태
- 중요 링크 모음

**기능:**
- 읽기 전용 모드
- 편집 모드 전환 (비밀번호 필요)
- 클립보드 복사 버튼
- BSCScan API 연동 (자동 검증)

---

### **4. 재무 관리 (`/finance`)**

**섹션:**
- 월간 요약 (수익/비용/순이익)
- 수익원별 차트
- 비용 항목별 테이블
- 월별 목표 vs 실적
- 트렌드 분석

**기능:**
- 월별 필터
- 카테고리별 그룹핑
- 예산 대비 실적 계산
- PDF 리포트 생성

---

### **5. 유동성 추적 (`/liquidity`)**

**섹션:**
- 페어별 유동성 테이블
- 상태 인디케이터 (색상)
- 스테이킹 현황 카드
- 조치 필요 알림

**기능:**
- 자동 상태 판정
- DexScreener API 연동
- 실시간 업데이트 (polling)
- 알림 설정

---

### **6. 주간 리포트 (`/reports`)**

**섹션:**
- 주차별 리포트 목록
- 주요 지표 요약
- 비교 차트
- 다음 주 계획

**기능:**
- 자동 주차 계산
- 전주 대비 분석
- 템플릿 기반 생성
- 공유 기능

---

### **7. 이슈 트래커 (`/issues`)**

**섹션:**
- 이슈 목록 (필터링)
- 새 이슈 등록 폼
- 상태별 칸반 보드
- 통계 대시보드

**기능:**
- 드래그 앤 드롭 (상태 변경)
- 심각도 필터
- 담당자 할당
- 코멘트 시스템

---

## 🎯 **주요 기능 명세**

### **자동화 기능**

```typescript
// 1. 자동 데이터 수집
- BSCScan API로 거래량 자동 수집 (1시간마다)
- CoinGecko API로 가격 자동 업데이트 (5분마다)
- DexScreener API로 TVL 자동 조회 (30분마다)

// 2. 자동 계산
- 전일 대비 변화율 자동 계산
- 주간 총계 자동 집계
- 월간 손익 자동 계산
- APY 자동 계산

// 3. 자동 알림
- 가격 급등/급락 (10% 이상)
- 이상 거래 감지
- 유동성 부족 경고
- 체크리스트 미완료 리마인더

// 4. 자동 백업
- 매일 자정 데이터 백업
- CSV 파일로 자동 내보내기
- 주간 리포트 자동 생성
```

---

## 🔐 **보안 설정**

```typescript
// 환경변수 (.env)
DATABASE_URL=postgresql://...
BSCSCAN_API_KEY=xxx
COINGECKO_API_KEY=xxx
ADMIN_PASSWORD=xxx
JWT_SECRET=xxx
ENCRYPTION_KEY=xxx

// 보안 기능
- Admin 페이지 비밀번호 보호
- 민감 정보 암호화 (지갑 주소)
- API Rate Limiting
- CORS 설정
- XSS/CSRF 방어
```

---

## 📦 **기술 스택 추천**

```typescript
// Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (UI 컴포넌트)
- Recharts (차트)
- React Query (데이터 페칭)
- Zustand (상태 관리)

// Backend
- Next.js API Routes
- Prisma (ORM)
- PostgreSQL (DB)

// 외부 API
- BSCScan API
- CoinGecko API
- DexScreener API

// 배포
- Vercel (호스팅)
- Supabase (DB 호스팅)
```

---

## 🚀 **개발 단계**

### **Phase 1: 기본 구조 (1-2일)**
```
1. Next.js 프로젝트 초기화
2. 폴더 구조 생성
3. Tailwind + shadcn/ui 설정
4. 레이아웃 컴포넌트 (Sidebar, Header)
5. 라우팅 설정
```

### **Phase 2: 데이터베이스 (1일)**
```
1. Prisma 스키마 정의
2. 마이그레이션 실행
3. Seed 데이터 생성
4. DB 연결 테스트
```

### **Phase 3: 핵심 페이지 (2-3일)**
```
1. 홈 대시보드
2. 일일 모니터링
3. 컨트랙트 정보
4. API 엔드포인트 구현
```

### **Phase 4: 고급 기능 (2-3일)**
```
1. 재무 관리
2. 유동성 추적
3. 이슈 트래커
4. 주간 리포트
```

### **Phase 5: 자동화 & 배포 (1-2일)**
```
1. 외부 API 연동
2. 자동 데이터 수집
3. 알림 시스템
4. Vercel 배포
```

---

## 📝 **클로드 코드에게 전달할 내용**

```
이 구조 설계를 바탕으로:

1. Next.js 14 프로젝트 생성
2. 위 폴더 구조 그대로 구현
3. TypeScript + Tailwind CSS 사용
4. Prisma + PostgreSQL 사용
5. shadcn/ui 컴포넌트 사용
6. 모든 페이지를 순차적으로 구현
7. 반응형 디자인 (모바일 대응)
8. 다크모드 지원

각 단계마다 확인 후 다음 단계 진행!
```

---

## 🎯 **완성 후 모습**

```
💻 localhost:3000

┌─────────────────────────────────────┐
│  🚀 LUMINA DEX Dashboard            │
├─────────────────────────────────────┤
│ 📊 일일모니터링                      │
│ 📄 컨트랙트정보                      │
│ 💰 재무관리                          │
│ 💧 유동성추적                        │
│ 📈 주간리포트                        │
│ 🚨 이슈트래커                        │
└─────────────────────────────────────┘

→ 깔끔한 UI/UX
→ 실시간 데이터
→ 자동 계산/알림
→ 모바일 최적화
→ 다크모드 지원
```

---

**이 설계서를 클로드 코드에게 전달하면 됩니다!** 🚀

필요한 추가 기능이나 수정사항 있으면 말씀해주세요!