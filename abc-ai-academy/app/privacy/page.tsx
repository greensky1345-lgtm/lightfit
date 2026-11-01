import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "개인정보처리방침" };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="개인정보처리방침" />
      <section className="mx-auto max-w-3xl space-y-4 px-4 py-14 text-sm leading-relaxed text-muted">
        <p>{site.name}(이하 &quot;회사&quot;)는 문의 응대를 위해 아래와 같이 개인정보를 수집·이용합니다.</p>
        <p>수집 항목: 이름, 연락처, 이메일, 기관·회사명</p>
        <p>이용 목적: 교육 문의 응대 및 상담</p>
        <p>보유 기간: 문의 처리 후 1년</p>
        <p>문의: {site.email} / {site.phone}</p>
        <p className="font-semibold text-ink">TODO: 법률 검토를 거친 전문으로 교체하세요.</p>
      </section>
    </>
  );
}
