import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { defaultLocale, locales } from "@dictionaries/helpers/locales";

export function getUserLanguage() {
  const acceptedLanguage = headers().get("accept-language");
  return getLocale(acceptedLanguage === null ? undefined : acceptedLanguage);
}

function getLocaleFromRequest(request: Request) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  return getLocale(acceptedLanguage);
}

function getLocale(acceptedLanguage: string | undefined) {
  const headers = { "accept-language": acceptedLanguage };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export function internalizationMiddleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname, href } = request.nextUrl;
  const hrefPath = href.replace(
    `${request.nextUrl.protocol}//${request.nextUrl.host}`,
    ""
  );
  const pathnameHasLocale = locales.some(
    (locale) =>
      hrefPath.startsWith(`${request.nextUrl.basePath}/${locale}/`) ||
      hrefPath === `${request.nextUrl.basePath}/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocaleFromRequest(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}
