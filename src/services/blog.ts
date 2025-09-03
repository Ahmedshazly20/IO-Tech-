import { http } from "./http";
import { strapiUrl } from "./strapi";
export async function fetchBlogList() { return http<any>(strapiUrl("/blogs?populate=*")); }
export async function fetchBlogBySlug(slug: string) { return http<any>(strapiUrl(`/blogs?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`)); }
