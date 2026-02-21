import { useEffect, useState } from "react";
import { fetchClients } from "../services/api";
import type { Client } from "../types/client";
import { ClientCard } from "../components/ClientCard";
import { ClientModal } from "../components/ClientModal";

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setShowModal(true);
  };

  const load = async () => {
    const data = await fetchClients();
    setClients(data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Клиенты</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        Новый клиент
      </button>
      <div className="grid gap-3 overflow-auto" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
        {clients.map((c) => <ClientCard key={c.id} client={c} onEdit={handleEdit} />)}
      </div>
      {showModal && (
        <ClientModal
          onClose={() => setShowModal(false)}
          onCreated={load}
        />
      )}
    </div>
  );
}