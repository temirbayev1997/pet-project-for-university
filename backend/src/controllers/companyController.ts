import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { pool } from "../db";

export const CompanyController = {
  async getProfile(req: AuthRequest, res: Response) {
    try {
      const companyId = req.user?.companyId;

      const company = await pool.query(
        `SELECT 
            id,
            name,
            logo,
            owner_id AS "ownerId",
            created_at AS "createdAt"
        FROM companies
        WHERE id = $1`,
        [companyId]
        );

      const employees = await pool.query(
        `SELECT id, name, email, role
         FROM users
         WHERE company_id = $1`,
        [companyId]
      );

      res.json({
        company: company.rows[0],
        employees: employees.rows
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch company profile" });
    }
  },

  async updateCompany(req: AuthRequest, res: Response) {
    try {
      const companyId = req.user?.companyId;
      const { name } = req.body;

      const updated = await pool.query(
        `UPDATE companies
         SET name = $2
         WHERE id = $1
         RETURNING id, name`,
        [companyId, name]
      );

      res.json(updated.rows[0]);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update company" });
    }
  }, 
async uploadLogo(req: any, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Файл не загружен" });
    }

    const logoPath = req.file.filename;
    const companyId = req.user?.companyId;

    console.log("Uploading logo:", logoPath, "for company:", companyId);

    await pool.query(
      "UPDATE companies SET logo = $1 WHERE id = $2",
      [logoPath, companyId]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка загрузки" });
  }
}
};