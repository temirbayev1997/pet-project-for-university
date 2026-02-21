import { pool } from "../db";
import fs from "fs";
import path from "path";

async function waitForDatabase(retries = 10) {
  while (retries) {
    try {
      await pool.query("SELECT 1");
      console.log("✅ Database connected");
      return;
    } catch (err) {
      console.log("⏳ Waiting for database...");
      retries--;
      await new Promise((res) => setTimeout(res, 3000));
    }
  }

  throw new Error("❌ Database not available after retries");
}

export async function initDatabase() {
  try {
    // 🔥 Ждём пока БД станет доступна
    await waitForDatabase();

    const sqlFile = path.join(__dirname, "init.sql");
    const sql = fs.readFileSync(sqlFile, "utf-8");

    const commands = sql
      .split(";")
      .map((cmd) => cmd.trim())
      .filter((cmd) => cmd.length > 0);

    for (const command of commands) {
      await pool.query(command);
    }

    console.log("✅ Database initialized successfully");
    console.log("✅ Admin user created: admin@microcrm.local / admin123");
  } catch (error: any) {
    if (error.code === "42P07") {
      console.log("ℹ️ Tables already exist, skipping creation");
    } else {
      console.error("❌ Error initializing database:", error.message);
      throw error;
    }
  }
}