import { pool } from "../db";

export type DealStatus = "Lead" | "Contacted" | "Proposal" | "InProgress" | "Won" | "Lost";

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

async create(data: any) {
  const {
    title,
    amount,
    status,
    clientId,
    closeDate,
    createdBy,
    assignedTo,
  } = data;

  const result = await pool.query(
    `
    INSERT INTO deals
    (title, amount, status, client_id, close_date, created_by, assigned_to)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING
      id,
      title,
      amount,
      status,
      client_id AS "clientId",
      close_date AS "closeDate",
      created_by AS "createdBy",
      assigned_to AS "assignedTo"
    `,
    [title, amount, status, clientId, closeDate, createdBy, assignedTo]
  );

  return result.rows[0];
},
async updateFull(id: number, data: any) {
  const {
    title,
    amount,
    status,
    clientId,
    closeDate,
    assignedTo,
  } = data;

  const result = await pool.query(
    `
    UPDATE deals
    SET
      title = $2,
      amount = $3,
      status = $4,
      client_id = $5,
      close_date = $6,
      assigned_to = $7
    WHERE id = $1
    RETURNING
      id,
      title,
      amount,
      status,
      client_id AS "clientId",
      close_date AS "closeDate",
      created_by AS "createdBy",
      assigned_to AS "assignedTo"
    `,
    [id, title, amount, status, clientId, closeDate, assignedTo]
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

