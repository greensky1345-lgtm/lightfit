// 공간 분석 결과 타입
export interface SpaceAnalysis {
  roomType: string;         // 방 종류 (거실, 침실, 주방 등)
  width: number;            // 가로 길이 (m 단위)
  height: number;           // 세로 길이 (m 단위)
  ceilingHeight: number;    // 천장 높이 (m 단위)
  style: string;            // 인테리어 스타일
  currentLighting: string;  // 현재 조명 상태
  ambiance: string;         // 공간 분위기
}

// 조명 위치 타입 (SVG 배치도에 사용)
export interface LightPosition {
  x: number;   // SVG 내 X 좌표 (0~100 퍼센트)
  y: number;   // SVG 내 Y 좌표 (0~100 퍼센트)
  type: 'main' | 'accent' | 'task';  // 주조명, 포인트조명, 작업조명
}

// 조명 추천 타입
export interface LightRecommendation {
  id: string;
  name: string;              // 조명 이름
  type: 'main' | 'accent' | 'task';
  typeLabel: string;         // 한국어 라벨
  wattage: number;           // 와트
  colorTemp: number;         // 색온도 (켈빈)
  lumens: number;            // 밝기 (루멘)
  reason: string;            // 추천 이유
  searchQuery: string;       // 네이버 쇼핑 검색어
  position: LightPosition;   // 배치 위치
}

// 전체 AI 분석 결과
export interface AnalysisResult {
  space: SpaceAnalysis;
  recommendations: LightRecommendation[];
  summary: string;           // 전체 요약
}

// 네이버 쇼핑 상품 타입
export interface NaverShoppingItem {
  title: string;             // 상품명 (HTML 태그 포함될 수 있음)
  link: string;              // 상품 링크
  image: string;             // 상품 이미지 URL
  lprice: string;            // 최저가
  hprice: string;            // 최고가
  mallName: string;          // 쇼핑몰 이름
  productId: string;
}

// 가격 비교 결과
export interface PriceResult {
  recommendationId: string;
  items: NaverShoppingItem[];
  error?: string;
}
