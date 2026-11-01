import HeroSlider from "@/components/HeroSlider";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Partners from "@/components/Partners";
import Reasons from "@/components/Reasons";
import CourseSlider from "@/components/CourseSlider";
import FreeBanner from "@/components/FreeBanner";
import Reviews from "@/components/Reviews";
import Press from "@/components/Press";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Marquee
        className="bg-surface py-3"
        items={Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="px-4 text-2xl font-light tracking-tight text-gray-300 md:text-3xl">{site.brandEn}</span>
        ))}
      />
      <Stats />
      <Partners />
      <Reasons />
      <CourseSlider />
      <FreeBanner />
      <Reviews />
      <Press />
    </>
  );
}
