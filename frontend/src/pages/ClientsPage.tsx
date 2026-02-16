import { useEffect, useState } from "react";
import { fetchClients, createClient } from "../services/api";
import type { Client } from "../types/client";
import { ClientCard } from "../components/ClientCard";

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);

  const load = async () => {
    const data = await fetchClients();
    setClients(data);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    await createClient({ name: "New Client", phone: "123" });
    load();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Клиенты</h1>
      <button className="bg-blue-500 text-white px-3 py-1 rounded mb-4" onClick={handleAdd}>
        Добавить клиента
      </button>
      <div className="grid gap-3 overflow-auto" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
        {clients.map((c) => <ClientCard key={c.id} client={c} />)}
      </div>
    </div>
  );
}