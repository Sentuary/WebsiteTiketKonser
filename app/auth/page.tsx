"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Halaman Redirect Legacy /auth
 *
 * Mengarahkan user yang tidak sengaja mengakses /auth langsung ke halaman /login.
 */
export default function AuthRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return null;
}
