import { Request, Response } from "express";
import { ReminderModel } from "../models/reminderModel";

export const ReminderController = {
  async getAll(req: Request, res: Response) {
    try {
      const reminders = await ReminderModel.getAll();
      res.json(reminders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch reminders" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const reminder = await ReminderModel.create(req.body);
      res.status(201).json(reminder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create reminder" });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { isDone } = req.body;

      await ReminderModel.updateStatus(id, isDone);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update reminder" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await ReminderModel.delete(id);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete reminder" });
    }
  },
  async update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updated = await ReminderModel.update(id, req.body);

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update reminder" });
  }
},
};