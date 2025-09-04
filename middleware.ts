import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Uncomment and ensure this validates sessions properly

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define route categories
  const publicOnlyRoutes = ["/", "/login", "/register", "/forgot-password"];
  const publicRoutes = ["/api/auth", "/api/health", "/robots.txt", "/sitemap.xml"];
  const protectedRoutes = ["/dashboard", "/profile","/logout", "/settings", "/api/user"];
  
  // Check if current path matches any route pattern
  const isPublicOnlyRoute = publicOnlyRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Get session token from cookies (handle both secure and non-secure)
  const sessionToken = request.cookies.get("__Secure-better-auth.session_token")?.value || 
                      request.cookies.get("better-auth.session_token")?.value;
  
  let session = null;
  let isAuthenticated = false;
  
  // Validate session if token exists
  if (sessionToken) {
    try {
      // Properly validate the session using your auth library
      session = await auth.api.getSession({
        headers: {
          authorization: `Bearer ${sessionToken}`,
          cookie: request.headers.get('cookie') || ''
        }
      });
      
      isAuthenticated = !!session?.user;
    } catch (error) {
      console.error('Session validation error:', error);
      // Invalid session - clear the cookie
      const response = NextResponse.next();
      response.cookies.delete("better-auth.session_token");
      response.cookies.delete("__Secure-better-auth.session_token");
      isAuthenticated = false;
    }
  }
  
  // Create response with security headers
  const createSecureResponse = (response: NextResponse) => {
    // Add security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    
    // Add CSP header with proper font support
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');
    
    response.headers.set('Content-Security-Policy', csp);
    
    return response;
  };
  
  // Handle authenticated users accessing public-only routes
  if (isAuthenticated && isPublicOnlyRoute) {
    const redirectUrl = new URL("/dashboard", request.url);
    return createSecureResponse(NextResponse.redirect(redirectUrl));
  }
  
  // Handle unauthenticated users accessing protected routes
  if (!isAuthenticated && (isProtectedRoute || (!isPublicRoute && !isPublicOnlyRoute))) {
    const loginUrl = new URL("/login", request.url);
    
    // Only add callback URL for non-API routes to avoid issues
    if (!pathname.startsWith('/api/')) {
      loginUrl.searchParams.set("callbackUrl", pathname);
    }
    
    const response = NextResponse.redirect(loginUrl);
    
    // Clear any invalid session cookies
    response.cookies.delete("better-auth.session_token");
    response.cookies.delete("__Secure-better-auth.session_token");
    
    return createSecureResponse(response);
  }
  
  // Allow access to public routes regardless of auth status
  if (isPublicRoute) {
    return createSecureResponse(NextResponse.next());
  }
  
  // Allow access to protected routes for authenticated users
  if (isAuthenticated && isProtectedRoute) {
    return createSecureResponse(NextResponse.next());
  }
  
  // Allow access to public-only routes for unauthenticated users
  if (!isAuthenticated && isPublicOnlyRoute) {
    return createSecureResponse(NextResponse.next());
  }
  
  // Fallback: redirect unknown routes based on auth status
  if (isAuthenticated) {
    return createSecureResponse(NextResponse.redirect(new URL("/dashboard", request.url)));
  } else {
    return createSecureResponse(NextResponse.redirect(new URL("/login", request.url)));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes that don't need auth protection
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. Static files (favicon, robots.txt, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};