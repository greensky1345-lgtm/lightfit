---
name: aihp
description: AI 교육기관 홈페이지를 Next.js + Tailwind CSS로 만들고 고치는 스킬. "AI 교육 홈페이지", "교육원 사이트", "랜딩페이지", "강의 페이지 추가", "수강신청 폼" 같은 요청에 사용한다.
---

# AI 교육기관 홈페이지 스킬 (aihp)

## 1. 목적
AI 교육기관(자격과정·기업교육·강사양성·온라인 강의)의 홈페이지를 만든다.
방문자가 **과정을 고르고 → 신뢰를 얻고 → 상담·수강신청까지** 막힘없이 가게 하는 것이 목표다.

참고 사이트: https://aimaster.kr/
- 따라 할 것: 정보 구조(메뉴 구성, 섹션 순서), 수강 문의로 이어지는 흐름
- 따라 하지 말 것: 로고, 문구, 이미지, 색상을 그대로 복사하는 것 → 우리 기관 것으로 새로 만든다

## 2. 작업 원칙 (항상 지킨다)
1. **먼저 확인한다** – 기관명, 대표 과정, 연락처, 브랜드 색이 정해지지 않았으면 추측하지 말고 묻는다.
2. **단순하게 만든다** – 요청받은 섹션·기능만 만든다. 쓰지 않을 설정이나 추상화는 넣지 않는다.
3. **필요한 곳만 고친다** – 수정 요청이 들어오면 해당 컴포넌트만 바꾼다. 관련 없는 파일은 손대지 않는다.
4. **검증하고 끝낸다** – `npm run lint`, `npm run build`가 통과해야 작업 완료로 본다.
5. **Next.js 버전 확인** – 이 프로젝트의 Next.js는 학습 데이터와 다를 수 있다. 코드를 쓰기 전에 `node_modules/next/dist/docs/`에서 해당 기능 문서를 읽는다(AGENTS.md 규칙).

## 3. 기술 스택
| 항목 | 사용 |
|---|---|
| 프레임워크 | Next.js (App Router, `app/` 디렉터리) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 (`app/globals.css`의 `@theme`로 색 정의) |
| 배포 | Vercel 또는 Netlify |
| 폼 저장(선택) | Supabase 테이블 `inquiries` |

## 4. 사이트맵
```
/                 메인(랜딩)
/about            기관 소개 (인사말, 연혁, 인증·협약)
/courses          교육과정 목록
/courses/[slug]   과정 상세 (커리큘럼, 일정, 수강료, 신청 버튼)
/instructors      강사진
/reviews          수강 후기
/notice           공지사항
/contact          상담·수강 문의 폼, 오시는 길
```

## 5. 메인 페이지 섹션 순서
| 순서 | 섹션 | 들어갈 내용 | 컴포넌트 |
|---|---|---|---|
| 1 | Header | 로고, 메뉴, "수강 문의" 버튼(고정) | `components/Header.tsx` |
| 2 | Hero | 한 줄 메시지 + 보조 문구 + 버튼 2개(과정 보기 / 무료 상담) | `components/Hero.tsx` |
| 3 | 숫자로 보는 성과 | 누적 수강생, 개설 과정 수, 기업 교육 건수, 만족도 | `components/Stats.tsx` |
| 4 | 대표 과정 | 카드 3~6개 (과정명, 대상, 기간, 형태: 온라인/오프라인) | `components/CourseGrid.tsx` |
| 5 | 왜 우리인가 | 강점 3~4개 (현업 강사, 실습 중심, 수료증·자격증, 사후 지원) | `components/Features.tsx` |
| 6 | 강사진 | 사진, 이름, 경력 한 줄 | `components/Instructors.tsx` |
| 7 | 수강 후기 | 후기 카드 또는 슬라이더 | `components/Reviews.tsx` |
| 8 | 협력 기관 | 로고 띠 | `components/Partners.tsx` |
| 9 | FAQ | 아코디언 5~8개 | `components/FAQ.tsx` |
| 10 | CTA | "지금 상담 신청하기" 큰 배너 | `components/CTA.tsx` |
| 11 | Footer | 기관명, 대표자, 사업자번호, 주소, 연락처, 개인정보처리방침 | `components/Footer.tsx` |

## 6. 콘텐츠 데이터
문구와 과정 정보는 컴포넌트 안에 직접 쓰지 않고 `data/` 폴더에 모은다. 내용만 바꿀 때는 이 파일만 고치면 된다.

