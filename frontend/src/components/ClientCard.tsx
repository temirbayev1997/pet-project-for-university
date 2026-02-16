import type { Client } from "../types/client";
import { archiveClient } from "../services/api";

export function ClientCard({ client }: { client: Client }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col justify-between">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{client.name}</h2>
      <p className="text-gray-600 text-sm">Номер телефона: {client.phone || "-"}</p>
      <p className="text-gray-600 text-sm">Почтовый Адрес: {client.email || "-"}</p>
      <p className="text-gray-600 text-sm">Компания: {client.company || "-"}</p>
      <div className="mt-4 flex gap-2">
        <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">
          Изменить
        </button>
        <button
          onClick={async () => {
            await archiveClient(client.id);
            window.location.reload(); // временно
          }}
          className="bg-red-500 text-white px-2 py-1 rounded button-press"
        >
          Удалить 
        </button>
      </div>
    </div>
  );
}
