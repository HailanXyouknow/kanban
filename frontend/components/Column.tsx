"use client";

import { KeyboardEvent, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AddCardForm } from "@/components/AddCardForm";
import { Card } from "@/components/Card";
import type { Column as ColumnType } from "@/lib/types";

type ColumnProps = {
  column: ColumnType;
  onRename: (columnId: string, title: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
};

export function Column({ column, onRename, onAddCard, onDeleteCard }: ColumnProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(column.title);
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  function commit() {
    const title = draft.trim() || column.title;
    setDraft(title);
    onRename(column.id, title);
    setEditing(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      commit();
    }
    if (event.key === "Escape") {
      setDraft(column.title);
      setEditing(false);
    }
  }

  return (
    <section
      data-testid={`column-${column.id}`}
      className={`flex min-h-[28rem] min-w-[16rem] flex-1 flex-col rounded-xl bg-white/80 shadow-sm ring-1 ring-black/5 ${
        isOver ? "ring-2 ring-accent" : ""
      }`}
    >
      <header className="border-t-4 border-accent px-3 pb-2 pt-3">
        {editing ? (
          <input
            data-testid={`column-title-${column.id}`}
            value={draft}
            autoFocus
            onChange={(event) => setDraft(event.target.value)}
            onBlur={commit}
            onKeyDown={handleKeyDown}
            className="w-full rounded border border-black/10 px-2 py-1 text-sm font-semibold text-navy outline-none focus:border-accent"
          />
        ) : (
          <button
            type="button"
            data-testid={`column-title-${column.id}`}
            onClick={() => {
              setDraft(column.title);
              setEditing(true);
            }}
            className="w-full text-left text-sm font-semibold text-navy"
          >
            {column.title}
          </button>
        )}
        <p className="mt-1 text-xs text-muted">
          {column.cards.length} {column.cards.length === 1 ? "card" : "cards"}
        </p>
      </header>
      <div ref={setNodeRef} className="flex flex-1 flex-col px-3 pb-3">
        <SortableContext items={column.cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-1 flex-col gap-2">
            {column.cards.map((card) => (
              <Card key={card.id} card={card} onDelete={onDeleteCard} />
            ))}
          </div>
        </SortableContext>
        <AddCardForm columnId={column.id} onAdd={(title, details) => onAddCard(column.id, title, details)} />
      </div>
    </section>
  );
}
