# 🚀 LUMINA DEX Dashboard

LUMINA DEX 운영 대시보드 - 종합 모니터링 및 관리 시스템

## ✨ 주요 기능

- 📊 **실시간 대시보드**: KPI 지표, 차트, 빠른 액션
- 📅 **일일 모니터링**: 거래량, TVL, 스테이킹 데이터 입력 및 추적
- 📄 **컨트랙트 정보**: 스마트 컨트랙트 파라미터 관리
- 💰 **재무 관리**: 수익/비용 추적 및 분석
- 💧 **유동성 추적**: LP 페어 및 스테이킹 풀 모니터링
- 📈 **주간 리포트**: 자동 집계 및 리포트 생성
- 🚨 **이슈 트래커**: 문제 발견, 추적, 해결 관리

## 🛠️ 기술 스택

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (차트 라이브러리)
- **Lucide React** (아이콘)

### Backend
- **Next.js API Routes**
- **Prisma** (ORM)
- **PostgreSQL** (데이터베이스)

### 외부 API
- BSCScan API
- CoinGecko API
- DexScreener API

## 📦 설치 방법

### 1. 저장소 클론

```bash
git clone <repository-url>
cd Lumina_dashboard_architecture
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.example` 파일을 복사하여 `.env` 파일을 생성하고 필요한 값을 입력합니다:

```bash
cp .env.example .env
```

`.env` 파일 내용:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/lumina_dashboard"
BSCSCAN_API_KEY=your_bscscan_api_key
COINGECKO_API_KEY=your_coingecko_api_key
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
```

### 4. 데이터베이스 설정

```bash
# Prisma 클라이언트 생성
npx prisma generate

# 데이터베이스 마이그레이션
npx prisma migrate dev --name init

# (선택사항) Prisma Studio로 데이터베이스 확인
npx prisma studio
```

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 🏗️ 프로젝트 구조

```
lumina-dex-dashboard/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 전역 레이아웃
│   ├── page.tsx             # 홈 (대시보드)
│   ├── daily/               # 일일 모니터링
│   ├── contract/            # 컨트랙트 정보
│   ├── finance/             # 재무 관리
│   ├── liquidity/           # 유동성 추적
│   ├── reports/             # 주간 리포트
│   ├── issues/              # 이슈 트래커
│   └── api/                 # API Routes
│
├── components/              # React 컴포넌트
│   ├── layout/             # 레이아웃 컴포넌트
│   ├── dashboard/          # 대시보드 컴포넌트
│   └── ui/                 # UI 기본 컴포넌트
│
├── lib/                     # 유틸리티 & 라이브러리
│   ├── api/                # 외부 API 클라이언트
│   ├── db.ts               # Prisma 클라이언트
│   └── utils.ts            # 유틸리티 함수
│
├── types/                   # TypeScript 타입 정의
├── prisma/                  # Prisma 스키마
└── public/                  # 정적 파일
```

## 🎯 페이지별 기능

### 홈 / 대시보드 (`/`)
- KPI 메트릭 카드 (거래량, TVL, 스테이킹, 가격)
- 7일 거래량 추이 차트
- 빠른 액션 버튼
- 최근 이슈 목록

### 일일 모니터링 (`/daily`)
- 일일 데이터 입력 폼
- 체크리스트 (7개 항목)
- 히스토리 테이블
- CSV 내보내기

### 컨트랙트 정보 (`/contract`)
- 기본 정보 표시/수정
- BSCScan 연동
- 파라미터 관리
- 보안 체크리스트

### 재무 관리 (`/finance`)
- 월간 수익/비용/순이익 요약
- 수익원/비용 항목별 차트
- 거래 내역 테이블
- 월별 필터링

### 유동성 추적 (`/liquidity`)
- LP 페어별 유동성 현황
- 상태 인디케이터 (충분/주의/긴급)
- 스테이킹 풀 정보
- 알림 설정

### 주간 리포트 (`/reports`)
- 주차별 리포트 목록
- 주요 지표 요약
- 비교 차트
- PDF 다운로드

### 이슈 트래커 (`/issues`)
- 이슈 목록 및 필터링
- 상태별 통계
- 심각도별 분류
- 이슈 등록/수정/완료

## 🔌 API 엔드포인트

### 메트릭 관련
- `GET /api/metrics/daily` - 일일 메트릭 조회
- `POST /api/metrics/daily` - 일일 메트릭 생성

### 컨트랙트
- `GET /api/contract` - 컨트랙트 정보 조회
- `PUT /api/contract` - 컨트랙트 정보 수정

### 이슈
- `GET /api/issues` - 이슈 조회 (필터링 가능)
- `POST /api/issues` - 이슈 생성

### 외부 API
- `GET /api/external/price/:token` - 토큰 가격 조회

## 🎨 색상 팔레트

프로젝트에서 사용되는 색상:

- **Primary (파랑)**: #2196F3 - 주요 액션, 링크
- **Success (초록)**: #4CAF50 - 성공, 긍정적 변화
- **Warning (주황)**: #FF9800 - 주의, 경고
- **Danger (빨강)**: #F44336 - 위험, 오류
- **Neutral (회색)**: #9E9E9E - 텍스트, 배경

## 📝 개발 가이드

### 새로운 페이지 추가

1. `app/` 디렉토리에 새 폴더 생성
2. `page.tsx` 파일 생성
3. `components/layout/Sidebar.tsx`에 메뉴 항목 추가

### 새로운 API 추가

1. `app/api/` 디렉토리에 라우트 생성
2. `route.ts` 파일에 핸들러 구현

### 데이터베이스 스키마 수정

1. `prisma/schema.prisma` 수정
2. 마이그레이션 생성: `npx prisma migrate dev --name <name>`
3. Prisma 클라이언트 재생성: `npx prisma generate`

## 🚀 배포

### Vercel 배포 (권장)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com) 계정 생성
3. 프로젝트 import
4. 환경 변수 설정
5. 자동 배포

### 데이터베이스 호스팅

- [Supabase](https://supabase.com) (권장)
- [Neon](https://neon.tech)
- [Railway](https://railway.app)

## 🔒 보안 고려사항

- 환경 변수를 통한 API 키 관리
- Admin 페이지 접근 제어
- Rate Limiting 적용
- CORS 설정
- 데이터베이스 연결 보안

## 📄 라이선스

MIT License

## 👥 기여

프로젝트에 기여하고 싶으시다면 Pull Request를 보내주세요!

## 📧 문의

문의사항이 있으시면 이슈를 등록해주세요.

---

**Built with ❤️ for LUMINA DEX**
