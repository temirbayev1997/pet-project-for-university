import { DealCard } from "./DealCard";
import type { Deal } from "../types/deal";
import { useDroppable } from "@dnd-kit/core";
import { useSidebar } from "../context/SidebarContext";

export function DealColumn({
  id,
  title,
  deals,
  onOpen,
}: {
  id: string;
  title: string;
  deals: Deal[];
  onOpen: (deal: Deal) => void;
}) {
  const { setNodeRef } = useDroppable({
    id,
  });
  const { isOpen } = useSidebar();
  return (
    <div
      ref={setNodeRef}
      className={`
              flex-shrink-0
              ${isOpen ? "w-[190px]" : "w-[200px]"}
              bg-gray-50
              rounded-xl
              p-3
              flex
              flex-col
              gap-3
              transition-all duration-300
            `}
    >
      <h3 className="font-bold text-gray-700 mb-2">{title}</h3>

      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} onOpen={onOpen}  />
      ))}
    </div>
  );
}
