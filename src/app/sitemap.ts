import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/programs", priority: 0.9 },
  { path: "/industry-connect", priority: 0.8 },
  { path: "/global-career-coaching", priority: 0.8 },
  { path: "/experiential-learning", priority: 0.8 },
  { path: "/for-colleges", priority: 0.9 },
  { path: "/for-students", priority: 0.9 },
  { path: "/contact", priority: 0.7 },
  { path: "/faq", priority: 0.6 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r.path === "/" ? "" : r.path}`,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
