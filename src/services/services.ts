import { http } from "./http";
import { strapiUrl } from "./strapi";
export async function fetchServices() { return http<any>(strapiUrl("/services?populate=*")); }
