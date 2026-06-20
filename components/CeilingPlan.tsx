'use client';

import type { LightRecommendation, SpaceAnalysis } from '@/types';

interface CeilingPlanProps {
  space: SpaceAnalysis;
  recommendations: LightRecommendation[];
}

// 조명 타입별 색상과 아이콘 설정
const LIGHT_STYLES = {
  main: {
    fill: '#f59e0b',
    stroke: '#fcd34d',
    glow: '#f59e0b',
    radius: 10,
  },
  accent: {
    fill: '#8b5cf6',
    stroke: '#a78bfa',
    glow: '#8b5cf6',
    radius: 7,
  },
  task: {
    fill: '#06b6d4',
    stroke: '#67e8f9',
    glow: '#06b6d4',
    radius: 6,
  },
} as const;

export default function CeilingPlan({ space, recommendations }: CeilingPlanProps) {
  const svgWidth = 300;
  const svgHeight = 200;
  const padding = 30;

  const roomRatio = space.width / space.height;
  const roomW = roomRatio >= 1
    ? svgWidth - padding * 2
    : (svgWidth - padding * 2) * roomRatio;
  const roomH = roomRatio >= 1
    ? (svgHeight - padding * 2) / roomRatio
    : svgHeight - padding * 2;

  const roomX = (svgWidth - roomW) / 2;
  const roomY = (svgHeight - roomH) / 2;

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-amber-400 text-sm font-medium tracking-wider uppercase">
        천장 조명 배치도
      </h3>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="rounded-lg border border-amber-400/20 bg-[#0f0f17]"
      >
        {/* 발광 효과 정의 */}
        <defs>
          {Object.entries(LIGHT_STYLES).map(([type, style]) => (
            <radialGradient key={type} id={`glow-${type}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={style.glow} stopOpacity="0.6" />
              <stop offset="100%" stopColor={style.glow} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* 방 외곽선 */}
        <rect
          x={roomX}
          y={roomY}
          width={roomW}
          height={roomH}
          fill="#1a1a2e"
          stroke="#f59e0b"
          strokeWidth="2"
          opacity="0.8"
        />

        {/* 각 조명 배치 */}
        {recommendations.map((rec) => {
          const style = LIGHT_STYLES[rec.position.type];
          // position의 x, y (0~100)를 실제 SVG 좌표로 변환
          const cx = roomX + (rec.position.x / 100) * roomW;
          const cy = roomY + (rec.position.y / 100) * roomH;
          const glowRadius = style.radius * 3;

          return (
            <g key={rec.id}>
              {/* 발광 효과 원 */}
              <circle
                cx={cx}
                cy={cy}
                r={glowRadius}
                fill={`url(#glow-${rec.position.type})`}
              />
              {/* 조명 본체 */}
              <circle
                cx={cx}
                cy={cy}
                r={style.radius}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth="1.5"
              />
              {/* 중앙 점 */}
              <circle
                cx={cx}
                cy={cy}
                r={2}
                fill="white"
                opacity="0.9"
              />
              {/* 라벨 */}
              <text
                x={cx}
                y={cy + style.radius + 12}
                textAnchor="middle"
                fill={style.stroke}
                fontSize="8"
                fontWeight="500"
              >
                {rec.typeLabel}
              </text>
            </g>
          );
        })}
      </svg>

      {/* 범례 */}
      <div className="flex gap-4 flex-wrap justify-center">
        {Object.entries(LIGHT_STYLES).map(([type, style]) => {
          const label = type === 'main' ? '주조명' : type === 'accent' ? '포인트조명' : '작업조명';
          return (
            <div key={type} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: style.fill }}
              />
              <span className="text-gray-400 text-xs">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
