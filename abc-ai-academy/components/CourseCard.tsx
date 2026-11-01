import Link from "next/link";
import type { Course } from "@/data/courses";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="relative flex aspect-square w-56 shrink-0 snap-start flex-col justify-between overflow-hidden rounded-xl p-5 text-white transition-transform hover:-translate-y-1 md:w-64"
      style={{ backgroundColor: course.color }}
    >
      <span className="self-end rounded-full bg-white px-3 py-1 text-xs font-bold text-ink">{course.instructor}</span>
      <span aria-hidden className="absolute -left-2 bottom-4 text-7xl opacity-90">{course.icon}</span>
      <h3 className="self-end whitespace-pre-line text-right text-xl font-extrabold leading-snug">{course.title}</h3>
    </Link>
  );
}
