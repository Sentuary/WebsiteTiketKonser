import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/jwt";

/**
 * Next.js Middleware untuk Proteksi Route
 *
 * Middleware ini berjalan di Edge Runtime sebelum request selesai diproses.
 * Berfungsi untuk membatasi akses halaman berdasarkan status login user (JWT token).
 */

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const token = cookies.get(COOKIE_NAME)?.value;

  // Lakukan verifikasi token JWT
  const payload = token ? await verifyToken(token) : null;
  const isLoggedIn = !!payload;

  const isAuthPage =
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register");
  const isDashboardPage =
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/ticket-list");

  // Kasus 1: User belum login dan mencoba mengakses halaman terproteksi (Dashboard / Ticket-list)
  if (isDashboardPage && !isLoggedIn) {
    // Redirect ke halaman login
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Kasus 2: User sudah login dan mencoba mengakses halaman login/register kembali
  if (isAuthPage && isLoggedIn) {
    // Redirect ke halaman dashboard
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Lanjutkan request jika tidak melanggar aturan di atas
  return NextResponse.next();
}

/**
 * Konfigurasi matchers untuk membatasi route mana saja yang memicu middleware.
 * Di sini kita mencocokkan halaman /dashboard, /ticket-list, /login, dan /register.
 */
export const config = {
  matcher: ["/dashboard/:path*", "/ticket-list", "/login", "/register"],
};
