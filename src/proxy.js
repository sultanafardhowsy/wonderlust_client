import { NextResponse } from "next/server";

// Lightweight check: redirect to /login when there's no session cookie.
// Real authorization (incl. admin role) is enforced by the Express API.
export function proxy(request) {
  const hasSession =
    request.cookies.has("better-auth.session_token") ||
    request.cookies.has("__Secure-better-auth.session_token");

  if (!hasSession) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/my-bookings/:path*", "/profile/:path*", "/admin/:path*"],
};
