# 🚀 Vercel 배포 가이드

## 준비사항

- ✅ GitHub 계정
- ✅ Vercel 계정 (GitHub로 로그인 가능)
- ✅ Supabase 데이터베이스 설정 완료
- ✅ 모든 코드가 GitHub 저장소에 푸시됨

---

## 1단계: GitHub 저장소 생성

### 로컬 Git 초기화

```bash
cd c:\Users\user\Lumina_dashboard_architecture

# Git 초기화 (아직 안 했다면)
git init

# .gitignore 확인 (이미 생성되어 있음)
# .env 파일이 포함되어 있는지 확인

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: LUMINA DEX Dashboard complete"
```

### GitHub에 푸시

1. [GitHub](https://github.com) 접속
2. **New repository** 클릭
3. Repository 이름: `lumina-dex-dashboard`
4. **Create repository** 클릭
5. 로컬에서 푸시:

```bash
git remote add origin https://github.com/YOUR_USERNAME/lumina-dex-dashboard.git
git branch -M main
git push -u origin main
```

---

## 2단계: Vercel에 배포

### Vercel 프로젝트 생성

1. [Vercel](https://vercel.com) 접속
2. **Add New... > Project** 클릭
3. GitHub 저장소 import
4. `lumina-dex-dashboard` 선택
5. **Import** 클릭

### 프로젝트 설정

**Framework Preset**: Next.js (자동 감지됨)

**Build Settings**:
- Build Command: `prisma generate && next build`
- Output Directory: `.next` (기본값)
- Install Command: `npm install`

---

## 3단계: 환경 변수 설정

### 필수 환경 변수

Vercel 프로젝트 설정 > **Environment Variables**에서 다음 변수들을 추가:

```env
# Database
DATABASE_URL=postgresql://postgres.ttcsucbgoovmlcyvrkje:2Wodlr2wodlr%21%40%23@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres

# Security
ADMIN_PASSWORD=your_secure_admin_password
JWT_SECRET=your-very-long-random-jwt-secret-here
ENCRYPTION_KEY=your-very-long-random-encryption-key-here
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-key

# External APIs (선택사항)
BSCSCAN_API_KEY=your_bscscan_api_key
COINGECKO_API_KEY=your_coingecko_api_key

# Node Environment
NODE_ENV=production
```

### 🔐 보안 키 생성 방법

터미널에서 랜덤 키 생성:

```bash
# JWT_SECRET 생성
openssl rand -base64 32

# ENCRYPTION_KEY 생성
openssl rand -base64 32

# NEXTAUTH_SECRET 생성
openssl rand -base64 32
```

---

## 4단계: 배포 실행

1. 환경 변수 설정 완료 후
2. **Deploy** 버튼 클릭
3. 빌드 로그 확인
4. 배포 완료 대기 (약 2-3분)

---

## 5단계: 배포 확인

### 자동 생성된 URL

Vercel이 자동으로 URL을 생성합니다:
- `https://lumina-dex-dashboard.vercel.app`
- 또는 `https://lumina-dex-dashboard-XXXXX.vercel.app`

### 테스트 항목

✅ 로그인 페이지 접속: `/login`
✅ Admin 로그인 (아이디: admin, 비밀번호: .env의 ADMIN_PASSWORD)
✅ 대시보드 페이지들 확인
✅ API 테스트:
  - `https://your-app.vercel.app/api/test/coingecko`
  - `https://your-app.vercel.app/api/test/dexscreener`
  - `https://your-app.vercel.app/api/test/database`

---

## 6단계: 커스텀 도메인 설정 (선택사항)

### 도메인 연결

1. Vercel 프로젝트 > **Settings > Domains**
2. **Add** 버튼 클릭
3. 도메인 입력 (예: `dashboard.lumina-dex.com`)
4. DNS 설정 안내에 따라 설정

### DNS 레코드 추가

도메인 제공업체(Cloudflare, GoDaddy 등)에서:

```
Type: CNAME
Name: dashboard (또는 @)
Value: cname.vercel-dns.com
```

---

## 자동 배포 설정

GitHub에 푸시할 때마다 자동으로 배포됩니다:

```bash
# 코드 수정 후
git add .
git commit -m "Update: 기능 추가"
git push

# Vercel이 자동으로 빌드 & 배포
```

### 브랜치별 배포

- `main` 브랜치 → Production 배포
- 다른 브랜치 → Preview 배포 (테스트용)

---

## 문제 해결

### 빌드 실패 시

1. **Logs** 탭에서 에러 확인
2. 환경 변수 재확인
3. 로컬에서 빌드 테스트:

```bash
npm run build
```

### DATABASE_URL 오류

- URL 인코딩 확인 (특수문자는 %21, %40, %23으로)
- Supabase Connection Pooler 사용 확인
- 포트 5432 사용 확인

### NextAuth 오류

- `NEXTAUTH_URL` 설정 확인
- `NEXTAUTH_SECRET` 설정 확인
- 프로덕션 URL로 업데이트

---

## 성능 최적화

### Edge Functions

Vercel은 자동으로 최적화하지만, 필요시 설정:

```typescript
export const runtime = 'edge';
```

### ISR (Incremental Static Regeneration)

페이지별로 재검증 시간 설정:

```typescript
export const revalidate = 3600; // 1시간마다 재생성
```

---

## 모니터링

### Vercel Analytics

1. Vercel 프로젝트 > **Analytics** 탭
2. 무료 플랜에서도 기본 분석 제공
3. 방문자, 성능, 에러 추적

### Logs 확인

1. **Functions** 탭
2. 실시간 로그 확인
3. 에러 추적

---

## 백업 & 롤백

### 이전 버전으로 롤백

1. **Deployments** 탭
2. 원하는 버전 선택
3. **Promote to Production** 클릭

### 데이터베이스 백업

Supabase 자동 백업 활성화:
- Settings > Database > Backups
- 무료 플랜: 7일 보관

---

## 비용

### Vercel 무료 플랜

- ✅ 무제한 배포
- ✅ 자동 HTTPS
- ✅ 100GB 대역폭/월
- ✅ Edge Network
- ⚠️ Commercial 프로젝트는 Pro 플랜 필요

### Supabase 무료 플랜

- ✅ 500MB 데이터베이스
- ✅ 5GB 대역폭
- ✅ 자동 백업 (7일)
- ⚠️ 1주일 비활성 시 일시정지

---

## 보안 체크리스트

✅ `.env` 파일이 `.gitignore`에 포함됨
✅ 모든 비밀 키가 Vercel 환경 변수에 설정됨
✅ `ADMIN_PASSWORD` 강력한 비밀번호로 변경
✅ `JWT_SECRET`, `NEXTAUTH_SECRET` 랜덤 값 사용
✅ HTTPS 자동 활성화됨 (Vercel 기본)
✅ Supabase Connection Pooling 사용

---

## 다음 단계

1. ✅ 배포 완료
2. 🔐 Admin 비밀번호 변경
3. 📊 실제 데이터 입력 시작
4. 🔔 알림 설정 (Slack, Discord 등)
5. 📈 모니터링 대시보드 설정
6. 👥 팀원 초대 (필요시)

---

**축하합니다! 🎉 LUMINA DEX Dashboard가 배포되었습니다!**
