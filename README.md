# 🚽 똥칸 찾기 — Frontend (React + Vite)

> 내 주변 공중화장실을 빠르게 찾는 MVP 웹앱

## ✨ Tech Stack
- **React + Vite**
- **Tailwind CSS**, **shadcn/ui**
- 지도 SDK: **카카오** 또는 **네이버** (JS SDK)
- 배포: **Vercel** 또는 **Cloudflare Pages** (무료)

## 📁 Project Structure (초안)
```
frontend/
 ├─ src/
 │  ├─ app/               # 라우팅/레이아웃
 │  ├─ components/        # UI 컴포넌트(별점 등)
 │  ├─ pages/
 │  ├─ lib/               # api 클라이언트, util
 │  └─ styles/
 ├─ index.html
 ├─ vite.config.ts
 └─ package.json
```

## 🔐 Environment
루트에 `.env` (개발용):
```
VITE_API_BASE=http://localhost:8080
VITE_MAP_PROVIDER=kakao       # kakao | naver
VITE_KAKAO_MAP_KEY=
VITE_NAVER_MAP_CLIENT_ID=
```

## 🛠️ Setup & Run
```bash
npm i
npm run dev
# http://localhost:5173
```

## 🧭 기능 (MVP)
- 현재 위치 기반 근처 화장실 목록/지도 표시
- 카드: 이름/거리/핵심 아이콘(장애인/기저귀) + **평균 별점/개수**
- 상세: 시설 정보, 길찾기 딥링크(네이버/카카오/구글)
- 별점: 1~5 입력 → 제출 후 디바이스당/화장실 1회 잠금
- 제보: 혼잡도(여유/보통/혼잡), 정보 수정 제보

## 🔌 API 연동
`VITE_API_BASE` 기준으로 호출:
```ts
// lib/api.ts (예시)
export async function listToilets(lat: number, lng: number, radius=1000, limit=30) {
  const q = new URLSearchParams({ lat: String(lat), lng: String(lng), radius: String(radius), limit: String(limit) });
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/toilets?${q}`);
  if (!res.ok) throw new Error('Failed');
  return res.json();
}
```

## 🗺️ 지도 SDK 메모
- **카카오**  
  - 앱키 발급: https://developers.kakao.com  
  - 스크립트 로드 예시:
    ```html
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KEY&libraries=services"></script>
    ```
- **네이버**  
  - 문서: https://api.ncloud-docs.com/docs/ai-naver-maps  
  - 스크립트 로드 예시:
    ```html
    <script src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID"></script>
    ```

## 🧩 별점 중복 방지 (클라이언트)
```ts
const key = `rating:${toiletId}`;
if (!localStorage.getItem(key)) {
  await api.post('/ratings', { toiletId, score });
  localStorage.setItem(key, '1');
}
```

## ☁️ Deploy
- **Vercel**: 새 프로젝트 → Framework: Vite → 환경변수 설정
- **Cloudflare Pages**: Build command `npm run build` / Output `dist`

## 📝 License
Seorin Park
