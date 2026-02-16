import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export function MainLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // если есть авторизация
    navigate("/login"); // редирект
  };

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900">
      
      {/* Sidebar */}
        <aside
          className={`${
            isOpen ? "w-64" : "w-16"
          } h-screen bg-white border-r border-slate-200 px-4 py-6 flex flex-col justify-between transition-all duration-300`}
        >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            {isOpen && (
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                  CRM
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-tight">
                    Мини CRM
                  </span>
                  <span className="text-xs text-slate-500">
                    для микробизнеса
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-slate-600 text-sm"
            >
              {isOpen ? "◀" : "▶"}
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 text-sm">
            <NavLink
              to="/clients"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              {isOpen ? "Клиенты" : "👥"}
            </NavLink>

            <NavLink
              to="/deals"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              {isOpen ? "Сделки" : "💼"}
            </NavLink>

            <NavLink
              to="/reminders"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              {isOpen ? "Напоминания" : "⏰"}
            </NavLink>
          </nav>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
          >
            {isOpen ? "Выйти" : "🚪"}
          </button>

          {isOpen && (
            <div className="text-xs text-slate-400 text-center">
              Мини CRM · {new Date().getFullYear()}
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
