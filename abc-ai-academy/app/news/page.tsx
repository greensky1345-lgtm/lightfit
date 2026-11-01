import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { press } from "@/data/home";

export const metadata: Metadata = { title: "출간 및 뉴스", description: "출간 도서와 언론 보도 소식입니다." };

export default function NewsPage() {
  return (
    <>
      <PageHeader title="출간 및 뉴스" desc="출간 도서와 언론 보도 소식을 전합니다." />
      <section className="mx-auto max-w-3xl divide-y divide-gray-100 px-4 py-14">
        {press.map((p, i) => (
          <article key={i} className="py-6">
            <p className="text-xs text-muted">{p.date}</p>
            <h2 className="mt-1 text-lg font-bold">{p.title}</h2>
            <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
          </article>
        ))}
      </section>
    </>
  );
}
