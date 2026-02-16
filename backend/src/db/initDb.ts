import { pool } from "../db";
import fs from "fs";
import path from "path";

export async function initDatabase() {
  try {
    // Путь к SQL файлу относительно текущего файла
    const sqlFile = path.join(__dirname, "init.sql");
    const sql = fs.readFileSync(sqlFile, "utf-8");

    // Разделяем SQL на отдельные команды
    const commands = sql
      .split(";")
      .map((cmd) => cmd.trim())
      .filter((cmd) => cmd.length > 0);

    for (const command of commands) {
      if (command.trim()) {
        await pool.query(command);
      }
    }

    console.log("✅ Database initialized successfully");
    console.log("✅ Admin user created: admin@microcrm.local / admin123");
  } catch (error: any) {
    if (error.code === "42P07") {
      // Таблица уже существует
      console.log("ℹ️  Tables already exist, skipping creation");
    } else {
      console.error("❌ Error initializing database:", error.message);
      throw error;
    }
  }
}
