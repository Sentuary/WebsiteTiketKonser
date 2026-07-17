import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { verifyToken, COOKIE_NAME } from "@/lib/jwt";

/**
 * DELETE /api/tickets/[id]
 * Menghapus/refund tiket milik user berdasarkan ID tiket.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // Cari tiket untuk memastikan tiket tersebut milik user yang request
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Tiket tidak ditemukan" },
        { status: 404 }
      );
    }

    if (ticket.userId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden: Anda tidak memiliki akses ke tiket ini" },
        { status: 403 }
      );
    }

    // Hapus tiket dari database
    await prisma.ticket.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Tiket berhasil dihapus / direfund" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE ticket error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
