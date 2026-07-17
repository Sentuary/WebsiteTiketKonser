import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken, COOKIE_NAME } from "@/lib/jwt";
import DashboardContent from "./components/DashboardContent";

/**
 * Halaman Dashboard Utama (Server Component)
 *
 * Mengambil session user secara aman di sisi server menggunakan cookies,
 * kemudian mengirimkan informasi user ke Client Component DashboardContent.
 */
export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  // Verifikasi JWT token
  const user = token ? await verifyToken(token) : null;

  // Proteksi Route fallback jika middleware dilewati
  if (!user) {
    redirect("/login");
  }

  return <DashboardContent user={user} />;
}
