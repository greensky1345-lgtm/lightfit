import SectionTitle from "./SectionTitle";
import { reasons } from "@/data/home";
import { site } from "@/data/site";

export default function Reasons() {
  return (
    <section className="bg-surface py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle highlight={site.brand} after="를" second="선택해야 하는 이유" />
        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.no}>
              <p className="font-bold">
                <span className="mr-2 text-brand">{r.no}</span>
                {r.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
