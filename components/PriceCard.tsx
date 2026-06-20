'use client';

import { useEffect, useState } from 'react';
import type { LightRecommendation, PriceResult, NaverShoppingItem } from '@/types';

interface PriceCardProps {
  recommendation: LightRecommendation;
  index: number;
}

// HTML 태그 제거 함수 (네이버 상품명에 <b> 태그가 포함될 수 있음)
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

// 가격을 한국 형식으로 포맷 (예: 45000 → 45,000원)
function formatPrice(price: string): string {
  const num = parseInt(price);
  if (!num) return '가격 정보 없음';
  return `${num.toLocaleString('ko-KR')}원`;
}

const TYPE_COLORS = {
  main: 'border-amber-400/40 bg-amber-400/5',
  accent: 'border-purple-400/40 bg-purple-400/5',
  task: 'border-cyan-400/40 bg-cyan-400/5',
} as const;

const TYPE_BADGE_COLORS = {
  main: 'bg-amber-400 text-black',
  accent: 'bg-purple-400 text-white',
  task: 'bg-cyan-400 text-black',
} as const;

export default function PriceCard({ recommendation, index }: PriceCardProps) {
  const [priceData, setPriceData] = useState<PriceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // 컴포넌트가 처음 보일 때 가격 자동 조회
  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          query: recommendation.searchQuery,
          id: recommendation.id,
        });
        const res = await fetch(`/api/price?${params}`);
        const data = await res.json();
        setPriceData(data);
      } catch {
        setPriceData({ recommendationId: recommendation.id, items: [], error: '가격 조회 실패' });
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [recommendation.id, recommendation.searchQuery]);

  const borderColor = TYPE_COLORS[recommendation.type];
  const badgeColor = TYPE_BADGE_COLORS[recommendation.type];

  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-200 ${borderColor}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* 헤더 */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
              {recommendation.typeLabel}
            </span>
            <span className="text-gray-400 text-xs">{recommendation.wattage}W</span>
            <span className="text-gray-400 text-xs">{recommendation.colorTemp}K</span>
          </div>
          <h3 className="text-white font-medium text-sm">{recommendation.name}</h3>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-gray-400 text-xs">{recommendation.lumens}lm</div>
        </div>
      </div>

      {/* 추천 이유 */}
      <p className="text-gray-400 text-xs leading-relaxed mb-3">{recommendation.reason}</p>

      {/* 가격 정보 */}
      <div className="border-t border-white/5 pt-3">
        {loading ? (
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <div className="w-3 h-3 border border-amber-400/40 border-t-amber-400 rounded-full animate-spin" />
            가격 조회 중...
          </div>
        ) : priceData?.error ? (
          <p className="text-red-400 text-xs">{priceData.error}</p>
        ) : priceData?.items && priceData.items.length > 0 ? (
          <div>
            {/* 최저가 상품 */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs">최저가</span>
              <span className="text-amber-400 font-bold text-sm">
                {formatPrice(priceData.items[0].lprice)}
              </span>
            </div>

            {/* 더보기 토글 */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-gray-500 hover:text-amber-400 transition-colors"
            >
              {expanded ? '접기 ▲' : `상품 ${priceData.items.length}개 보기 ▼`}
            </button>

            {/* 상품 목록 */}
            {expanded && (
              <div className="mt-2 flex flex-col gap-2">
                {priceData.items.map((item: NaverShoppingItem, i: number) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors"
                  >
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={stripHtml(item.title)}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs truncate">{stripHtml(item.title)}</p>
                      <p className="text-gray-400 text-xs">{item.mallName}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-amber-400 text-xs font-bold">{formatPrice(item.lprice)}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-xs">가격 정보를 불러올 수 없습니다.</p>
        )}
      </div>
    </div>
  );
}
