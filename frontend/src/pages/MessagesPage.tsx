import { useEffect, useState } from "react";

interface Client {
  id: number;
  name: string;
}

interface Message {
  id: number;
  text: string;
  from_client: boolean;
}

export default function MessagesPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/clients/with-telegram")
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  const fetchMessages = async (clientId: number) => {
    const res = await fetch(`/api/messages/${clientId}`);
    const data = await res.json();
    setMessages(data);
  };

  const selectClient = (client: Client) => {
    setSelectedClient(client);
    fetchMessages(client.id);
  };

  const sendMessage = async () => {
    if (!selectedClient || !text) return;

    await fetch("/api/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: selectedClient.id,
        text
      })
    });

    setText("");
    fetchMessages(selectedClient.id);
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* LEFT SIDE */}
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <h2 className="font-bold mb-4">Клиенты</h2>
        {clients.map(client => (
          <div
            key={client.id}
            onClick={() => selectClient(client)}
            className="p-2 cursor-pointer hover:bg-gray-100 rounded"
          >
            {client.name}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">
        {selectedClient ? (
          <>
            <div className="p-4 border-b font-semibold">
              {selectedClient.name}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`max-w-xs p-2 rounded-lg ${
                    msg.from_client
                      ? "bg-gray-200 self-start"
                      : "bg-blue-500 text-white self-end"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-4 border-t flex gap-2">
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                className="flex-1 border rounded p-2"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 rounded"
              >
                Отправить
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Выберите клиента
          </div>
        )}
      </div>
    </div>
  );
}