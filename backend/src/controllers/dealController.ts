import { Response, Request } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { DealModel, DealStatus } from "../models/dealModel";

export const getDeals = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  const deals = await DealModel.getAllByUser(userId);
  res.json(deals);
};

export const createDeal = async (req: AuthRequest, res: Response) => {
  const { title, amount, status, clientId, closeDate } = req.body;

  if (!title || !status || !clientId) {
    return res
      .status(400)
      .json({ message: "title, status и clientId обязательны" });
  }

  const userId = req.user?.id;

  const deal = await DealModel.create({
    title,
    amount,
    status,
    clientId,
    closeDate,
    createdBy: userId,
    assignedTo: userId,
  });

  res.status(201).json(deal);
};

export const updateDeal = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.user?.id;

  const updated = await DealModel.updateFull(id, userId, req.body);

  if (!updated) {
    return res.status(404).json({ message: "Сделка не найдена" });
  }

  res.json(updated);
};

export const updateDealStatus = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body as { status: DealStatus };
  const userId = req.user?.id;

  if (!id || !status) {
    return res.status(400).json({ message: "id и status обязательны" });
  }

  const updated = await DealModel.updateStatus(id, userId, status);

  if (!updated) {
    return res.status(404).json({ message: "Сделка не найдена" });
  }

  res.json(updated);
};

