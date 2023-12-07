import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("token");

  if (request.nextUrl.pathname.startsWith("/login") && cookie) {
    return NextResponse.redirect("/space");
  }

  if (request.nextUrl.pathname.startsWith("/space") && !cookie) {
    return NextResponse.redirect("/login");
  }

  return NextResponse.next();
}
