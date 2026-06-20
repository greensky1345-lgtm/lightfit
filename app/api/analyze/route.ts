import { NextRequest } from 'next/server';
import type { AnalysisResult } from '@/types';

/**
 * NOTE (mock):
 * 현재 Anthropic 호출 대신 고정된 mock 응답을 반환합니다.
 * - 용도: 개발 및 UI 연동 테스트
 * - 향후 실제 AI로 교체하려면 아래의 예시(주석)에 따라 Anthropic 클라이언트를 복원하고,
 *   이미지(base64)와 프롬프트를 전달한 뒤 응답을 파싱하도록 변경하세요.
 */

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return Response.json({ error: '이미지가 없습니다.' }, { status: 400 });
    }

    // 실제 배포 시에는 file을 base64로 변환해 AI에 전달합니다.
    // const arrayBuffer = await file.arrayBuffer();
    // const base64 = Buffer.from(arrayBuffer).toString('base64');

    // --- MOCK RESPONSE START ---
    const result: AnalysisResult = {
      space: {
        roomType: '의류 매장',
        width: 8.0,
        height: 12.0,
        ceilingHeight: 3.2,
        style: '모던 / 스칸디나비아',
        currentLighting: '트랙 조명 6개, 피팅룸 2등',
        ambiance: '밝고 깨끗한 쇼핑 환경, 상품 컬러가 정확하게 보이도록 설계',
      },
      recommendations: [
        {
          id: 'light-1',
          name: '매장 메인 트랙 라이트(레일 스포트)',
          type: 'main',
          typeLabel: '주조명',
          wattage: 40,
          colorTemp: 3500,
          lumens: 3200,
          reason: '천장 레일에 설치하여 매장 전체를 균등하게 밝힙니다. 상품 색 재현에 적합한 3500K 색온도 추천',
          searchQuery: 'LED 트랙 라이트 40W 3500K 매장',
          position: { x: 50, y: 50, type: 'main' },
        },
        {
          id: 'light-2',
          name: '피팅룸 소프트 다운라이트',
          type: 'accent',
          typeLabel: '포인트조명',
          wattage: 12,
          colorTemp: 3000,
          lumens: 900,
          reason: '피팅룸 내부에 따뜻한 색온도의 소프트 다운라이트로 편안한 착용감 제공',
          searchQuery: '피팅룸 다운라이트 12W 3000K',
          position: { x: 20, y: 80, type: 'accent' },
        },
        {
          id: 'light-3',
          name: '디스플레이 스팟(집중 조명)',
          type: 'task',
          typeLabel: '작업조명',
          wattage: 8,
          colorTemp: 4000,
          lumens: 700,
          reason: '진열대나 포인트 섹션에 스팟을 비춰 상품의 텍스처를 강조합니다',
          searchQuery: 'LED 스팟 라이트 8W 4000K',
          position: { x: 75, y: 30, type: 'task' },
        },
      ],
      summary: '의류 매장에 적합한 메인·포인트·작업 조명 3종을 제안합니다. 피팅룸은 따뜻한 톤으로, 진열은 중립톤으로 연출하세요.',
    };
    // --- MOCK RESPONSE END ---

    return Response.json(result);
  } catch (error) {
    console.error('분석 오류 (mock):', error);
    return Response.json({ error: '분석 중 오류가 발생했습니다. 다시 시도해주세요.' }, { status: 500 });
  }
}

/**
 * Example: to restore Anthropic usage, uncomment and adapt this snippet:
 *
 * import Anthropic from '@anthropic-ai/sdk';
 * const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
 *
 * // inside POST: build prompt + image base64, then call client.messages.create({...})
 * // parse response text JSON and return it as AnalysisResult
 */
