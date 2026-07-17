import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/password";
import { signToken, COOKIE_NAME } from "@/lib/jwt";

/**
 * POST /api/auth/login
 *
 * Flow:
 * 1. Validasi input (email, password)
 * 2. Cari user berdasarkan email
 * 3. Compare password dengan hash di database
 * 4. Generate JWT token
 * 5. Simpan token ke HttpOnly Cookie
 * 6. Return response sukses
 */

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body: LoginBody = await request.json();
    const { email, password } = body;

    // Validasi: semua field harus diisi
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password harus diisi" },
        { status: 400 }
      );
    }

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Jika user tidak ditemukan
    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await signToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    // Buat response dengan cookie
    const response = NextResponse.json(
      { message: "Login berhasil" },
      { status: 200 }
    );

    // Set HttpOnly Cookie
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 hari dalam detik
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
