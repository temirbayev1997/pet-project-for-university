import { DealCard } from "./DealCard";
import type { Deal } from "../types/deal";
import { useDroppable } from "@dnd-kit/core";

export function DealColumn({
  id,
  title,
  deals
}: {
  id: string;
  title: string;
  deals: Deal[];
}) {
  const { setNodeRef } = useDroppable({
    id, // статус колонки
  });

  return (
    <div
      ref={setNodeRef}
      className="w-72 bg-gray-50 rounded-lg p-3 flex-shrink-0 flex flex-col gap-3 min-h-[400px]"
    >
      <h3 className="font-bold text-gray-700 mb-2">{title}</h3>

      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}
