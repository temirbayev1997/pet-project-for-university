import { Request, Response } from "express";
import { DealModel, DealStatus } from "../models/dealModel";

export const getDeals = async (req: Request, res: Response) => {
  const deals = await DealModel.getAll();
  res.json(deals);
};

export const createDeal = async (req: Request, res: Response) => {
  const { title, amount, status, clientId, closeDate } = req.body;

  if (!title || !status) {
    return res
      .status(400)
      .json({ message: "title, status и clientId обязательны" });
  }

  const deal = await DealModel.create({
    title,
    amount,
    status,
    clientId: clientId || null,
    closeDate,
  });
  res.status(201).json(deal);
};

export const updateDealStatus = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body as { status: DealStatus };

  if (!id || !status) {
    return res.status(400).json({ message: "id и status обязательны" });
  }

  const updated = await DealModel.updateStatus(id, status);
  if (!updated) {
    return res.status(404).json({ message: "Сделка не найдена" });
  }

  res.json(updated);
};

