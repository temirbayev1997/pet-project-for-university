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
async getAllByUser(userId: number): Promise<DealRow[]> {
  const result = await pool.query(
    `
    SELECT
      id,
      title,
      amount,
      status,
      client_id AS "clientId",
      close_date AS "closeDate"
    FROM deals
    WHERE created_by = $1
    ORDER BY id DESC
    `,
    [userId]
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
async updateFull(id: number, userId: number, data: any) {
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
    title = $3,
    amount = $4,
    status = $5,
    client_id = $6,
    close_date = $7,
    assigned_to = $8
  WHERE id = $1 AND created_by = $2
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
  [id, userId, title, amount, status, clientId, closeDate, assignedTo]
);

  return result.rows[0];
},
  async updateStatus(id: number, userId: number, status: DealStatus): Promise<DealRow | null> {
const result = await pool.query(
  `
  UPDATE deals
  SET status = $3
  WHERE id = $1 AND created_by = $2
  RETURNING
    id,
    title,
    amount,
    status,
    client_id AS "clientId",
    close_date AS "closeDate"
  `,
  [id, userId, status]
);

    return result.rows[0] ?? null;
  },
};

