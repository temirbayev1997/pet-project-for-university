import { Request, Response } from "express";
import { ClientModel } from "../models/clientModel";
import { pool } from "../db";

export const getClients = async (req: Request, res: Response) => {
  const clients = await ClientModel.getAll();
  res.json(clients);
};

export const createClient = async (req: Request, res: Response) => {
  const client = await ClientModel.create(req.body);
  res.status(201).json(client);
};
export const archiveClient = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "ID обязателен" });
  }

  await ClientModel.archive(id);

  res.json({ message: "Клиент архивирован" });
};
export const updateClient = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const updated = await ClientModel.update(id, req.body);

  if (!updated) {
    return res.status(404).json({ message: "Клиент не найден" });
  }

  res.json(updated);
};
export const getClientsWithTelegram = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM clients WHERE telegram_chat_id IS NOT NULL"
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};