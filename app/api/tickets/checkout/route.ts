import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { verifyToken, COOKIE_NAME } from "@/lib/jwt";

/**
 * POST /api/tickets/checkout
 * Mengubah status semua tiket "PENDING" milik user yang login menjadi "PAID" (Lunas).
 */
export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    const user = token ? await verifyToken(token) : null;

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Update semua tiket PENDING milik user menjadi PAID
    const updateResult = await prisma.ticket.updateMany({
      where: {
        userId: user.id,
        status: "PENDING",
      },
      data: {
        status: "PAID",
      },
    });

    return NextResponse.json(
      {
        message: "Checkout berhasil, status tiket telah diupdate menjadi Lunas",
        count: updateResult.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Checkout POST error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
