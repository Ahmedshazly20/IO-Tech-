const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/api";
export const strapiUrl = (path: string) => `${API_URL}${path}`;
