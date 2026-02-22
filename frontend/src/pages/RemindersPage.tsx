import { useEffect, useState } from "react";
import {
  fetchReminders,
  createReminder,
  updateReminderStatus,
  deleteReminder,
} from "../services/api";
import type { Reminder } from "../types/reminder";

export function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [scope, setScope] = useState<"all" | "client" | "deal" | "general" | "overdue" | "today">("all");
  const [form, setForm] = useState({
    title: "",
    description: "",
    remindAt: "",
  });

  const load = async () => {
    const data = await fetchReminders();
    setReminders(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    if (!form.title || !form.remindAt) return;

    await createReminder(form);
    setForm({ title: "", description: "", remindAt: "" });
    setShowModal(false);
    load();
  };

  const toggle = async (id: number, isDone: boolean) => {
    await updateReminderStatus(id, !isDone);
    load();
  };

  const remove = async (id: number) => {
    await deleteReminder(id);
    load();
  };

  const now = new Date();

  const filtered = reminders.filter((r) => {
    const date = new Date(r.remindAt);

    if (scope === "today") {
      return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }

    if (scope === "overdue") {
      return date < now && !r.isDone;
    }

    if (scope === "client") {
      return r.clientId != null;
    }

    if (scope === "deal") {
      return r.dealId != null;
    }

    if (scope === "general") {
      return r.clientId == null && r.dealId == null;
    }

    return true;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Напоминания</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Добавить
        </button>
      </div>

    <div className="flex gap-3 mb-4">
      <button onClick={() => setScope("all")}>Все</button>
      <button onClick={() => setScope("client")}>По клиентам</button>
      <button onClick={() => setScope("deal")}>По сделкам</button>
      <button onClick={() => setScope("general")}>Общие</button>
    </div>

      {filtered.map((r) => {
        const date = new Date(r.remindAt);
        const isOverdue = date < now && !r.isDone;

        return (
          <div
            key={r.id}
            className={`border p-4 mb-3 rounded-lg flex justify-between items-center ${
              isOverdue ? "border-red-500 bg-red-50" : ""
            }`}
          >
            <div>
              <div className={r.isDone ? "line-through text-gray-400" : ""}>
                {r.title}
              </div>
              <div className="text-sm text-gray-500">
                {date.toLocaleString()}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggle(r.id, r.isDone)}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                ✓
              </button>

              <button
                onClick={() => remove(r.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                🗑
              </button>
            </div>
          </div>
        );
      })}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">
              Новое напоминание
            </h2>

            <input
              type="text"
              placeholder="Название"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <textarea
              placeholder="Описание"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="datetime-local"
              value={form.remindAt}
              onChange={(e) =>
                setForm({ ...form, remindAt: e.target.value })
              }
              className="w-full border p-2 mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Отмена
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}