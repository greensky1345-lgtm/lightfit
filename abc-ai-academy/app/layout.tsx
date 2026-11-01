import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} | 생성형 AI 실무 교육`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  keywords: ["AI 교육", "생성형 AI 강의", "ChatGPT 교육", "기업 AI 연수", "AI 강사 양성"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: site.brand,
    title: `${site.brand} | 생성형 AI 실무 교육`,
    description: site.description,
  },
  // TODO: 네이버 서치어드바이저 인증 코드
  // verification: { other: { "naver-site-verification": "..." } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.name,
  alternateName: site.brand,
  url: site.url,
  email: site.email,
  telephone: site.phone,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
