import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["en", "ar"] as const;
const defaultLocale = "en";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    const seg = pathname.split("/")[1];
    if (!locales.includes(seg as any)) {
        const url = req.nextUrl.clone();
        url.pathname = `/${defaultLocale}${pathname}`;
        const res = NextResponse.redirect(url);
        res.cookies.set("NEXT_LOCALE", defaultLocale, { path: "/" });
        return res;
    }

    const res = NextResponse.next();
    res.cookies.set("NEXT_LOCALE", seg, { path: "/" });
    return res;
}

export const config = {
    matcher: ["/((?!_next|.*\\..*).*)"],
};
