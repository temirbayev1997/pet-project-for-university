import { useEffect, useState } from "react";
import { createDeal, fetchClients, createReminder } from "../services/api";

export function DealModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [clients, setClients] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    clientId: "",
    status: "Lead",
    closeDate: "",
  });

  useEffect(() => {
    fetchClients().then(setClients);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.clientId) {
      alert("Название и клиент обязательны");
      return;
    }

    // 1️⃣ создаём сделку
    const newDeal = await createDeal({
      title: form.title,
      amount: Number(form.amount),
      status: form.status,
      clientId: Number(form.clientId),
      closeDate: form.closeDate || null,
    });

    // 2️⃣ создаём напоминание для сделки
    await createReminder({
      title: `Работа по сделке: ${newDeal.title}`,
      remindAt: new Date().toISOString(),
      dealId: newDeal.id,
    });

    onCreated();
    onClose();
  };

  return (
    <div className="client-modal-overlay" onClick={onClose}>
      <div
        className="client-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Создание сделки</h2>

        <div className="flex flex-col gap-3">
          <input
            name="title"
            placeholder="Название сделки"
            className="client-modal-input"
            onChange={handleChange}
          />

          <input
            name="amount"
            type="number"
            placeholder="Сумма"
            className="client-modal-input"
            onChange={handleChange}
          />

          <select
            name="clientId"
            className="client-modal-input"
            onChange={handleChange}
          >
            <option value="">Выберите клиента</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            name="status"
            className="client-modal-input"
            onChange={handleChange}
            defaultValue="Lead"
          >
            <option value="Lead">Лид</option>
            <option value="Contacted">Связались</option>
            <option value="Proposal">Предложение</option>
            <option value="InProgress">В работе</option>
            <option value="Won">Выиграна</option>
            <option value="Lost">Проиграна</option>
          </select>

          <input
            name="closeDate"
            type="date"
            className="client-modal-input"
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="client-modal-button bg-gray-200 px-4 py-2 rounded"
          >
            Отмена
          </button>

          <button
            onClick={handleSubmit}
            className="client-modal-button bg-green-500 text-white px-4 py-2 rounded"
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  );
}
