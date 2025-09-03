export function useRtl(locale: "en" | "ar") {
    return locale === "ar" ? "rtl" : "ltr";
}
