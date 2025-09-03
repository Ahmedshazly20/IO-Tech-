export const formatDate = (d: string | number | Date, locale = "en") =>
    new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US").format(new Date(d));
