import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { courses } from "@/data/courses";
import { site } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

const findCourse = (slug: string) => courses.find((c) => c.slug === slug);

export async function generateMetadata(props: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const course = findCourse((await props.params).slug);
  if (!course) return {};
  return { title: course.title.replace("\n", " "), description: course.summary };
}

export default async function CourseDetailPage(props: PageProps<"/courses/[slug]">) {
  const course = findCourse((await props.params).slug);
  if (!course) notFound();
  const title = course.title.replace("\n", " ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title,
    description: course.summary,
    provider: { "@type": "Organization", name: site.name, sameAs: site.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHeader title={title} desc={course.summary} />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1fr_320px]">
        <div>
          <h2 className="text-xl font-bold">커리큘럼</h2>
          <ol className="mt-5 space-y-3">
            {course.curriculum.map((item, i) => (
              <li key={item} className="flex gap-4 rounded-xl bg-surface p-4">
                <span className="font-bold text-brand">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </div>
        <aside className="h-fit rounded-2xl border border-gray-100 p-6 shadow-sm">
          <dl className="space-y-3 text-sm">
            <div><dt className="text-muted">대상</dt><dd className="font-semibold">{course.target}</dd></div>
            <div><dt className="text-muted">기간</dt><dd className="font-semibold">{course.duration}</dd></div>
            <div><dt className="text-muted">방식</dt><dd className="font-semibold">{course.format}</dd></div>
            <div><dt className="text-muted">강사</dt><dd className="font-semibold">{course.instructor}</dd></div>
          </dl>
          <Link
            href={`/inquiry?course=${course.slug}`}
            className="mt-6 block rounded-md bg-brand py-3 text-center font-bold text-white hover:bg-brand-dark"
          >
            수강 신청·문의
          </Link>
        </aside>
      </section>
    </>
  );
}
