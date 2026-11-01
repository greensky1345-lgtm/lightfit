import Marquee from "./Marquee";
import SectionTitle from "./SectionTitle";
import { partners } from "@/data/home";

export default function Partners() {
  return (
    <section className="py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="공공기관, 기업, 학교와 함께합니다" before="함께한 기관" />
      </div>
      <Marquee
        className="mt-10"
        items={partners.map((p) => (
          <div key={p} className="mx-3 grid h-16 w-44 place-items-center rounded-xl border border-gray-200 text-sm font-semibold text-muted">
            {p}
          </div>
        ))}
      />
    </section>
  );
}
