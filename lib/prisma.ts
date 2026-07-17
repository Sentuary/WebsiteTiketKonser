import { PrismaClient } from "@prisma/client";

/**
 * Prisma Client Singleton
 *
 * Pada Next.js development mode, hot reload menyebabkan file dieksekusi ulang.
 * Tanpa singleton, setiap reload akan membuat koneksi database baru.
 * Pattern ini menyimpan instance Prisma di globalThis agar bisa di-reuse.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
