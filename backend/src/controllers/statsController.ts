import { pool } from "../db";
import { Request, Response } from "express";

export const getStats = async (req: Request, res: Response) => {
  try {
    const clients = await pool.query(
      "SELECT COUNT(*) FROM clients WHERE is_archived = FALSE"
    );

    const activeDeals = await pool.query(
      "SELECT COUNT(*) FROM deals WHERE status NOT IN ('Won','Lost')"
    );

    const wonDeals = await pool.query(
      "SELECT COUNT(*) FROM deals WHERE status = 'Won'"
    );

    const overdueReminders = await pool.query(
      "SELECT COUNT(*) FROM reminders WHERE remind_at < NOW() AND is_done = FALSE"
    );
    const dealsByStatus = await pool.query(`
        SELECT status, COUNT(*) as count
        FROM deals
        GROUP BY status
        `);

        const dealsByMonth = await pool.query(`
        SELECT 
            TO_CHAR(created_at, 'YYYY-MM') as month,
            COUNT(*) as count
        FROM deals
        GROUP BY month
        ORDER BY month
    `);
    res.json({
      clients: Number(clients.rows[0].count),
      activeDeals: Number(activeDeals.rows[0].count),
      wonDeals: Number(wonDeals.rows[0].count),
      overdueReminders: Number(overdueReminders.rows[0].count),
      dealsByStatus: dealsByStatus.rows,
      dealsByMonth: dealsByMonth.rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};
