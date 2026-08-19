import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/src/shared/infrastructure/i18n/routing";

const intlMiddleware = createMiddleware(routing);
const supportedLocales: readonly string[] = routing.locales;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en/home", request.url), 308);
  }

  if (segments.length < 3) {
    const localeHome = supportedLocales.includes(maybeLocale)
      ? `/${maybeLocale}/home`
      : "/en/home";

    return NextResponse.redirect(new URL(localeHome, request.url), 308);
  }

  if (maybeLocale && !supportedLocales.includes(maybeLocale)) {
    return NextResponse.redirect(new URL("/en/home", request.url), 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
