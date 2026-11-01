import SectionTitle from "./SectionTitle";
import { reviews } from "@/data/home";

export default function Reviews() {
  return (
    <section className="bg-lavender py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle before="수강생들의 생생한 후기" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <article key={i} className="flex flex-col rounded-2xl bg-white p-7 shadow-sm">
              <h3 className="font-bold leading-snug">
                {r.title1}
                <br />
                <span className="text-brand">{r.title2}</span>
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{r.body}</p>
              <div className="mt-6 flex items-center justify-between text-xs text-muted">
                <span>
                  {r.cohort} | {r.name}
                </span>
                <span className="text-brand" aria-label={`별점 ${r.rating}점`}>
                  {"★".repeat(r.rating)}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
