import { pool } from "../db";

export const ClientModel = {
  async getAll() {
    const result = await pool.query(
      "SELECT * FROM clients WHERE is_archived = FALSE ORDER BY id DESC"
    );
    return result.rows;
  },

  async create(data: any) {
    const { name, phone, email, company, notes } = data;

    const result = await pool.query(
      `INSERT INTO clients (name, phone, email, company, notes)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, phone, email, company, notes]
    );

    return result.rows[0];
  },

  async archive(id: number) {
    await pool.query(
      "UPDATE clients SET is_archived = TRUE WHERE id = $1",
      [id]
    );
  }
};

