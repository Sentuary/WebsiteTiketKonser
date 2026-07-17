"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Halaman Register
 *
 * Menggunakan design system modern berbasis glassmorphism dan gradien warna gelap.
 */
export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * Handle Register Submit
   */
  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validasi sederhana sebelum fetch
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Pendaftaran gagal");
        return;
      }

      // Redirect ke dashboard setelah register berhasil
      router.push("/dashboard");
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main
  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-8"
  style={{
    backgroundImage:
      "url('https://i.pinimg.com/1200x/13/d6/24/13d624efee9651fbc56841050f8c9620.jpg')",
  }}
>
      {/* Dynamic SEO Title */}
      <title>Register | Template Login</title>

      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Buat Akun Baru
          </h1>
          <p className="mt-2 text-sm text-slate-900">
            Lengkapi data diri Anda untuk memulai perjalanan
          </p>
        </div>
            <div>
              <label
                htmlFor="register-name"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Nama Lengkap
              </label>
              <input
                id="register-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full rounded-lg border border-white/10 bg-white/50 px-4 py-3 text-sm placeholder-slate-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:bg-white/10"
              />
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Email
              </label>
              <input
                id="register-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full rounded-lg border border-white/10 bg-white/50 px-4 py-3 text-sm placeholder-slate-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:bg-white/10"
              />
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Password
              </label>
              <input
                id="register-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full rounded-lg border border-white/10 bg-white/50 px-4 py-3 text-sm placeholder-slate-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:bg-white/10"
              />
            </div>

            <div>
              <label
                htmlFor="register-confirm-password"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Konfirmasi Password
              </label>
              <input
                id="register-confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password"
                className="w-full rounded-lg border border-white/10 bg-white/50 px-4 py-3 text-sm placeholder-slate-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:bg-white/10"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
            >
              {isLoading ? "Memproses..." : "Daftar"}
            </button>
          </form>

          {/* Footer Card */}
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-900">Sudah punya akun? </span>
            <Link
              href="/login"
              className="font-medium text-violet-600 hover:text-blue-600 transition-colors duration-300"
            >
              Masuk di sini
            </Link>
          </div>
        </div>

        {/* Footer Page */}
        <p className="mt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Template Login. All rights reserved.
        </p>
      </div>
    </main>
  );
}
