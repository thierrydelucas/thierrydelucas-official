import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/src/shared/infrastructure/i18n/routing";

const intlMiddleware = createMiddleware(routing);
const supportedLocales: readonly string[] = routing.locales;

const ICON_PATHS = new Set([
  "/favicon.ico",
  "/icon-192.png",
  "/apple-touch-icon.png",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (ICON_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/.well-known")) {
    return new NextResponse(null, { status: 404 });
  }

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
  matcher: ["/((?!api|_next|.*\\..*).*)", "/.well-known/:path*"],
};
