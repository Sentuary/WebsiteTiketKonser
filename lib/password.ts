import bcrypt from "bcryptjs";

/**
 * Password Utility
 *
 * Menggunakan bcryptjs untuk hashing dan comparing password.
 * Salt rounds = 10 (standar yang aman dan cukup cepat).
 */

const SALT_ROUNDS = 10;

/**
 * Hash password menggunakan bcrypt
 * @param password - Password plain text dari user
 * @returns Password yang sudah di-hash
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare password plain text dengan hash
 * @param password - Password plain text dari user
 * @param hashedPassword - Password hash dari database
 * @returns true jika cocok, false jika tidak
 */
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
