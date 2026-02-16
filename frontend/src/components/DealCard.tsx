import type { Deal } from "../types/deal";
import { useDraggable } from "@dnd-kit/core";

export function DealCard({ deal, onOpen }: { deal: Deal; onOpen: (deal: Deal) => void }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: deal.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const statusColor = {
    Lead: "bg-blue-100",
    Contacted: "bg-orange-100",
    Proposal: "bg-yellow-100",
    InProgress: "bg-purple-100",
    Won: "bg-green-100",
    Lost: "bg-red-100"
  }[deal.status] || "bg-gray-100";

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      onDoubleClick={() => onOpen(deal)}
      className={`p-4 rounded-lg shadow ${statusColor} flex flex-col gap-2 cursor-grab active:cursor-grabbing deal-enter deal-hover`}
    >
      <h4 className="font-semibold text-sm">{deal.title}</h4>
      <p className="text-xs text-gray-600">
        Сумма: {deal.amount?.toLocaleString()} Тг.
      </p>

      <div className="flex gap-1">
        {deal.tags?.map((t) => (
          <span key={t} className="text-xs px-2 py-0.5 rounded bg-gray-200">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
