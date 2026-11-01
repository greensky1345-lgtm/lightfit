import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { reasons } from "@/data/home";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "소개", description: `${site.name}의 AI 교육을 소개합니다.` };

export default function AboutPage() {
  return (
    <>
      <PageHeader title="소개" desc={`${site.name}는 누구나 업무에 AI를 쓸 수 있도록 돕습니다.`} />
      <section className="mx-auto max-w-3xl px-4 py-14 leading-relaxed">
        <h2 className="text-2xl font-bold">인사말</h2>
        <p className="mt-4 text-muted">TODO: 대표 인사말을 입력하세요.</p>
        <h2 className="mt-12 text-2xl font-bold">우리가 하는 일</h2>
        <ul className="mt-4 space-y-3">
          {reasons.map((r) => (
            <li key={r.no}><strong>{r.title}</strong> – <span className="text-muted">{r.desc}</span></li>
          ))}
        </ul>
        <h2 className="mt-12 text-2xl font-bold">강사진</h2>
        <p className="mt-4 text-muted">TODO: 강사 사진과 경력을 입력하세요.</p>
        <Link href="/inquiry" className="mt-12 inline-block rounded-md bg-brand px-6 py-3 font-bold text-white">단체교육 문의하기</Link>
      </section>
    </>
  );
}
