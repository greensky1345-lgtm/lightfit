import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "학습자료실", description: "수강생에게 드리는 무료 AI 학습 자료입니다." };

export default function ResourcesPage() {
  return (
    <>
      <PageHeader title="학습자료실" desc="프롬프트 모음, 실습 예제 등 무료 자료를 받아 보세요." />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <p className="rounded-2xl bg-surface p-10 text-center text-muted">자료를 준비하고 있습니다. (TODO: 자료 목록 추가)</p>
      </section>
    </>
  );
}
