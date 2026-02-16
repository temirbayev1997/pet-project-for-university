import type { Client } from "../types/client";

export function ClientCard({ client }: { client: Client }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col justify-between">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{client.name}</h2>
      <p className="text-gray-600 text-sm">Phone: {client.phone || "-"}</p>
      <p className="text-gray-600 text-sm">Email: {client.email || "-"}</p>
      <p className="text-gray-600 text-sm">Company: {client.company || "-"}</p>
      <div className="mt-4 flex gap-2">
        <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">
          Edit
        </button>
        <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
          Delete
        </button>
      </div>
    </div>
  );
}
