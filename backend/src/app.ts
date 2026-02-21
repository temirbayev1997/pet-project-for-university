import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clientRoutes from "./routes/clientRoutes";
import dealRoutes from "./routes/dealRoutes";
import authRoutes from "./routes/authRoutes";
import { initDatabase } from "./db/initDb";
import reminderRoutes from "./routes/reminderRoutes";

dotenv.config();

const app = express();

// Инициализация БД при старте
initDatabase().catch(console.error);

app.use(cors());
app.use(express.json());

app.use("/api/clients", clientRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reminders", reminderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "TECT" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server started on port ${PORT}`));
