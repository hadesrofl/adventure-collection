import { NextRequest } from "next/server";
import { internalizationMiddleware } from "./internationalizationMiddleware";

export function middleware(request: NextRequest) {
  return internalizationMiddleware(request);
}

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
