import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken, COOKIE_NAME } from "@/lib/jwt";
import CheckoutShell from "./components/CheckoutShell";

/**
 * Halaman Rincian List Tiket Checkout (Server Component)
 *
 * Mengamankan akses halaman di sisi server menggunakan token JWT cookies,
 * lalu merender CheckoutShell client component dengan data nama user.
 */
export default async function TicketListPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  // Verifikasi JWT token
  const user = token ? await verifyToken(token) : null;

  // Proteksi Route fallback
  if (!user) {
    redirect("/login");
  }

  return <CheckoutShell userName={user.name} />;
}
