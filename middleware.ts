import { NextRequest, NextResponse } from "next/server";

// Generate a random nonce for each request using Web Crypto API
function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, Array.from(array)));
}

// Build CSP header with nonce
function buildCSPHeader(nonce: string): string {
  // In development, Next.js uses eval for hot reloading
  const isDev = process.env.NODE_ENV !== 'production';

  return `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' ${isDev ? "'unsafe-eval'" : "'strict-dynamic'"} https://apis.google.com;
    style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https://raw.githubusercontent.com/AndyAshley/dev-portfolio-posts/;
    connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://raw.githubusercontent.com/AndyAshley/dev-portfolio-posts/ ${isDev ? 'ws: wss:' : ''};
    frame-src 'none';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
  `.replace(/\s+/g, " ").trim();
}

export function middleware(req: NextRequest) {
  // Generate a unique nonce for this request
  const nonce = generateNonce();

  // Clone the request headers and add the nonce
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-nonce', nonce);

  // Create response with modified request headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set the nonce in response headers as well
  response.headers.set('x-nonce', nonce);

  // Add security headers with nonce
  response.headers.set('Content-Security-Policy', buildCSPHeader(nonce));

  // Additional security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all request paths except static files, images, and NextAuth API routes
    '/((?!_next/static|_next/image|favicon.ico|images|fonts|api/auth).*)',
  ],
};