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

const statuses: Deal["status"][] = ["Lead", "Contacted", "Proposal", "InProgress", "Won", "Lost"];

export function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [showDealModal, setShowDealModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

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
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Сделки</h1>

    <button
      className="bg-green-500 text-white px-3 py-1 rounded mb-4"
      onClick={() => setShowDealModal(true)}
    >
      Добавить сделку
    </button>

    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto bg-gray-100 min-h-screen p-6">
        {statuses.map((status) => (
          <DealColumn
            key={status}
            id={status}
            title={status}
            deals={deals.filter((d) => d.status === status)}
            onOpen={setSelectedDeal}
          />
        ))}
      </div>
    </DndContext>

    {showDealModal && (
      <DealModal
        onClose={() => setShowDealModal(false)}
        onCreated={loadDeals}
      />
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
