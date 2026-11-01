import Link from "next/link";
import SectionTitle from "./SectionTitle";
import { press } from "@/data/home";
import { site } from "@/data/site";

export default function Press() {
  return (
    <section className="py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle before={`언론이 말하는 ${site.brand}`} />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {press.map((p, i) => (
            <article key={i} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-xs text-muted">{p.date}</p>
              <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
              <p className="mt-3 line-clamp-3 flex-1 text-sm text-muted">{p.excerpt}</p>
              <Link href={p.url} className="mt-5 self-start rounded-md bg-brand px-4 py-2 text-xs font-bold text-white">
                더 보기
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/news" className="inline-block rounded-md bg-surface px-6 py-3 text-sm font-bold hover:bg-gray-200">
            보도자료 더보기
          </Link>
        </div>
      </div>
    </section>
  );
}
