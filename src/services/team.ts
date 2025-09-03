import { http } from "./http";
import { strapiUrl } from "./strapi";
export async function fetchTeam() { return http<any>(strapiUrl("/teams?populate=*")); }
