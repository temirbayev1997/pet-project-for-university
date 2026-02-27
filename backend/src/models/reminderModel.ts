import { pool } from "../db";

export interface ReminderRow {
  id: number;
  title: string;
  description: string | null;
  remindAt: string;
  isDone: boolean;
  clientId: number | null;
  dealId: number | null;
  createdAt: string;
}

export const ReminderModel = {
async getAll(userId: number): Promise<ReminderRow[]> {
  const result = await pool.query(
    `
    SELECT
      id,
      title,
      description,
      remind_at AS "remindAt",
      is_done AS "isDone",
      client_id AS "clientId",
      deal_id AS "dealId",
      created_at AS "createdAt"
    FROM reminders
    WHERE user_id = $1
    ORDER BY remind_at ASC
    `,
    [userId] // ← ВОТ ЭТОГО НЕ ХВАТАЛО
  );

  return result.rows;
}, 

async create(data: any, userId: number): Promise<ReminderRow> {
  const { title, description, remindAt, clientId, dealId } = data;

  const result = await pool.query(
    `
    INSERT INTO reminders
    (title, description, remind_at, client_id, deal_id, user_id)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING
      id,
      title,
      description,
      remind_at AS "remindAt",
      is_done AS "isDone",
      client_id AS "clientId",
      deal_id AS "dealId",
      created_at AS "createdAt"
    `,
    [
      title,
      description ?? null,
      remindAt,
      clientId ?? null,
      dealId ?? null,
      userId
    ]
  );

  return result.rows[0];
}, 

  async updateStatus(id: number, isDone: boolean) {
    await pool.query(
      `UPDATE reminders SET is_done = $2 WHERE id = $1`,
      [id, isDone]
    );
  },

  async delete(id: number) {
    await pool.query(`DELETE FROM reminders WHERE id = $1`, [id]);
  },
  async update(id: number, data: any): Promise<ReminderRow> {
  const { title, description, remindAt, clientId, dealId } = data;

  const result = await pool.query(
    `
    UPDATE reminders
    SET
      title = $2,
      description = $3,
      remind_at = $4,
      client_id = $5,
      deal_id = $6
    WHERE id = $1
    RETURNING
      id,
      title,
      description,
      remind_at AS "remindAt",
      is_done AS "isDone",
      client_id AS "clientId",
      deal_id AS "dealId",
      created_at AS "createdAt"
    `,
    [
      id,
      title,
      description ?? null,
      remindAt,
      clientId ?? null,
      dealId ?? null,
    ]
  );

  return result.rows[0];
}
};
