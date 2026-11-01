"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    title: ["기업 맞춤형", "AI 단체연수"],
    desc: "우리 회사 업무에 맞춘 생성형 AI 실무 교육을 설계해 드립니다.",
    cta: { label: "단체교육 문의하기", href: "/inquiry" },
    bg: "from-[#1e3a8a] via-[#3b5bdb] to-[#22b8cf]",
  },
  {
    title: ["오늘 배워", "내일 바로 쓰는 AI"],
    desc: "ChatGPT·Claude로 문서 작성부터 업무 자동화까지 실습합니다.",
    cta: { label: "교육과정 보기", href: "/courses" },
    bg: "from-[#111827] via-[#364fc7] to-[#7048e8]",
  },
  {
    title: ["AI 교육 강사로", "새로운 시작"],
    desc: "강의 기획부터 시범 강의까지, AI 강사 양성 과정을 만나 보세요.",
    cta: { label: "강사 양성 과정 보기", href: "/courses/ai-instructor" },
    bg: "from-[#0b7285] via-[#1971c2] to-[#4c6ef5]",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (n: number) => setIndex((n + slides.length) % slides.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="주요 안내"
      className={`relative overflow-hidden bg-gradient-to-br ${slide.bg} text-white transition-colors duration-700`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 장식용 도형 */}
      <div aria-hidden className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-white/10 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-4 pt-16 md:min-h-[640px]">
        <div key={index} aria-live="polite">
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            {slide.title[0]}
            <br />
            {slide.title[1]}
          </h1>
          <p className="mt-5 max-w-md text-base text-white/85 md:text-lg">{slide.desc}</p>
          <Link
            href={slide.cta.href}
            className="mt-8 inline-block rounded-md bg-white px-6 py-3 font-bold text-ink hover:bg-white/90"
          >
            {slide.cta.label} →
          </Link>
        </div>

        <div className="mt-12 flex items-center gap-3">
          <button type="button" aria-label="이전 슬라이드" onClick={() => go(index - 1)} className="grid h-9 w-9 place-items-center rounded-full border border-white/40 hover:bg-white/10">‹</button>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}번 슬라이드`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-2 bg-white/40"}`}
            />
          ))}
          <button type="button" aria-label="다음 슬라이드" onClick={() => go(index + 1)} className="grid h-9 w-9 place-items-center rounded-full border border-white/40 hover:bg-white/10">›</button>
        </div>
      </div>
    </section>
  );
}
