import SectionTitle from "./SectionTitle";
import { stats } from "@/data/home";

export default function Stats() {
  return (
    <section className="bg-surface py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="현업 실무 경험을 갖춘 강사진이 직접 강의합니다"
          highlight="진짜 실무 전문가"
          after="와 함께"
          second="AI 활용 능력을 키워 보세요"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold text-muted">{s.label}</p>
              <p className="mt-4 text-3xl font-extrabold text-brand md:text-4xl">
                {s.value}
                {s.suffix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
