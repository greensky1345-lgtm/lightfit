"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        overHero ? "bg-transparent text-white" : "bg-white/95 text-ink shadow-sm backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 whitespace-nowrap text-base font-extrabold md:text-lg">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-sm text-white">AI</span>
          {site.brand}
        </Link>

        <nav className="hidden items-center gap-8 text-[15px] font-semibold md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/inquiry"
            className={`whitespace-nowrap rounded-md px-3 py-2 text-xs font-bold md:px-4 md:text-sm ${
              overHero ? "bg-white text-ink hover:bg-white/90" : "bg-brand text-white hover:bg-brand-dark"
            }`}
          >
            단체교육 문의
          </Link>
          <button
            type="button"
            className="p-2 md:hidden"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block py-3 font-semibold">
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
