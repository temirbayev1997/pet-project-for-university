import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { pool } from "../db";
import bcrypt from "bcrypt";

export const UserController = {

  async getProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;

      const user = await pool.query(
        `SELECT id, name, email, role, company_id
         FROM users
         WHERE id = $1`,
        [userId]
      );

      res.json({ user: user.rows[0] });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Ошибка получения профиля" });
    }
  },

  async updateProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const { name, email } = req.body;

      const updated = await pool.query(
        `UPDATE users
         SET name = $2, email = $3
         WHERE id = $1
         RETURNING id, name, email`,
        [userId, name, email]
      );

      res.json(updated.rows[0]);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Ошибка обновления профиля" });
    }
  },

  async changePassword(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const { oldPassword, newPassword } = req.body;

      const user = await pool.query(
        "SELECT password FROM users WHERE id = $1",
        [userId]
      );

      const valid = await bcrypt.compare(
        oldPassword,
        user.rows[0].password
      );

      if (!valid) {
        return res.status(400).json({ error: "Неверный старый пароль" });
      }

      const hashed = await bcrypt.hash(newPassword, 10);

      await pool.query(
        "UPDATE users SET password = $2 WHERE id = $1",
        [userId, hashed]
      );

      res.json({ success: true });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Ошибка смены пароля" });
    }
  }
};