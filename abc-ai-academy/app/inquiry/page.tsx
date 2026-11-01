import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import InquiryForm from "./InquiryForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "단체교육 문의",
  description: "기업·기관 맞춤형 AI 단체연수와 수강 문의를 남겨 주세요.",
};

export default async function InquiryPage(props: PageProps<"/inquiry">) {
  const { course } = await props.searchParams;
  return (
    <>
      <PageHeader title="단체교육 문의" desc="기업·기관 맞춤 연수, 수강 신청 관련 문의를 남겨 주세요." />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1fr_300px]">
        <InquiryForm defaultCourse={typeof course === "string" ? course : undefined} />
        <aside className="h-fit rounded-2xl bg-surface p-6 text-sm">
          <p className="font-bold">바로 연락하기</p>
          <p className="mt-4 text-muted">전화</p>
          <a href={`tel:${site.phone}`} className="text-lg font-bold text-brand">{site.phone}</a>
          <p className="mt-4 text-muted">이메일</p>
          <a href={`mailto:${site.email}`} className="text-lg font-bold text-brand">{site.email}</a>
        </aside>
      </section>
    </>
  );
}
