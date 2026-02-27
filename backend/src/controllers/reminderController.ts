import { Response, Request } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { ReminderModel } from "../models/reminderModel";

export const ReminderController = {
async getAll(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    const reminders = await ReminderModel.getAll(userId);
    res.json(reminders);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch reminders" });
  }
},

async create(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    const reminder = await ReminderModel.create(req.body, userId);
    res.status(201).json(reminder);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create reminder" });
  }
},

  async updateStatus(req: AuthRequest, res: Response){
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