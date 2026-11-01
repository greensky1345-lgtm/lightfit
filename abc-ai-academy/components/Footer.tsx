import Link from "next/link";
import { nav, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-surface text-sm text-muted">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-semibold text-ink">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/inquiry">단체교육 문의</Link>
          <Link href="/privacy">개인정보처리방침</Link>
        </nav>
        <dl className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
          <div className="flex gap-1"><dt>상호</dt><dd>{site.name}</dd></div>
          <div className="flex gap-1"><dt>대표자</dt><dd>{site.ceo}</dd></div>
          <div className="flex gap-1"><dt>사업자등록번호</dt><dd>{site.bizNo}</dd></div>
          <div className="flex gap-1"><dt>주소</dt><dd>{site.address}</dd></div>
        </dl>
        <dl className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
          <div className="flex gap-1"><dt>연락처</dt><dd><a href={`tel:${site.phone}`}>{site.phone}</a></dd></div>
          <div className="flex gap-1"><dt>이메일</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
        </dl>
        <p className="mt-6">Copyright © {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
