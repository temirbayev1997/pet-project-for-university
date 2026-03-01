import TelegramBot from "node-telegram-bot-api";
import { saveIncomingMessage } from "../controllers/messageController";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.TG_TOKEN as string, {
  polling: true,
});

bot.on("message", async (msg) => {
  if (!msg.text) return;

  const chatId = msg.chat.id;
  const text = msg.text;

  await saveIncomingMessage(chatId, text);
  console.log("CHAT ID:", chatId);
});


export default bot;