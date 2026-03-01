import { useEffect, useState } from "react";
import { authFetch } from "../services/authFetch";

export function CompanyProfile() {
  const [company, setCompany] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    load();
  }, []);

const load = async () => {
  const res = await authFetch("/company/profile");

  if (!res || !res.ok) return;

  const data = await res.json();

  if (!data?.company) {
    console.error("Компания не найдена");
    return;
  }

  setCompany(data.company);
  setEmployees(data.employees || []);
  setName(data.company.name || "");
};

  const save = async () => {
    await authFetch("/company", {
      method: "PATCH",
      body: JSON.stringify({ name })
    });
    load();
  };

  if (!company) return <div>Загрузка...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Профиль компании</h1>

      <div className="bg-white p-4 rounded-xl shadow">
        <label className="text-sm text-gray-500">Название компании</label>
        <input
          className="border p-2 w-full mt-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={save}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Сохранить
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Сотрудники</h2>
        {employees.map((emp) => (
          <div key={emp.id} className="border-b py-2">
            {emp.name} — {emp.role}
          </div>
        ))}
      </div>
    </div>
  );
}