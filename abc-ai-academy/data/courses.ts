export type Course = {
  slug: string;
  title: string; // "\n"에서 카드 줄바꿈
  instructor: string;
  color: string;
  icon: string;
  duration: string;
  format: "온라인 실시간" | "오프라인" | "혼합";
  target: string;
  summary: string;
  curriculum: string[];
};

// 과정 구성은 예시입니다. 실제 개설 과정·강사명으로 교체하세요.
export const courses: Course[] = [
  {
    slug: "genai-basic",
    title: "생성형 AI\n업무 활용 입문",
    instructor: "TODO 강사",
    color: "#c2410c",
    icon: "✍️",
    duration: "4주 (주 1회 2시간)",
    format: "온라인 실시간",
    target: "AI를 처음 업무에 쓰려는 직장인",
    summary: "ChatGPT·Claude로 문서 작성, 요약, 아이디어 정리를 빠르게 하는 방법을 익힙니다.",
    curriculum: ["생성형 AI 기본 개념과 도구 비교", "좋은 프롬프트 작성법", "보고서·기획서 초안 작성", "회의록 요약과 메일 작성 실습"],
  },
  {
    slug: "ai-automation",
    title: "AI로 끝내는\n반복 업무 자동화",
    instructor: "TODO 강사",
    color: "#2f9e44",
    icon: "⚙️",
    duration: "6주 (주 1회 3시간)",
    format: "온라인 실시간",
    target: "엑셀·메일·문서 반복 작업이 많은 실무자",
    summary: "엑셀 함수, 구글 앱스스크립트, 노코드 도구를 AI와 함께 써서 반복 업무를 줄입니다.",
    curriculum: ["업무 흐름 분석", "AI로 엑셀 수식·VBA 만들기", "구글 앱스스크립트 기초", "메일·문자 발송 자동화"],
  },
  {
    slug: "custom-chatbot",
    title: "나만의\nAI 챗봇 만들기",
    instructor: "TODO 강사",
    color: "#4c6ef5",
    icon: "🤖",
    duration: "4주 (주 1회 3시간)",
    format: "혼합",
    target: "사내 문서로 답하는 챗봇이 필요한 팀",
    summary: "사내 자료를 학습시킨 업무용 챗봇을 설계하고 직접 만들어 봅니다.",
    curriculum: ["챗봇 활용 사례", "지식 자료 정리법", "챗봇 설계와 제작 실습", "사내 배포와 운영 팁"],
  },
  {
    slug: "data-analysis",
    title: "AI와 함께하는\n데이터 분석",
    instructor: "TODO 강사",
    color: "#9c36b5",
    icon: "📊",
    duration: "8주 (주 1회 3시간)",
    format: "온라인 실시간",
    target: "데이터로 보고서를 만드는 기획·마케팅 담당자",
    summary: "코딩 경험이 없어도 AI에게 물어 가며 데이터를 정리하고 시각화합니다.",
    curriculum: ["데이터 정리 기본", "AI로 분석 질문 만들기", "차트와 대시보드", "분석 결과 보고서 작성"],
  },
  {
    slug: "ai-instructor",
    title: "AI 강사\n양성 과정",
    instructor: "TODO 강사",
    color: "#e8590c",
    icon: "🎤",
    duration: "10주 (주 1회 3시간)",
    format: "혼합",
    target: "AI 교육 강사로 활동하려는 분",
    summary: "강의 기획부터 교안 제작, 시범 강의까지 AI 강사에게 필요한 과정을 다룹니다.",
    curriculum: ["AI 교육 시장 이해", "강의 기획과 커리큘럼 설계", "AI로 교안·실습 자료 만들기", "시범 강의와 피드백"],
  },
];
