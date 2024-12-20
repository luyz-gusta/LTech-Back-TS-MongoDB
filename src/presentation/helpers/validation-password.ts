import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export function keyHash(key: string, salt?: string): string {
  if (!salt) {
    salt = randomBytes(16).toString("hex");
  }
  const hashKey = scryptSync(key, salt, 64).toString("hex");
  return salt + hashKey;
}

export function comparePasswords(
  storedPassword: string,
  suppliedPassword: string
): boolean {
  const salt = storedPassword.slice(0, 32);
  const hash = storedPassword.slice(32);
  const hashedSuppliedPassword = keyHash(suppliedPassword, salt).slice(32);

  return timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(hashedSuppliedPassword, "hex")
  );
}
