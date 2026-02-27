import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/gory_zima_sneg_118389_1920x1080.jpg";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Ошибка входа");
    }

    // 🔥 СОХРАНЯЕМ ТОКЕН
    localStorage.setItem("token", data.token);

    navigate("/deals");
  } catch (err: any) {
    setError(err.message || "Что-то пошло не так");
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-cyan-700/40" />

      {/* Back to Home button in top left */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 px-4 py-2 text-white text-sm font-medium hover:text-white/80 transition"
      >
        ← Назад
      </Link>

      {/* Left side - Branding */}
      <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 z-10 text-white max-w-md hidden lg:block">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <h1 className="text-5xl font-bold">Мини CRM</h1>
        </div>
        <p className="text-xl text-white/90 leading-relaxed">
          Помогает бизнесу работать
        </p>
      </div>

      {/* Right side - Login form */}
      <div className="relative z-10 w-full max-w-md mx-4 lg:mr-20 lg:ml-auto bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Войти в Мини CRM
          </h2>
          <p className="text-sm text-gray-500">E-mail или телефон</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email input */}
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@company.kz"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>
          {/* Password input */}
            <div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Пароль"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>
          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Continue button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition shadow-md disabled:opacity-60"
          >
            {loading ? "Входим..." : "Продолжить"}
          </button>
        </form>

        {/* Sign up link */}
        <p className="mt-6 text-xs text-gray-500 text-center">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}