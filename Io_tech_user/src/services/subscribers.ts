import { http } from "./http";
import { strapiUrl } from "./strapi";
export async function subscribeEmail(email: string) { return http<any>(strapiUrl("/subscribers"), { method: "POST", body: JSON.stringify({ data: { email } }) }); }
