import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export class AuthController {

static async register(req: Request, res: Response) {
  const client = await pool.connect();

  try {
    const { name, email, password, companyName, bin } = req.body;

    if (!name || !email || !password || !companyName || !bin) {
      return res.status(400).json({ error: "Все поля обязательны" });
    }

    const existingUser = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email уже используется" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await client.query("BEGIN");

    // 1️⃣ создаём компанию
    const companyResult = await client.query(
      `INSERT INTO companies (name, bin)
       VALUES ($1, $2)
       RETURNING id`,
      [companyName, bin]
    );

    const companyId = companyResult.rows[0].id;

    // 2️⃣ создаём пользователя owner
    const userResult = await client.query(
      `INSERT INTO users (name, email, password, company_id, role)
       VALUES ($1, $2, $3, $4, 'owner')
       RETURNING id, email`,
      [name, email, hashedPassword, companyId]
    );

    await client.query(
      `UPDATE companies SET owner_id = $1 WHERE id = $2`,
      [userResult.rows[0].id, companyId]
    );

    await client.query("COMMIT");

    res.status(201).json({ success: true });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  } finally {
    client.release();
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
        {
          id: user.rows[0].id,
          companyId: user.rows[0].company_id,
          role: user.rows[0].role
        },
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