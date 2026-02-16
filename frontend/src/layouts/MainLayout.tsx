import { NavLink, Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900">
      <aside className="w-64 bg-white border-r border-slate-200 px-5 py-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
              CRM
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">
                Micro CRM
              </span>
              <span className="text-xs text-slate-500">для микробизнеса</span>
            </div>
          </div>

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
              <span>Клиенты</span>
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
              <span>Сделки (воронка)</span>
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
              <span>Напоминания</span>
            </NavLink>
          </nav>
        </div>

        <div className="text-xs text-slate-400">
          Mini CRM · {new Date().getFullYear()}
        </div>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

