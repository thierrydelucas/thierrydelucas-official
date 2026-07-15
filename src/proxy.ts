import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const supportedLocales = ["en", "pt"];

const intlMiddleware = createMiddleware({
  locales: supportedLocales,
  defaultLocale: "en",
});

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (pathname === "/" || segments.length < 3) {
    return NextResponse.redirect(new URL("/en/home", request.url));
  }

  if (maybeLocale && !supportedLocales.includes(maybeLocale)) {
    return NextResponse.redirect(new URL(`/en/home`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
