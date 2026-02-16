import { useState } from "react";
import type { Deal } from "../types/deal";

export function DealDetailsModal({
  deal,
  onClose,
  onUpdated,
}: {
  deal: Deal;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [form, setForm] = useState({
    title: deal.title,
    amount: deal.amount,
    status: deal.status,
  });

  const handleSave = async () => {
    await fetch(`http://localhost:5000/api/deals/${deal.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onUpdated();
    onClose();
  };

  return (
    <div className="client-modal-overlay" onClick={onClose}>
      <div
        className="client-modal-content w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-6">
          Редактирование сделки
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600">Название:</label>
            <input
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="client-modal-input mt-1 ml-5"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Сумма:</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: Number(e.target.value) })
              }
              className="client-modal-input mt-1 ml-10"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Статус:</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as Deal["status"],
                })
              }
              className="client-modal-input mt-1 ml-[41px]"
            >
              <option value="Lead">Lead</option>
              <option value="InProgress">InProgress</option>
              <option value="Contacted">Contacted</option>
              <option value="Proposal">Proposal</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div className="text-sm text-gray-600">
            Создано: {deal.createdBy || "—"}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="client-modal-button bg-gray-200 px-4 py-2 rounded"
          >
            Закрыть
          </button>

          <button
            onClick={handleSave}
            className="client-modal-button bg-blue-600 text-white px-4 py-2 rounded"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