```ts
// data/courses.ts
export type Course = {
  slug: string;
  title: string;          // 예: "생성형 AI 활용 전문가 과정"
  target: string;         // 예: "직장인·공공기관 실무자"
  duration: string;       // 예: "8주 (주 1회 3시간)"
  format: "온라인" | "오프라인" | "혼합";
  price?: string;
  summary: string;
  curriculum: string[];
};

export const courses: Course[] = [
  {
    slug: "genai-basic",
    title: "생성형 AI 활용 입문",
    target: "AI를 처음 접하는 직장인",
    duration: "4주",
    format: "온라인",
    summary: "ChatGPT·Claude로 문서 작성과 업무 자동화를 익힙니다.",
    curriculum: ["AI 기본 개념", "프롬프트 작성법", "문서·보고서 작성", "업무 자동화 실습"],
  },
];
```

같은 방식으로 `data/site.ts`(기관 정보·연락처), `data/instructors.ts`, `data/reviews.ts`, `data/faq.ts`를 둔다.

## 7. 디자인 규칙
- **톤**: 신뢰감 있고 깔끔하게. 기술 느낌은 포인트 색으로만 준다.
- **색** (`app/globals.css`):
  ```css
  @theme {
    --color-brand: #2563eb;      /* 메인 파랑 */
    --color-brand-dark: #1e3a8a;
    --color-accent: #06b6d4;     /* 포인트 청록 */
    --color-ink: #0f172a;        /* 본문 글자 */
    --color-muted: #64748b;
  }
  ```
- **글꼴**: Pretendard (한글 가독성)
- **레이아웃**: 최대 너비 `max-w-6xl`, 섹션 위아래 여백 `py-20`(모바일 `py-12`)
- **반응형**: 모바일 먼저 작성. 카드 그리드는 1열 → `md:` 2열 → `lg:` 3열
- **버튼**: 주 버튼은 `bg-brand` 채움, 보조 버튼은 테두리만
- **이미지**: `next/image` 사용, 모든 이미지에 `alt` 작성

## 8. 한국어 SEO
- `app/layout.tsx`에 `lang="ko"`와 `metadata`(title, description, openGraph) 설정
- 과정 상세 페이지는 `generateMetadata`로 과정별 제목·설명 생성
- `app/sitemap.ts`, `app/robots.ts` 추가
- 기관 정보는 JSON-LD(`EducationalOrganization`), 과정은 `Course` 스키마로 넣는다
- 네이버 서치어드바이저 인증 메타 태그 자리를 남겨 둔다

## 9. 상담·수강 문의 폼
- 항목: 이름, 연락처, 이메일, 관심 과정(선택), 문의 내용, **개인정보 수집·이용 동의(필수 체크)**
- 서버 쪽에서 입력값을 다시 검사한다 (Server Action 또는 Route Handler — 사용법은 docs에서 확인)
- 비밀 키는 `.env.local`에만 두고 커밋하지 않는다
- 제출 후 "접수되었습니다. 영업일 기준 1일 안에 연락드립니다." 안내

## 10. 작업 순서
1. 기관 정보 확인 (부족하면 질문)
2. `data/` 파일 작성
3. 공통 레이아웃: Header, Footer, `globals.css` 색 설정
4. 메인 페이지 섹션을 위 순서대로 만든다
5. 하위 페이지 (`/courses`, `/courses/[slug]`, `/contact` 먼저)
6. SEO 메타데이터, sitemap, robots
7. `npm run lint` → `npm run build` 통과 확인
8. `npm run dev`로 띄워 모바일(375px)·데스크톱(1280px) 화면 확인

## 11. 완료 체크리스트
- [ ] 모든 페이지에서 "수강 문의" 버튼이 보인다
- [ ] 모바일에서 가로 스크롤이 생기지 않는다
- [ ] 이미지 `alt`, 버튼·링크 텍스트가 모두 있다
- [ ] 문의 폼에 개인정보 동의 체크가 있다
- [ ] Footer에 사업자 정보와 개인정보처리방침 링크가 있다
- [ ] lint, build 통과

## 12. 하지 말 것
- 참고 사이트의 로고·문구·이미지·디자인을 그대로 복제
- 확인되지 않은 수치(수강생 수, 취업률 등)나 실존 인물 이름을 지어내서 넣기 → 자리만 만들고 `TODO`로 표시
- 요청받지 않은 기능(로그인, 결제, 관리자 페이지) 추가
