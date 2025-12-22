import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const signUp = async (payload: Record<string, unknown>) => {
  const name = payload.name as string;
  const email = payload.email as string;
  const password = payload.password as string;
  const role = payload.role as string;
  const phone = payload.phone as string;

  // 1. Required fields check ✅
  if (!name || !email || !password || !role || !phone) {
    throw new Error("All fields are required");
  }

  // 2. Type validation ✅
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof role !== "string" ||
    typeof phone !== "string"
  ) {
    throw new Error("Invalid input type");
  }

  // 3. Email lowercase check
  if (email !== email.toLowerCase()) {
    throw new Error("Email must be lowercase");
  }

  // 4. Password length
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  // 5. Check existing user
  const existingUser = await pool.query(
    `SELECT id FROM users WHERE email = $1`,
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("User already exists with this email");
  }

  // 6. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 7. Insert user
  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, role, phone)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, role, phone
    `,
    [name, email, hashedPassword, role, phone]
  );

  return result.rows[0];
};

export const authServices = {
  signUp,
};
