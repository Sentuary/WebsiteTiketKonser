import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { signToken, COOKIE_NAME } from "@/lib/jwt";

/**
 * POST /api/auth/register
 *
 * Flow:
 * 1. Validasi input (name, email, password)
 * 2. Cek apakah email sudah terdaftar
 * 3. Hash password menggunakan bcrypt
 * 4. Simpan user baru ke database
 * 5. Generate JWT token
 * 6. Simpan token ke HttpOnly Cookie
 * 7. Return response sukses
 */

interface RegisterBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function POST(request: Request) {
  try {
    const body: RegisterBody = await request.json();
    const { name, email, password, confirmPassword } = body;

    // Validasi: semua field harus diisi
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    // Validasi: format email sederhana
    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Validasi: password minimal 6 karakter
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password minimal 6 karakter" },
        { status: 400 }
      );
    }

    // Validasi: password dan konfirmasi harus sama
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Password dan konfirmasi password tidak cocok" },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Simpan user baru ke database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = await signToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    // Buat response dengan cookie
    const response = NextResponse.json(
      { message: "Register berhasil" },
      { status: 201 }
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
