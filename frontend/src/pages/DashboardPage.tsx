import { useEffect, useState } from "react";
import { fetchStats } from "../services/api";
import { Column, Pie } from "@ant-design/plots";

export function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  const statuses = [
    "Lead",
    "Contacted",
    "Proposal",
    "InProgress",
    "Won",
    "Lost",
  ];

  useEffect(() => {
    fetchStats().then(setStats);
  }, []);

  if (!stats) return <div className="p-6">Загрузка...</div>;

  const pieData = statuses.map((status) => {
    const found = stats.dealsByStatus.find((d: any) => d.status === status);

    return {
      status,
      count: found ? Number(found.count) : 0,
    };
  });

  const columnConfig = {
    data: stats.dealsByStatus || [],
    xField: "status",
    yField: "count",
    label: { position: "middle" },
  };

  const pieConfig = {
    data: pieData,
    angleField: "count",
    colorField: "status",
    radius: 0.9,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Дашборд</h1>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Клиенты" value={stats.clients} />
        <StatCard title="Активные сделки" value={stats.activeDeals} />
        <StatCard title="Состоялась" value={stats.wonDeals} />
        <StatCard title="Не состоялась" value={stats.overdueReminders} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="mb-4 font-semibold">Сделки по статусам</h2>
          <Column {...columnConfig} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="mb-4 font-semibold">Распределение сделок</h2>
          <Pie {...pieConfig} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </div>
  );
}