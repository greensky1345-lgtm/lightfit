---
name: aihp
description: AI 교육기관 홈페이지를 Next.js + Tailwind CSS로 만들고 고치는 스킬. "AI 교육 홈페이지", "교육원 사이트", "랜딩페이지", "강의 페이지 추가", "단체교육 문의 폼" 같은 요청에 사용한다.
---

# AI 교육기관 홈페이지 스킬 (aihp)

## 1. 목적
AI 교육기관(실시간 강의·기업 단체연수·강사 양성·자격증 과정)의 홈페이지를 만든다.
방문자가 **전문성을 믿고 → 과정을 고르고 → 수강신청이나 단체교육 문의까지** 막힘없이 가게 하는 것이 목표다.

참고 사이트: https://aimaster.kr/ (메인 화면 캡처 기준으로 분석, 아래 3장)
- 따라 할 것: 메뉴 구성, 섹션 순서, 신뢰 요소를 쌓는 흐름, 색으로 섹션을 나누는 방식
- 따라 하지 말 것: 로고, 문구, 이미지, 수치, 협력기관 로고, 강사 이름, 연락처 → 우리 기관 것으로 새로 만든다

## 2. 작업 원칙 (항상 지킨다)
1. **먼저 확인한다** – 기관명, 대표 과정, 강사진, 연락처, 브랜드 색이 정해지지 않았으면 추측하지 말고 묻는다.
2. **단순하게 만든다** – 요청받은 섹션·기능만 만든다. 쓰지 않을 설정이나 추상화는 넣지 않는다.
3. **필요한 곳만 고친다** – 수정 요청이 들어오면 해당 컴포넌트만 바꾼다. 관련 없는 파일은 손대지 않는다.
4. **검증하고 끝낸다** – `npm run lint`, `npm run build`가 통과해야 작업 완료로 본다.
5. **Next.js 버전 확인** – 이 프로젝트의 Next.js는 학습 데이터와 다를 수 있다. 코드를 쓰기 전에 `node_modules/next/dist/docs/`에서 해당 기능 문서를 읽는다(AGENTS.md 규칙).

## 3. 참고 사이트 분석 (aimaster.kr 메인)
| 순서 | 섹션 | 구성 | 배경 |
|---|---|---|---|
| 1 | 헤더 | 로고 / 메뉴 4개(소개·교육과정·학습자료실·출간 및 뉴스) / 오른쪽에 "단체교육 문의" 버튼, 로그인·회원가입, 장바구니·검색 아이콘 | 히어로 위에 투명하게 겹침 |
| 2 | 히어로 슬라이더 | 전체 너비 사진, 왼쪽에 큰 제목 2줄 + 짧은 설명, 좌우 화살표 | 사진 |
| 3 | 흐르는 글자 띠 | 기관 영문명이 가로로 계속 흐름(marquee) | 연회색 |
| 4 | 강사 신뢰 + 성과 수치 | 작은 문구("대기업 실무자 출신 박사님들이 강의합니다") → 큰 제목(핵심 단어만 파란색) → 수치 카드 3개(수강생 수·컨설팅 수·강의 수) | 연회색, 카드는 흰색 |
| 5 | 협력 기관 | 짧은 설명 + "함께한 다양한 기관" + 로고가 가로로 흐름 | 흰색 |
| 6 | 선택해야 하는 이유 | 번호(01~06)가 붙은 강점 6개, 3열 그리드 (실시간 강의·강사 양성·인재풀·공동 출간·수료증·자격증) | 연회색 |
| 7 | 대표 과정 슬라이더 | 큰 제목 3줄 + 색이 다른 정사각형 과정 카드(강사 이름 배지 + 과정명 + 3D 일러스트) + "수강신청 바로가기" 버튼 | **검정** |
| 8 | 무료 자료 배너 | "커뮤니티에서 자료 공유받기" + 화살표 링크 + 선물상자 일러스트 | **노랑** |
| 9 | 수강 후기 | 카드 3개: 제목 2줄(둘째 줄 파란색) / 본문 / "N기 수강생 \| 김OO" / 별 5개 | **연보라** |
| 10 | 언론 보도 | 카드 3개(날짜·제목·요약·"더 보기") + "보도자료 더보기" 버튼 | 연회색 |
| 11 | 푸터 | 메뉴 링크 / 상호·대표자·연락처·이메일·호스팅 / 저작권 / SNS 아이콘 | 연회색 |

