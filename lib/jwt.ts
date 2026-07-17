import { SignJWT, jwtVerify } from "jose";

/**
 * JWT Utility
 *
 * Menggunakan library 'jose' karena kompatibel dengan Edge Runtime Next.js.
 * Library 'jsonwebtoken' TIDAK bisa digunakan di middleware Next.js
 * karena middleware berjalan di Edge Runtime.
 */

/**
 * Interface untuk JWT Payload
 * Berisi informasi user yang akan disimpan di dalam token
 */
export interface JwtPayload {
  id: string;
  name: string;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "auth-token";
const EXPIRE_TIME = "7d"; // Token expire dalam 7 hari

/**
 * Encode JWT_SECRET menjadi Uint8Array
 * jose membutuhkan key dalam format Uint8Array
 */
function getSecretKey(): Uint8Array {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET belum di-set di environment variables");
  }
  return new TextEncoder().encode(JWT_SECRET);
}

/**
 * Generate JWT Token
 * @param payload - Data user yang akan disimpan di token
 * @returns JWT token string
 */
export async function signToken(payload: JwtPayload): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRE_TIME)
    .sign(getSecretKey());

  return token;
}

/**
 * Verify dan decode JWT Token
 * @param token - JWT token string
 * @returns Payload jika valid, null jika tidak valid
 */
export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * Nama cookie yang digunakan untuk menyimpan JWT
 * Di-export agar bisa digunakan di API routes dan middleware
 */
export { COOKIE_NAME };
