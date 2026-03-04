// import { Request, Response } from "express";
// import { pool } from "../db";
// import { sendTelegramMessage } from "../telegram/telegramService";

// export const saveIncomingMessage = async (chatId: number, text: string) => {
//   try {
//     let client = await pool.query(
//       "SELECT id FROM clients WHERE telegram_chat_id = $1",
//       [chatId]
//     );

//     let clientId;

//     if (!client.rows.length) {
//       const newClient = await pool.query(
//         "INSERT INTO clients (name, telegram_chat_id) VALUES ($1, $2) RETURNING id",
//         [`Telegram User ${chatId}`, chatId]
//       );

//       clientId = newClient.rows[0].id;
//     } else {
//       clientId = client.rows[0].id;
//     }

//     await pool.query(
//       "INSERT INTO messages (client_id, chat_id, text, from_client) VALUES ($1, $2, $3, $4)",
//       [clientId, chatId, text, true]
//     );

//   } catch (err) {
//     console.error(err);
//   }
// };

// export const sendMessageFromCRM = async (req: Request, res: Response) => {
//   try {
//     const { clientId, text } = req.body;

//     const client = await pool.query(
//       "SELECT telegram_chat_id FROM clients WHERE id = $1",
//       [clientId]
//     );

//     if (!client.rows.length) {
//       return res.status(404).json({ error: "Client not found" });
//     }

//     const chatId = client.rows[0].telegram_chat_id;

//     if (!chatId) {
//       return res.status(400).json({ error: "Client has no telegram connected" });
//     }

//     await sendTelegramMessage(chatId, text);

//     await pool.query(
//       "INSERT INTO messages (client_id, chat_id, text, from_client) VALUES ($1, $2, $3, $4)",
//       [clientId, chatId, text, false]
//     );

//     res.json({ success: true });
//   } catch (err) {
//     console.error("Ошибка отправки сообщения:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// export const getMessagesByClient = async (req: Request, res: Response) => {
//   try {
//     const { clientId } = req.params;

//     const messages = await pool.query(
//       "SELECT * FROM messages WHERE client_id = $1 ORDER BY created_at ASC",
//       [clientId]
//     );

//     res.json(messages.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch messages" });
//   }
// };