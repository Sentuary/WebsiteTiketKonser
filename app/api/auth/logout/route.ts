import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/jwt";

/**
 * POST /api/auth/logout
 *
 * Menghapus JWT cookie untuk logout user.
 * Set cookie dengan maxAge 0 agar langsung expired.
 */
export async function POST() {
  const response = NextResponse.json(
    { message: "Logout berhasil" },
    { status: 200 }
  );

  // Hapus cookie dengan set maxAge = 0
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
