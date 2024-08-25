import bcrypt from "bcrypt";

const saltRounds = 10;

/**
 * Hashes a password using bcrypt.
 *
 * @param password - The password to be hashed.
 * @returns The hashed password.
 */
export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}

/**
 * Compares a plain text password with a hashed password.
 *
 * @param plain - The plain text password to compare.
 * @param hashed - The hashed password to compare against.
 * @returns True if the passwords match, false otherwise.
 */
export function comparePassword(plain: string, hashed: string): boolean {
  return bcrypt.compareSync(plain, hashed);
}
