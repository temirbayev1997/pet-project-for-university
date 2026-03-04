// import "./telegram/bot";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import clientRoutes from "./routes/clientRoutes";
import dealRoutes from "./routes/dealRoutes";
import authRoutes from "./routes/authRoutes";
import reminderRoutes from "./routes/reminderRoutes";
import statsRoutes from "./routes/statsRoutes";
import companyRoutes from "./routes/companyRoutes";
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";
import { initDatabase } from "./db/initDb";
import path from "path"; 

dotenv.config();

const app = express();

// Инициализация БД
initDatabase().catch(console.error);

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/user", userRoutes);
// app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend успешно запущен 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server started on port ${PORT}`)
);