# 🚀 Vercel 배포 단계별 가이드

## ✅ GitHub 푸시 완료!

코드가 성공적으로 GitHub에 업로드되었습니다:
📦 **저장소**: https://github.com/jilee1212/jilee1212-web-custom

---

## 🌐 Vercel 배포 단계

### 1단계: Vercel 접속

1. [Vercel.com](https://vercel.com) 접속
2. **"Continue with GitHub"** 클릭하여 로그인

---

### 2단계: 프로젝트 Import

1. 로그인 후 **"Add New..."** 클릭
2. **"Project"** 선택
3. GitHub 저장소 목록에서 **"jilee1212-web-custom"** 찾기
4. **"Import"** 버튼 클릭

---

### 3단계: 프로젝트 설정

#### Framework Preset
- **자동 감지**: Next.js ✅

#### Build Settings (기본값 사용)
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

---

### 4단계: 환경 변수 설정 ⚠️ 중요!

**Environment Variables** 섹션에서 아래 변수들을 추가하세요:

#### 필수 변수 (반드시 설정)

```env
DATABASE_URL
postgresql://postgres.ttcsucbgoovmlcyvrkje:2Wodlr2wodlr%21%40%23@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres

ADMIN_PASSWORD
admin123

JWT_SECRET
랜덤_문자열_32자_이상

NEXTAUTH_SECRET
랜덤_문자열_32자_이상

NODE_ENV
production
```

#### NEXTAUTH_URL (나중에 설정)
배포 후 자동 생성된 URL을 확인한 뒤 설정합니다.

#### 선택 변수

```env
BSCSCAN_API_KEY
(BSCScan API 키 - 선택사항)

COINGECKO_API_KEY
(CoinGecko API 키 - 선택사항)
```

---

### 5단계: 랜덤 키 생성 방법

터미널에서 실행:

```bash
# JWT_SECRET
openssl rand -base64 32

# NEXTAUTH_SECRET
openssl rand -base64 32
```

또는 온라인 생성기:
- https://generate-secret.vercel.app

---

### 6단계: 배포 시작

1. 환경 변수 모두 입력 완료
2. **"Deploy"** 버튼 클릭
3. 빌드 로그 확인 (약 2-3분 소요)

---

### 7단계: 배포 완료 확인

배포가 완료되면 Vercel이 자동으로 URL을 생성합니다:

예: `https://jilee1212-web-custom.vercel.app`

---

### 8단계: NEXTAUTH_URL 업데이트

1. Vercel 프로젝트 > **Settings** > **Environment Variables**
2. **Add New** 클릭
3. 변수 추가:
   ```
   Name: NEXTAUTH_URL
   Value: https://jilee1212-web-custom.vercel.app
   ```
4. **Save** 클릭
5. 프로젝트 재배포:
   - **Deployments** 탭 > 최신 배포 > **... (점 3개)** > **Redeploy**

---

### 9단계: 배포 테스트

#### 접속 확인
- 홈: https://jilee1212-web-custom.vercel.app
- 로그인: https://jilee1212-web-custom.vercel.app/login

#### 로그인 정보
- 아이디: `admin`
- 비밀번호: 환경 변수에 설정한 `ADMIN_PASSWORD`

#### API 테스트
```bash
curl https://jilee1212-web-custom.vercel.app/api/test/coingecko
curl https://jilee1212-web-custom.vercel.app/api/test/dexscreener
curl https://jilee1212-web-custom.vercel.app/api/test/database
```

---

## 🔧 문제 해결

### 빌드 실패 시

1. **Logs** 탭에서 에러 확인
2. 환경 변수 오타 확인
3. DATABASE_URL 특수문자 인코딩 확인

### 데이터베이스 연결 오류

- Supabase가 활성 상태인지 확인
- Connection Pooler URL 사용 확인
- 포트 5432 확인

### NextAuth 오류

- `NEXTAUTH_URL` 설정 확인
- `NEXTAUTH_SECRET` 설정 확인
- 재배포 필요

---

## 📊 Vercel 대시보드

배포 후 확인할 항목:

### Analytics
- 방문자 수
- 페이지뷰
- 성능 지표

### Deployments
- 배포 히스토리
- 로그 확인
- 롤백 기능

### Settings
- 환경 변수 관리
- 도메인 설정
- 팀 관리

---

## 🎯 자동 배포 설정

이제 GitHub에 푸시할 때마다 자동으로 배포됩니다:

```bash
# 코드 수정
git add .
git commit -m "Update: 기능 추가"
git push

# Vercel이 자동으로 배포!
```

---

## 📱 커스텀 도메인 연결 (선택사항)

### 도메인 추가

1. Vercel 프로젝트 > **Settings** > **Domains**
2. **Add** 클릭
3. 도메인 입력 (예: `dashboard.lumina-dex.com`)
4. DNS 설정 안내 따라하기

### DNS 설정 (도메인 제공업체에서)

```
Type: CNAME
Name: dashboard
Value: cname.vercel-dns.com
```

---

## ✅ 배포 완료 체크리스트

- [ ] GitHub 푸시 완료
- [ ] Vercel 프로젝트 생성
- [ ] 환경 변수 설정
- [ ] 첫 배포 성공
- [ ] NEXTAUTH_URL 추가
- [ ] 재배포 완료
- [ ] 로그인 테스트
- [ ] API 테스트
- [ ] 모든 페이지 확인

---

## 🎉 완료!

**축하합니다! LUMINA DEX Dashboard가 성공적으로 배포되었습니다!**

이제 전 세계 어디서든 접속할 수 있습니다:
🌐 https://jilee1212-web-custom.vercel.app

---

## 📞 지원

문제가 발생하면:
1. Vercel Logs 확인
2. [Vercel 문서](https://vercel.com/docs) 참조
3. [Vercel 커뮤니티](https://github.com/vercel/vercel/discussions)

---

**Built with ❤️ for LUMINA DEX**
