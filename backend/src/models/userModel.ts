import { pool } from "../db";
import bcrypt from "bcryptjs";

export type UserRole = "user" | "admin";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  created_at?: Date;
  updated_at?: Date;
}

export const UserModel = {
  async create(data: {
    username: string;
    email: string;
    password: string;
    role?: UserRole;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const role = data.role || "user";

    const result = await pool.query(
      `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role, created_at`,
      [data.username, data.email, hashedPassword, role]
    );

    return result.rows[0];
  },

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      `SELECT id, username, email, password, role, created_at, updated_at 
       FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  },

  async findById(id: number): Promise<User | null> {
    const result = await pool.query(
      `SELECT id, username, email, password, role, created_at, updated_at 
       FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },

  async createAdmin(data: {
    username: string;
    email: string;
    password: string;
  }) {
    return this.create({ ...data, role: "admin" });
  },
};
