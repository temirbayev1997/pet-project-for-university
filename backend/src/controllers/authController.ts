import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export class AuthController {

  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Все поля обязательны" });
      }

      const existingUser = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: "Email уже используется" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email",
        [name, email, hashedPassword]
      );

      res.status(201).json(result.rows[0]);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Registration failed" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email и пароль обязательны" });
      }

      const user = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (user.rows.length === 0) {
        return res.status(400).json({ error: "Неверный email или пароль" });
      }

      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      if (!validPassword) {
        return res.status(400).json({ error: "Неверный email или пароль" });
      }

      const token = jwt.sign(
        { id: user.rows[0].id },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        token,
        user: {
          id: user.rows[0].id,
          name: user.rows[0].name,
          email: user.rows[0].email,
        }
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Login failed" });
    }
  }
}