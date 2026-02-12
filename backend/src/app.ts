import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clientRoutes from "./routes/clientRoutes";

dotenv.config();

const app = express(); // сначала создаём app

app.use(cors());
app.use(express.json());
app.use("/api/clients", clientRoutes);

app.get("/", (req, res) => {
  res.json({ message: "TECT" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});
