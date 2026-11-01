"use client";

import Link from "next/link";
import { useRef } from "react";
import CourseCard from "./CourseCard";
import { courses } from "@/data/courses";

export default function CourseSlider() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <section className="bg-dark py-14 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-bold leading-snug md:text-4xl">
          문서 작성부터 데이터 분석까지
          <br />
          <span className="text-brand">생성형 AI</span>와 함께
          <br />
          업무 시간은 줄이고, 성과는 높이고
        </h2>

        <div className="relative mt-12">
          <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {courses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
          <button type="button" aria-label="이전 과정" onClick={() => scroll(-1)} className="absolute -left-12 top-1/2 hidden -translate-y-1/2 text-3xl text-white/70 hover:text-white lg:block">‹</button>
          <button type="button" aria-label="다음 과정" onClick={() => scroll(1)} className="absolute -right-12 top-1/2 hidden -translate-y-1/2 text-3xl text-white/70 hover:text-white lg:block">›</button>
        </div>

        <div className="mt-10 text-center">
          <Link href="/courses" className="inline-block rounded-md bg-brand px-6 py-3 text-sm font-bold hover:bg-brand-dark">
            수강신청 바로가기
          </Link>
        </div>
      </div>
    </section>
  );
}
