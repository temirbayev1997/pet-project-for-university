import { Link } from "react-router-dom";
import bgImage from "../assets/gory_zima_sneg_118389_1920x1080.jpg";

export function LandingPage() {
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-blue-800/30 to-cyan-700/30" />

      {/* Login button top-right */}
      <Link
        to="/login"
        className="absolute top-6 right-6 z-20 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-lg"
      >
        Войти
      </Link>

      {/* Left side - Branding */}
      <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 z-10 text-white max-w-md hidden lg:block">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <h1 className="text-5xl font-bold">Мини CRM</h1>
        </div>
        <p className="text-xl text-white/90 leading-relaxed">
          Помогает бизнесу работать
        </p>
      </div>

      {/* Right side - Registration form */}
      <div className="relative z-10 w-full max-w-md mx-4 lg:mr-20 lg:ml-auto bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Создайте Мини CRM
          </h2>
          <p className="text-sm text-gray-500">Ваш e-mail</p>
        </div>

        {/* Email input */}
        <div className="mb-6">
          <input
            type="email"
            placeholder="name@company.kz"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 mb-6">
          <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
            <input type="checkbox" className="mt-0.5 rounded" />
            <span>Я согласился получать рекламно-информационные материалы</span>
          </label>
          <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
            <input type="checkbox" className="mt-0.5 rounded" />
            <span>Я хочу получать приглашения на бесплатные вебинары</span>
          </label>
        </div>

        {/* Continue button */}
        <Link
          to="/register"
          className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition shadow-md"
        >
          Продолжить
        </Link>

        {/* Terms */}
        <p className="mt-4 text-xs text-gray-500 text-center leading-relaxed">
          Нажимая кнопку «Продолжить», вы подтверждаете пользовательское соглашение и даёте согласие на обработку персональных данных.
        </p>
      </div>
    </div>
  );
}
