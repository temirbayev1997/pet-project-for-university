import { useEffect, useState } from "react";
import { fetchClients, createClient } from "./services/api";
import type { Client } from "./types/client";

function App() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await fetchClients();
    setClients(data);
  };

  const handleAdd = async () => {
    await createClient({
      name: "New Client",
      phone: "123",
      email: "mail@test.com",
    });
    load();
  };

  return (
    <div>
      <h1>Clients</h1>
      <button onClick={handleAdd}>Add client</button>
      {clients.map((c) => (
        <div key={c.id}>
          {c.name} - {c.phone}
        </div>
      ))}
    </div>
  );
}

export default App;
