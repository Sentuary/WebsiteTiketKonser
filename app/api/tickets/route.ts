import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { verifyToken, COOKIE_NAME } from "@/lib/jwt";

/**
 * GET /api/tickets
 * Mengambil seluruh tiket milik user yang sedang login.
 */
export async function GET() {
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

    const tickets = await prisma.ticket.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error("GET tickets error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tickets
 * Membuat tiket baru untuk user yang sedang login dengan status default "PENDING".
 */
export async function POST(request: Request) {
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

    const body = await request.json();
    const { concertId, concertName, price } = body;

    if (!concertId || !concertName || price === undefined) {
      return NextResponse.json(
        { error: "Data tiket tidak lengkap" },
        { status: 400 }
      );
    }

    const newTicket = await prisma.ticket.create({
      data: {
        concertId,
        concertName,
        price: Number(price),
        status: "PENDING",
        userId: user.id,
      },
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error("POST ticket error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
