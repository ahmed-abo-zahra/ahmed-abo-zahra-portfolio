import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ahmedabozahra.me";
  return [
    { url: baseUrl },
    ...projects.map((project) => ({ url: `${baseUrl}/work/${project.slug}` })),
  ];
}
