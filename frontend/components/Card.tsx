"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card as CardType } from "@/lib/types";

type CardProps = {
  card: CardType;
  onDelete: (cardId: string) => void;
};

export function Card({ card, onDelete }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      data-testid={`card-${card.id}`}
      className={`rounded-lg border border-black/5 bg-white p-3 shadow-sm ${
        isDragging ? "opacity-40" : "opacity-100"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3
          className="cursor-grab text-sm font-semibold text-navy active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          {card.title}
        </h3>
        <button
          type="button"
          data-testid={`delete-card-${card.id}`}
          onClick={() => onDelete(card.id)}
          className="shrink-0 text-xs font-medium text-primary hover:underline"
        >
          Delete
        </button>
      </div>
      <p className="mt-1 text-sm leading-5 text-muted">{card.details}</p>
    </article>
  );
}