**정리하면**: 신뢰(강사 경력·수치·기관) → 이유(강점) → 상품(과정) → 혜택(무료 자료) → 증거(후기·언론) 순서다. 흰색·연회색 사이에 검정·노랑·연보라 섹션을 끼워 넣어 스크롤할 때 지루하지 않게 한다.

## 4. 기술 스택
| 항목 | 사용 |
|---|---|
| 프레임워크 | Next.js (App Router, `app/` 디렉터리) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 (`app/globals.css`의 `@theme`로 색 정의) |
| 슬라이더 | 우선 CSS scroll-snap으로 만든다. 자동 넘김이 꼭 필요할 때만 라이브러리를 추가한다 |
| 배포 | Vercel 또는 Netlify |
| 폼 저장(선택) | Supabase 테이블 `inquiries` |

## 5. 사이트맵
```
/                 메인
/about            소개 (인사말, 강사진, 연혁)
/courses          교육과정 목록
/courses/[slug]   과정 상세 (커리큘럼, 일정, 수강료, 수강신청 버튼)
/resources        학습자료실 (무료 자료)
/news             출간 및 뉴스 (도서, 보도자료)
/inquiry          단체교육 문의 폼
```
로그인·회원가입·장바구니는 요청이 있을 때만 만든다. 그 전에는 헤더에 넣지 않는다.

## 6. 메인 페이지 섹션 (만들 순서)
| 순서 | 섹션 | 들어갈 내용 | 컴포넌트 |
|---|---|---|---|
| 1 | Header | 로고, 메뉴 4개, "단체교육 문의" 버튼. 스크롤하면 흰 배경으로 바뀜 | `components/Header.tsx` |
| 2 | HeroSlider | 슬라이드 2~3장(제목 2줄 + 설명 + 링크) | `components/HeroSlider.tsx` |
| 3 | Marquee | 기관 영문명이 흐르는 띠 | `components/Marquee.tsx` |
| 4 | Stats | 강사 신뢰 문구 + 제목 + 수치 카드 3개 | `components/Stats.tsx` |
| 5 | Partners | 협력 기관 로고 띠 (Marquee 재사용) | `components/Partners.tsx` |
| 6 | Reasons | 번호 붙은 강점 6개, 3열 | `components/Reasons.tsx` |
| 7 | CourseSlider | 검정 배경, 과정 카드, 수강신청 버튼 | `components/CourseSlider.tsx` |
| 8 | FreeBanner | 노랑 배너, 학습자료실로 이동 | `components/FreeBanner.tsx` |
| 9 | Reviews | 연보라 배경, 후기 카드 3개 | `components/Reviews.tsx` |
| 10 | Press | 보도 카드 3개 + 더보기 | `components/Press.tsx` |
| 11 | Footer | 메뉴, 사업자 정보, 저작권, SNS | `components/Footer.tsx` |

## 7. 콘텐츠 데이터
문구와 과정 정보는 컴포넌트 안에 직접 쓰지 않고 `data/` 폴더에 모은다. 내용만 바꿀 때는 이 파일만 고치면 된다.

```ts
// data/courses.ts
export type Course = {
  slug: string;
  title: string;        // 카드에 줄바꿈해서 보여줄 과정명
  instructor: string;   // 카드 위 배지
  color: string;        // 카드 배경색 (카드마다 다르게)
  image: string;        // 3D 일러스트 경로
  duration: string;
  format: "온라인 실시간" | "오프라인" | "혼합";
  summary: string;
  curriculum: string[];
};

export const courses: Course[] = [
  {
    slug: "genai-work",
    title: "생성형 AI\n업무 자동화",
    instructor: "TODO 강사명",
    color: "#3b5bdb",
    image: "/courses/genai-work.png",
    duration: "4주",
    format: "온라인 실시간",
    summary: "ChatGPT·Claude로 문서 작성과 반복 업무를 자동화합니다.",
    curriculum: ["AI 기본 개념", "프롬프트 작성법", "보고서 작성", "업무 자동화 실습"],
  },
];
```

같은 방식으로 아래 파일을 둔다.
- `data/site.ts` – 기관명, 메뉴, 연락처, 사업자 정보
- `data/stats.ts` – `{ label: "함께한 수강생 수", value: 0, suffix: "명+" }` (실제 숫자는 기관에 확인)
- `data/reasons.ts` – 강점 6개 `{ no: "01", title, desc }`
- `data/reviews.ts` – `{ title1, title2, body, cohort: "1기 수강생", name: "김OO", rating: 5 }`
- `data/press.ts` – `{ date, title, excerpt, url }`
- `data/partners.ts` – `{ name, logo }`

