import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/courses", "/resources", "/news", "/inquiry"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...courses.map((c) => ({ url: `${site.url}/courses/${c.slug}` })),
  ];
}
