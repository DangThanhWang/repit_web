// middleware.ts - Performance optimization
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 🚀 Cache headers for static assets
const staticAssets = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2'];

function isStaticAsset(pathname: string) {
  return staticAssets.some(ext => pathname.endsWith(ext));
}

// 🚀 Performance middleware
export default withAuth(
  function middleware(req: NextRequest) {
    const response = NextResponse.next();
    
    // 🚀 Add performance headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // 🚀 Cache static assets
    if (isStaticAsset(req.nextUrl.pathname)) {
      response.headers.set(
        'Cache-Control',
        'public, max-age=31536000, immutable'
      );
    }
    
    // 🚀 Cache API routes with shorter TTL
    if (req.nextUrl.pathname.startsWith('/api/')) {
      // Don't cache auth endpoints
      if (req.nextUrl.pathname.includes('/auth/')) {
        response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      } else {
        response.headers.set('Cache-Control', 'public, max-age=300'); // 5 minutes
      }
    }
    
    // 🚀 Preload critical resources
    if (req.nextUrl.pathname === '/dashboard') {
      response.headers.set(
        'Link',
        '</api/auth/session>; rel=preload; as=fetch'
      );
    }
    
    return response;
  },
  {
    callbacks: {
      // 🚀 Optimize auth check - only for protected routes
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Public routes
        const publicRoutes = ['/', '/auth/login', '/auth/register', '/about', '/contact'];
        if (publicRoutes.includes(pathname)) {
          return true;
        }
        
        // Protected routes require token
        return !!token;
      },
    },
  }
);

// 🚀 Configure matcher for performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};