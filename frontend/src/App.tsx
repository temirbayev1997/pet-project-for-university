import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClientsPage } from "./pages/ClientsPage";
import { DealsPage } from "./pages/DealsPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { RemindersPage } from "./pages/RemindersPage";
import { MainLayout } from "./layouts/MainLayout";
import { LandingPage } from "./pages/LandingPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<MainLayout />}>
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/reminders" element={<RemindersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
