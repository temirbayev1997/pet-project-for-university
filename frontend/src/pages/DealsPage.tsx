import { useEffect, useState } from "react";
import { fetchDeals, updateDealStatus } from "../services/api";
import type { Deal } from "../types/deal";
import { DealColumn } from "../components/DealColumn";
import {
  DndContext,
  closestCorners,
  type DragEndEvent,
} from "@dnd-kit/core";
import { DealModal } from "../components/DealModal";
import { DealDetailsModal } from "../components/DealDetailsModal";
import { useSidebar } from "../context/SidebarContext";

const statuses = [
  { value: "Lead", label: "Сделки" },
  { value: "Contacted", label: "Связались" },
  { value: "Proposal", label: "Предложение" },
  { value: "InProgress", label: "В работе" },
  { value: "Won", label: "Состоялась" },
  { value: "Lost", label: "Не состоялась" },
] as const;
export function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [showDealModal, setShowDealModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const { isOpen } = useSidebar();

  const loadDeals = async () => {
    const data = await fetchDeals();
    setDeals(data);
  };

const handleDragEnd = async (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over) return;

  const dealId = Number(active.id);
  const newStatus = over.id as Deal["status"];

  const deal = deals.find((d) => d.id === dealId);
  if (!deal || deal.status === newStatus) return;

  await updateDealStatus(dealId, newStatus);
  await loadDeals();
};

  useEffect(() => {
    loadDeals();
  }, []);

return (
  <div
  className={`flex-1 flex flex-col min-h-0 overflow-hidden transition-all duration-300 ${
    isOpen ? "p-4" : "p-6"
  }`}
>
    <h1 className="text-2xl font-bold mb-4">Сделки</h1>

    <button
      className="bg-green-500 text-white px-3 py-1 rounded mb-4 w-fit"
      onClick={() => setShowDealModal(true)}
    >
      Добавить сделку
    </button>

    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex-1 overflow-hidden" style={{ minHeight: 0 }}>
        <div
            className={`deals-scroll flex h-full pb-2 transition-all duration-300 ${
              isOpen ? "gap-3" : "gap-6"
            }`}
          >
          {statuses.map(({ value, label }) => (
            <DealColumn
              key={value}
              id={value}
              title={label}
              deals={deals.filter((d) => d.status === value)}
              onOpen={setSelectedDeal}
            />
          ))}
        </div>
      </div>
    </DndContext>

    {showDealModal && (
      <DealModal onClose={() => setShowDealModal(false)} onCreated={loadDeals} />
    )}
    {selectedDeal && (
      <DealDetailsModal
        deal={selectedDeal}
        onClose={() => setSelectedDeal(null)}
        onUpdated={loadDeals}
      />
    )}
  </div>
);

}
