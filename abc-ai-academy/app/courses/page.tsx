import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "교육과정",
  description: "생성형 AI 활용, 업무 자동화, 챗봇 제작, 데이터 분석, AI 강사 양성 과정을 소개합니다.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHeader title="교육과정" desc="업무에 바로 쓰는 생성형 AI 실무 과정을 만나 보세요." />
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-14 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <Link
            key={c.slug}
            href={`/courses/${c.slug}`}
            className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <span aria-hidden className="grid h-12 w-12 place-items-center rounded-xl text-2xl" style={{ backgroundColor: `${c.color}22` }}>
              {c.icon}
            </span>
            <h2 className="mt-4 text-lg font-bold">{c.title.replace("\n", " ")}</h2>
            <p className="mt-2 flex-1 text-sm text-muted">{c.summary}</p>
            <p className="mt-4 text-xs font-semibold text-brand">
              {c.format} · {c.duration}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
}
