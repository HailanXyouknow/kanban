"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Column } from "@/components/Column";
import {
  addCard,
  deleteCard,
  findColumnId,
  moveCard,
  renameColumn,
  reorderCard,
} from "@/lib/board";
import { initialBoard } from "@/lib/dummy-data";
import type { Board as BoardType, Card as CardType } from "@/lib/types";

export function Board() {
  const [board, setBoard] = useState<BoardType>(initialBoard);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  function handleDragStart(event: DragStartEvent) {
    const card = board.columns.flatMap((column) => column.cards).find((item) => item.id === event.active.id);
    setActiveCard(card ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCard(null);
    if (!over) {
      return;
    }

    const fromColumnId = findColumnId(board, String(active.id));
    const toColumnId = findColumnId(board, String(over.id));
    if (!fromColumnId || !toColumnId) {
      return;
    }

    const fromColumn = board.columns.find((column) => column.id === fromColumnId);
    const toColumn = board.columns.find((column) => column.id === toColumnId);
    if (!fromColumn || !toColumn) {
      return;
    }

    const fromIndex = fromColumn.cards.findIndex((card) => card.id === active.id);

    if (fromColumnId === toColumnId) {
      const toIndex =
        over.id === toColumnId
          ? fromColumn.cards.length - 1
          : fromColumn.cards.findIndex((card) => card.id === over.id);
      if (fromIndex === toIndex || toIndex < 0) {
        return;
      }
      setBoard(reorderCard(board, fromColumnId, fromIndex, toIndex));
      return;
    }

    const toIndex =
      over.id === toColumnId
        ? toColumn.cards.length
        : toColumn.cards.findIndex((card) => card.id === over.id);

    setBoard(moveCard(board, String(active.id), toColumnId, toIndex < 0 ? toColumn.cards.length : toIndex));
  }

  return (
    <div data-testid="board" className="flex h-full min-h-0 flex-col">
      <header className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Workspace</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-navy">Project Board</h1>
        <div className="mt-3 h-1 w-24 rounded-full bg-accent" />
      </header>
      <DndContext
        id="kanban-board"
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex min-h-0 flex-1 gap-4 overflow-x-auto pb-2">
          {board.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onRename={(columnId, title) => setBoard(renameColumn(board, columnId, title))}
              onAddCard={(columnId, title, details) => setBoard(addCard(board, columnId, title, details))}
              onDeleteCard={(cardId) => setBoard(deleteCard(board, cardId))}
            />
          ))}
        </div>
        <DragOverlay>
          {activeCard ? (
            <div className="w-64 rounded-lg border border-black/5 bg-white p-3 shadow-lg">
              <h3 className="text-sm font-semibold text-navy">{activeCard.title}</h3>
              <p className="mt-1 text-sm text-muted">{activeCard.details}</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
