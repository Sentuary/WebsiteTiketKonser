"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Halaman Login
 *
 * Menggunakan design system modern berbasis glassmorphism dan gradien warna gelap.
 */
export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Handle Login Submit
   */
  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login gagal");
        return;
      }

      // Redirect ke dashboard setelah login berhasil
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
      <title>Login | Template Login</title>
      
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

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
                   <div className="mb-8 text-center">
           <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Selamat Datang Kembali
          </h1>
          <p className=" text-sm text-center text-slate-800">
            Silakan login untuk mengakses akun Anda
          </p>
        </div>
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Email
              </label>
              <input
                id="login-email"
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
                htmlFor="login-password"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-white/10 bg-white/50 px-4 py-3 text-sm placeholder-slate-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:bg-white/10"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
            >
              {isLoading ? "Memproses..." : "Login"}
            </button>
          </form>

          {/* Footer Card */}
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-900">Belum punya akun? </span>
            <Link
              href="/register"
              className="font-medium text-violet-700 hover:text-blue-600 transition-colors duration-300"
            >
              Daftar sekarang
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
