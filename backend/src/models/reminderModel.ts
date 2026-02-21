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
  async getAll(): Promise<ReminderRow[]> {
    const result = await pool.query(`
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
      ORDER BY remind_at ASC
    `);

    return result.rows;
  },

  async create(data: any): Promise<ReminderRow> {
    const { title, description, remindAt, clientId, dealId } = data;

    const result = await pool.query(
      `
      INSERT INTO reminders
      (title, description, remind_at, client_id, deal_id)
      VALUES ($1,$2,$3,$4,$5)
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
};