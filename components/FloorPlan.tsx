'use client';

import type { SpaceAnalysis } from '@/types';

interface FloorPlanProps {
  space: SpaceAnalysis;
}

// 평면도 SVG — 방의 가로/세로 비율에 맞게 그려줍니다
export default function FloorPlan({ space }: FloorPlanProps) {
  const svgWidth = 300;
  const svgHeight = 200;
  const padding = 30;

  // 방 비율 계산
  const roomRatio = space.width / space.height;
  const roomW = roomRatio >= 1
    ? svgWidth - padding * 2
    : (svgWidth - padding * 2) * roomRatio;
  const roomH = roomRatio >= 1
    ? (svgHeight - padding * 2) / roomRatio
    : svgHeight - padding * 2;

  // 방을 SVG 중앙에 배치
  const roomX = (svgWidth - roomW) / 2;
  const roomY = (svgHeight - roomH) / 2;

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-amber-400 text-sm font-medium tracking-wider uppercase">
        평면도
      </h3>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="rounded-lg border border-amber-400/20 bg-[#0f0f17]"
      >
        {/* 방 외곽선 */}
        <rect
          x={roomX}
          y={roomY}
          width={roomW}
          height={roomH}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="none"
        />

        {/* 방 내부 채우기 */}
        <rect
          x={roomX + 1}
          y={roomY + 1}
          width={roomW - 2}
          height={roomH - 2}
          fill="#1a1a2e"
          opacity="0.6"
        />

        {/* 문 표시 (아래쪽 왼편) */}
        <path
          d={`M ${roomX + 20} ${roomY + roomH} A 20 20 0 0 0 ${roomX + 20} ${roomY + roomH - 20}`}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <line
          x1={roomX + 20}
          y1={roomY + roomH}
          x2={roomX + 20}
          y2={roomY + roomH - 20}
          stroke="#f59e0b"
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* 치수 표시 — 가로 */}
        <line
          x1={roomX}
          y1={roomY + roomH + 12}
          x2={roomX + roomW}
          y2={roomY + roomH + 12}
          stroke="#f59e0b"
          strokeWidth="1"
          opacity="0.4"
        />
        <text
          x={roomX + roomW / 2}
          y={roomY + roomH + 22}
          textAnchor="middle"
          fill="#f59e0b"
          fontSize="10"
          opacity="0.7"
        >
          {space.width}m
        </text>

        {/* 치수 표시 — 세로 */}
        <line
          x1={roomX - 12}
          y1={roomY}
          x2={roomX - 12}
          y2={roomY + roomH}
          stroke="#f59e0b"
          strokeWidth="1"
          opacity="0.4"
        />
        <text
          x={roomX - 18}
          y={roomY + roomH / 2}
          textAnchor="middle"
          fill="#f59e0b"
          fontSize="10"
          opacity="0.7"
          transform={`rotate(-90, ${roomX - 18}, ${roomY + roomH / 2})`}
        >
          {space.height}m
        </text>

        {/* 방 종류 라벨 */}
        <text
          x={roomX + roomW / 2}
          y={roomY + roomH / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#f59e0b"
          fontSize="12"
          opacity="0.4"
          fontWeight="bold"
        >
          {space.roomType}
        </text>
      </svg>

      {/* 공간 정보 */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {[
          { label: '가로', value: `${space.width}m` },
          { label: '세로', value: `${space.height}m` },
          { label: '천장', value: `${space.ceilingHeight}m` },
        ].map((item) => (
          <div key={item.label} className="bg-[#1a1a2e] rounded-lg p-2 text-center">
            <div className="text-gray-400 text-xs">{item.label}</div>
            <div className="text-amber-400 text-sm font-bold">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
