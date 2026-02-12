import { Request, Response } from "express";
import { ClientModel } from "../models/clientModel";

export const getClients = async (req: Request, res: Response) => {
  const clients = await ClientModel.getAll();
  res.json(clients);
};

export const createClient = async (req: Request, res: Response) => {
  const client = await ClientModel.create(req.body);
  res.status(201).json(client);
};