## 8. 디자인 규칙
- **톤**: 밝고 신뢰감 있게. 제목은 가운데 정렬, 핵심 단어만 브랜드 파랑으로 강조한다.
  ```tsx
  <h2>진짜 <span className="text-brand">전문가</span>들과 함께</h2>
  ```
- **색** (`app/globals.css`):
  ```css
  @theme {
    --color-brand: #4c6ef5;      /* 강조 파랑: 제목 강조, 버튼, 수치 */
    --color-ink: #111827;        /* 본문 글자 */
    --color-muted: #6b7280;      /* 보조 글자 */
    --color-surface: #f5f6f8;    /* 연회색 섹션 */
    --color-dark: #0b0b0c;       /* 과정 슬라이더 섹션 */
    --color-sun: #fbb954;        /* 무료 자료 배너 */
    --color-lavender: #e3e8ff;   /* 후기 섹션 */
  }
  ```
- **글꼴**: Pretendard. 섹션 제목 `text-3xl md:text-4xl font-bold`, 작은 문구 `text-sm text-muted`
- **레이아웃**: 최대 너비 `max-w-6xl`, 섹션 위아래 여백 `py-24`(모바일 `py-14`)
- **카드**: 흰 배경, `rounded-2xl`, 그림자는 아주 약하게, 안쪽 여백 넉넉히
- **수치**: 크게, 브랜드 파랑. 화면에 보일 때 0부터 올라가는 효과는 선택 사항
- **반응형**: 모바일 먼저 작성. 카드 그리드는 1열 → `md:` 3열, 과정 카드는 가로로 밀어서 넘김
- **이미지**: `next/image` 사용, 모든 이미지에 `alt` 작성
- **움직임**: Marquee와 슬라이더는 `prefers-reduced-motion` 설정이면 멈춘다

## 9. 한국어 SEO
- `app/layout.tsx`에 `lang="ko"`와 `metadata`(title, description, openGraph) 설정
- 과정 상세 페이지는 `generateMetadata`로 과정별 제목·설명 생성
- `app/sitemap.ts`, `app/robots.ts` 추가
- 기관 정보는 JSON-LD(`EducationalOrganization`), 과정은 `Course` 스키마로 넣는다
- 네이버 서치어드바이저 인증 메타 태그 자리를 남겨 둔다

## 10. 단체교육 문의 폼 (`/inquiry`)
- 항목: 기관·회사명, 담당자 이름, 연락처, 이메일, 예상 인원, 희망 일정, 관심 과정, 문의 내용, **개인정보 수집·이용 동의(필수 체크)**
- 서버 쪽에서 입력값을 다시 검사한다 (Server Action 또는 Route Handler – 사용법은 docs에서 확인)
- 비밀 키는 `.env.local`에만 두고 커밋하지 않는다
- 제출 후 "접수되었습니다. 영업일 기준 1일 안에 연락드립니다." 안내

## 11. 작업 순서
1. 기관 정보 확인 (부족하면 질문)
2. `data/` 파일 작성 (모르는 값은 `TODO`)
3. `globals.css` 색, Header, Footer
4. 메인 섹션을 6번 표 순서대로 하나씩 만든다
5. 하위 페이지 (`/courses`, `/courses/[slug]`, `/inquiry` 먼저)
6. SEO 메타데이터, sitemap, robots
7. `npm run lint` → `npm run build` 통과 확인
8. `npm run dev`로 띄워 모바일(375px)·데스크톱(1280px) 화면을 참고 사이트 구성과 비교

## 12. 완료 체크리스트
- [ ] 헤더의 "단체교육 문의" 버튼이 모든 페이지에서 보인다
- [ ] 과정 슬라이더에서 "수강신청 바로가기"로 과정 목록에 갈 수 있다
- [ ] 모바일에서 가로 스크롤이 생기지 않는다 (Marquee 포함)
- [ ] 이미지 `alt`, 버튼·링크 텍스트가 모두 있다
- [ ] 문의 폼에 개인정보 동의 체크가 있다
- [ ] Footer에 사업자 정보와 개인정보처리방침 링크가 있다
- [ ] lint, build 통과

## 13. 하지 말 것
- 참고 사이트의 로고·문구·이미지·디자인을 그대로 복제
- 확인되지 않은 수치(수강생 수, 컨설팅 수 등), 협력기관 로고, 강사 이름, 후기, 언론 보도를 지어내서 넣기 → 자리만 만들고 `TODO`로 표시
- 요청받지 않은 기능(로그인, 결제, 장바구니, 관리자 페이지) 추가
