import { NextRequest } from 'next/server';
import type { NaverShoppingItem } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get('query');
  const id = searchParams.get('id');

  if (!query || !id) {
    return Response.json({ error: '검색어가 필요합니다.' }, { status: 400 });
  }

  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return Response.json({ error: '네이버 API 키가 설정되지 않았습니다.' }, { status: 500 });
  }

  try {
    // 네이버 쇼핑 검색 API 호출 (서버에서 직접 호출 — API 키 노출 없음)
    const encodedQuery = encodeURIComponent(query);
    const apiUrl = `https://openapi.naver.com/v1/search/shop.json?query=${encodedQuery}&display=3&sort=sim`;

    const response = await fetch(apiUrl, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
    });

    if (!response.ok) {
      throw new Error(`네이버 API 오류: ${response.status}`);
    }

    const data = await response.json();
    const items: NaverShoppingItem[] = data.items || [];

    return Response.json({ recommendationId: id, items });
  } catch (error) {
    console.error('가격 조회 오류:', error);
    return Response.json(
      { recommendationId: id, items: [], error: '가격 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
