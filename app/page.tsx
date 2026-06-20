'use client';

import { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { AnalysisResult } from '@/types';

// 무거운 SVG 컴포넌트는 동적 로딩 (페이지 초기 로딩 속도 개선)
const FloorPlan = dynamic(() => import('@/components/FloorPlan'), { ssr: false });
const CeilingPlan = dynamic(() => import('@/components/CeilingPlan'), { ssr: false });
const PriceCard = dynamic(() => import('@/components/PriceCard'), { ssr: false });

type Step = 'upload' | 'analyzing' | 'result';

export default function LightFitPage() {
  const [step, setStep] = useState<Step>('upload');
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedFileRef = useRef<File | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다 (JPG, PNG, WEBP)');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('파일 크기는 10MB 이하여야 합니다');
      return;
    }
    setError(null);
    selectedFileRef.current = file;
    const url = URL.createObjectURL(file);
    setPreview(url);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleAnalyze = async () => {
    if (!selectedFileRef.current) return;

    setStep('analyzing');
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFileRef.current);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || '분석 실패');
      }

      const data: AnalysisResult = await res.json();
      setResult(data);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류');
      setStep('upload');
    }
  };

  const handleReset = () => {
    setStep('upload');
    setPreview(null);
    setResult(null);
    setError(null);
    selectedFileRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <main
      className="min-h-screen text-white"
      style={{ backgroundColor: '#0a0a0f' }}
    >
      {/* 헤더 */}
      <header className="border-b border-amber-400/10 px-4 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-black font-bold text-sm">
              L
            </div>
            <div>
              <h1 className="text-white font-bold text-base leading-none">LightFit</h1>
              <p className="text-amber-400/60 text-xs">AI 조명 추천</p>
            </div>
          </div>
          {step === 'result' && (
            <button
              onClick={handleReset}
              className="text-gray-400 hover:text-amber-400 text-xs transition-colors"
            >
              다시 분석
            </button>
          )}
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* ─── 업로드 단계 ─── */}
        {step === 'upload' && (
          <div className="flex flex-col gap-5">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-1">
                공간 사진을 업로드하세요
              </h2>
              <p className="text-gray-400 text-sm">
                AI가 공간을 분석하고 최적의 조명을 추천해드립니다
              </p>
            </div>

            {/* 드래그 앤 드롭 영역 */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200
                flex flex-col items-center justify-center text-center min-h-52
                ${isDragging
                  ? 'border-amber-400 bg-amber-400/10'
                  : preview
                  ? 'border-amber-400/40 bg-transparent p-0'
                  : 'border-amber-400/20 hover:border-amber-400/50 hover:bg-amber-400/5'
                }
              `}
            >
              {preview ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="업로드 미리보기"
                    className="w-full h-52 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm">다른 사진으로 변경</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 py-8 px-4">
                  <div className="w-14 h-14 rounded-full bg-amber-400/10 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 16V8M12 8L9 11M12 8L15 11"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="4"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        opacity="0.4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">사진을 드래그하거나 탭하세요</p>
                    <p className="text-gray-500 text-xs mt-1">JPG, PNG, WEBP · 최대 10MB</p>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />

            {error && (
              <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {preview && (
              <button
                onClick={handleAnalyze}
                className="w-full py-4 rounded-xl bg-amber-400 text-black font-bold text-base transition-all hover:bg-amber-300 active:scale-95"
              >
                AI 분석 시작
              </button>
            )}

            {/* 안내 */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '📸', text: '공간 사진 업로드' },
                { icon: '🤖', text: 'AI 공간 분석' },
                { icon: '💡', text: '조명 추천 + 가격' },
              ].map((item, i) => (
                <div key={i} className="bg-white/3 rounded-xl p-3 text-center">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="text-gray-400 text-xs">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── 분석 중 단계 ─── */}
        {step === 'analyzing' && (
          <div className="flex flex-col items-center justify-center min-h-96 gap-6">
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="분석 중인 사진"
                className="w-32 h-32 object-cover rounded-2xl opacity-60"
              />
            )}

            {/* 로딩 애니메이션 */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-amber-400/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-amber-400 rounded-full animate-spin" />
              <div className="absolute inset-2 border-2 border-transparent border-t-amber-400/50 rounded-full animate-spin"
                   style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
            </div>

            <div className="text-center">
              <p className="text-white font-medium text-base mb-1">AI가 공간을 분석 중...</p>
              <p className="text-gray-400 text-sm">조명 배치와 추천 상품을 계산하고 있어요</p>
            </div>

            {/* 진행 단계 표시 */}
            <div className="flex flex-col gap-2 w-full">
              {['공간 크기 측정', '인테리어 스타일 분석', '최적 조명 배치 계산', '추천 상품 선정'].map(
                (text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"
                         style={{ animationDelay: `${i * 300}ms` }} />
                    <span className="text-gray-400 text-xs">{text}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* ─── 결과 단계 ─── */}
        {step === 'result' && result && (
          <div className="flex flex-col gap-6">
            {/* 분석 요약 */}
            <div className="bg-amber-400/5 border border-amber-400/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
                  <span className="text-black text-xs font-bold">AI</span>
                </div>
                <span className="text-amber-400 text-sm font-medium">분석 완료</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{result.summary}</p>
            </div>

            {/* 공간 정보 */}
            <div>
              <h2 className="text-white font-bold text-base mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-amber-400 rounded-full" />
                공간 정보
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '공간 종류', value: result.space.roomType },
                  { label: '인테리어 스타일', value: result.space.style },
                  { label: '현재 조명', value: result.space.currentLighting },
                  { label: '분위기', value: result.space.ambiance },
                ].map((item) => (
                  <div key={item.label} className="bg-white/3 rounded-xl p-3">
                    <div className="text-gray-400 text-xs mb-1">{item.label}</div>
                    <div className="text-white text-sm font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 평면도 + 조명 배치도 */}
            <div>
              <h2 className="text-white font-bold text-base mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-amber-400 rounded-full" />
                도면
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <FloorPlan space={result.space} />
                <CeilingPlan space={result.space} recommendations={result.recommendations} />
              </div>
            </div>

            {/* 조명 추천 + 가격 비교 */}
            <div>
              <h2 className="text-white font-bold text-base mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-amber-400 rounded-full" />
                추천 조명 + 실시간 가격
              </h2>
              <div className="flex flex-col gap-3">
                {result.recommendations.map((rec, i) => (
                  <PriceCard key={rec.id} recommendation={rec} index={i} />
                ))}
              </div>
            </div>

            {/* 다시 분석 버튼 */}
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl border border-amber-400/30 text-amber-400 text-sm font-medium hover:bg-amber-400/10 transition-colors"
            >
              다른 공간 분석하기
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
