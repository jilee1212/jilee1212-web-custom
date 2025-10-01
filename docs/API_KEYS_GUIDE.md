# 🔑 외부 API 키 설정 가이드

## 1. BSCScan API 키

BSC 블록체인 데이터를 조회하기 위해 필요합니다.

### 무료로 받는 방법:

1. [BscScan](https://bscscan.com) 접속
2. 우측 상단 **Sign In** 클릭
3. 계정 생성 (이메일 인증 필요)
4. 로그인 후 **My Profile > API-KEYs** 메뉴
5. **Add** 버튼 클릭하여 새 API 키 생성
6. API 키 복사

**무료 플랜 제한:**
- 5 calls/sec
- 100,000 calls/day

### .env 파일에 추가:

```env
BSCSCAN_API_KEY=your_api_key_here
```

---

## 2. CoinGecko API 키 (선택사항)

토큰 가격 정보를 조회하기 위해 사용합니다.

### 무료 API (키 없이 사용 가능)

CoinGecko는 API 키 없이도 사용 가능합니다:
- 10-30 calls/minute
- 키 없이 바로 사용 가능

### Pro API 키 (더 높은 제한)

1. [CoinGecko](https://www.coingecko.com) 접속
2. **Sign Up** 클릭
3. 계정 생성
4. [API Dashboard](https://www.coingecko.com/en/api/pricing) 접속
5. **Demo** 플랜 선택 (무료)
6. API 키 복사

**Demo 플랜 제한:**
- 30 calls/minute
- 10,000 calls/month

### .env 파일에 추가 (선택사항):

```env
COINGECKO_API_KEY=your_api_key_here
```

> 키가 없으면 기본 무료 API를 사용합니다.

---

## 3. 현재 .env 파일 확인

`.env` 파일을 열어서 다음과 같이 설정하세요:

```env
# Database (이미 설정됨)
DATABASE_URL="postgresql://postgres.ttcsucbgoovmlcyvrkje:..."

# External APIs
BSCSCAN_API_KEY=여기에_BSCScan_API_키_붙여넣기
COINGECKO_API_KEY=                          # 선택사항

# Security
ADMIN_PASSWORD=admin123
JWT_SECRET=your-super-secret-jwt-key-change-this
ENCRYPTION_KEY=your-encryption-key-change-this

# Node Environment
NODE_ENV=development
```

---

## 4. API 테스트

API 키 설정 후 다음 엔드포인트로 테스트:

### BSCScan 테스트
```bash
curl http://localhost:3000/api/test/bscscan
```

### CoinGecko 테스트
```bash
curl http://localhost:3000/api/test/coingecko
```

---

## 5. DexScreener API

DexScreener는 **API 키가 필요 없습니다**. 무료로 바로 사용 가능합니다.

**제한:**
- Rate limit: 300 requests/minute

자동으로 작동하므로 별도 설정이 필요 없습니다.

---

## 📝 참고사항

- API 키는 절대 GitHub에 커밋하지 마세요
- `.env` 파일은 `.gitignore`에 포함되어 있습니다
- 프로덕션 배포 시 Vercel 환경 변수에 설정하세요
- API 키는 정기적으로 재생성하는 것을 권장합니다
