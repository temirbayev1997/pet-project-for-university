import { DealCard } from "./DealCard";
import type { Deal } from "../types/deal";
import { useDroppable } from "@dnd-kit/core";

export function DealColumn({
  id,
  title,
  deals,
  onOpen
}: {
  id: string;
  title: string;
  deals: Deal[];
  onOpen: (deal: Deal) => void;
}) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="min-w-[220px] max-w-[260px] flex-1 bg-gray-50 rounded-lg p-3 flex flex-col gap-3"
    >
      <h3 className="font-bold text-gray-700 mb-2">{title}</h3>

      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} onOpen={onOpen}  />
      ))}
    </div>
  );
}
