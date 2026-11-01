import Link from "next/link";

export default function FreeBanner() {
  return (
    <section className="bg-sun">
      <Link href="/resources" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-10 text-white">
        <div>
          <p className="text-2xl font-extrabold md:text-3xl">학습자료실에서 무료 자료 받기</p>
          <p className="mt-1 text-white/90">프롬프트 모음, 실습 예제를 무료로 드립니다 →</p>
        </div>
        <span aria-hidden className="hidden text-7xl md:block">🎁</span>
      </Link>
    </section>
  );
}
