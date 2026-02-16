import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const existing = await UserModel.findByEmail(email);
  if (existing) return res.status(400).json({ message: "Email already exists" });

  const user = await UserModel.create({ username, email, password });
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findByEmail(email);
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Incorrect password" });

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  });
};
