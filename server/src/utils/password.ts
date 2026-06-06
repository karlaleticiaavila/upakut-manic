import bcrypt from "bcrypt";
import zxcvbn from "zxcvbn";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

export function isStrongPassword(password: string): boolean {
  const result = zxcvbn(password);
  return result.score >= 3;
}