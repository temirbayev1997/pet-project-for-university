import { pool } from "../db";

export type DealStatus = "Lead" | "Contacted" | "Proposal" | "Won" | "Lost";

interface DealRow {
  id: number;
  title: string;
  amount: number | null;
  status: DealStatus;
  clientId: number;
  closeDate: string | null;
}

interface CreateDealInput {
  title: string;
  amount?: number;
  status: DealStatus;
  clientId: number;
  closeDate?: string;
}

export const DealModel = {
  async getAll(): Promise<DealRow[]> {
    const result = await pool.query(
      `SELECT
         id,
         title,
         amount,
         status,
         client_id AS "clientId",
         close_date AS "closeDate"
       FROM deals
       ORDER BY id DESC`
    );
    return result.rows;
  },

  async create(data: CreateDealInput): Promise<DealRow> {
    const { title, amount, status, clientId, closeDate } = data;

    const result = await pool.query(
      `INSERT INTO deals (title, amount, status, client_id, close_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING
         id,
         title,
         amount,
         status,
         client_id AS "clientId",
         close_date AS "closeDate"`,
      [title, amount ?? null, status, clientId, closeDate ?? null]
    );

    return result.rows[0];
  },

  async updateStatus(id: number, status: DealStatus): Promise<DealRow | null> {
    const result = await pool.query(
      `UPDATE deals
       SET status = $2
       WHERE id = $1
       RETURNING
         id,
         title,
         amount,
         status,
         client_id AS "clientId",
         close_date AS "closeDate"`,
      [id, status]
    );

    return result.rows[0] ?? null;
  },
};

