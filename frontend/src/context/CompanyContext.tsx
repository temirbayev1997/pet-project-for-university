import { createContext, useState, useEffect } from "react";
import { authFetch } from "../services/authFetch";

export const CompanyContext = createContext<any>(null);

export function CompanyProvider({ children }: any) {
  const [company, setCompany] = useState<any>(null);

  const loadCompany = async () => {
    const res = await authFetch("/company/profile");
    if (!res || !res.ok) return;

    const data = await res.json();
    setCompany(data.company);
  };

  useEffect(() => {
    loadCompany();
  }, []);

  return (
    <CompanyContext.Provider value={{ company, setCompany, loadCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}