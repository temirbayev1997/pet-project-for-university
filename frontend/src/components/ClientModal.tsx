import { useEffect, useState } from "react";
import { createClient } from "../services/api";
import "../styles/clientmodal.css";
import { createReminder } from "../services/api";

export function ClientModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async () => {
  if (!form.name.trim()) {
    setError("Имя обязательно");
    return;
  }

  try {
    setLoading(true);
    setError("");

    // 1️⃣ создаём клиента
    const newClient = await createClient(form);

    // 2️⃣ создаём напоминание для него
    await createReminder({
      title: "Связаться с клиентом",
      remindAt: new Date().toISOString(),
      clientId: newClient.id,
    });

    onCreated();
    onClose();
  } catch {
    setError("Ошибка при создании клиента");
  } finally {
    setLoading(false);
  }
};

  // Закрытие по ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="client-modal-overlay"
      onClick={onClose}
    >
      <div
        className="client-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Создание клиента</h2>

        <div className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Имя *"
            onChange={handleChange}
            className="client-modal-input"
          />
          <input
            name="phone"
            placeholder="Телефон"
            onChange={handleChange}
            className="client-modal-input"
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="client-modal-input"
          />
          <input
            name="company"
            placeholder="Компания"
            onChange={handleChange}
            className="client-modal-input"
          />
          <textarea
            name="comment"
            placeholder="Комментарий"
            onChange={handleChange}
            className="client-modal-input"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        )}

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="client-modal-button px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Отмена
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="client-modal-button px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
}
