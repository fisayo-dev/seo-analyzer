import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Route categories
  const publicOnlyRoutes = ["/", "/login", "/register", "/forgot-password"];
  const publicRoutes = ["/api/auth", "/api/health", "/robots.txt", "/sitemap.xml"];
  const protectedRoutes = ["/dashboard", "/profile", "/logout", "/settings", "/api/user"];

  // Check if current path matches any route pattern
  const isPublicOnlyRoute = publicOnlyRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Get session cookie (but don’t validate here in Edge runtime)
  const sessionToken =
    request.cookies.get("__Secure-better-auth.session_token")?.value ||
    request.cookies.get("better-auth.session_token")?.value;

  const isAuthenticated = !!sessionToken; // trust cookie existence in Edge

  // Add common security headers
  const createSecureResponse = (response: NextResponse) => {
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("X-XSS-Protection", "1; mode=block");

    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    response.headers.set("Content-Security-Policy", csp);

    return response;
  };

  // Authenticated users hitting public-only routes → redirect to dashboard
  if (isAuthenticated && isPublicOnlyRoute) {
    return createSecureResponse(
      NextResponse.redirect(new URL("/dashboard", request.url))
    );
  }

  // Unauthenticated users hitting protected routes → redirect to login
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);

    if (!pathname.startsWith("/api/")) {
      loginUrl.searchParams.set("callbackUrl", pathname);
    }

    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("better-auth.session_token");
    response.cookies.delete("__Secure-better-auth.session_token");

    return createSecureResponse(response);
  }

  // Public routes → always allowed
  if (isPublicRoute) {
    return createSecureResponse(NextResponse.next());
  }

  // Protected routes with valid cookie → allowed
  if (isAuthenticated && isProtectedRoute) {
    return createSecureResponse(NextResponse.next());
  }

  // Public-only routes with no cookie → allowed
  if (!isAuthenticated && isPublicOnlyRoute) {
    return createSecureResponse(NextResponse.next());
  }

  // Fallbacks
  if (isAuthenticated) {
    return createSecureResponse(
      NextResponse.redirect(new URL("/dashboard", request.url))
    );
  } else {
    return createSecureResponse(
      NextResponse.redirect(new URL("/login", request.url))
    );
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
