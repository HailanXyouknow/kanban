import type { Board, Card } from "./types";

function arrayMove<T>(items: T[], fromIndex: number, toIndex: number): T[] {
  const next = [...items];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next;
}

export function renameColumn(board: Board, columnId: string, title: string): Board {
  return {
    columns: board.columns.map((column) =>
      column.id === columnId ? { ...column, title } : column,
    ),
  };
}

export function addCard(
  board: Board,
  columnId: string,
  title: string,
  details: string,
  id = crypto.randomUUID(),
): Board {
  const card: Card = { id, title, details };
  return {
    columns: board.columns.map((column) =>
      column.id === columnId ? { ...column, cards: [...column.cards, card] } : column,
    ),
  };
}

export function deleteCard(board: Board, cardId: string): Board {
  return {
    columns: board.columns.map((column) => ({
      ...column,
      cards: column.cards.filter((card) => card.id !== cardId),
    })),
  };
}

export function findColumnId(board: Board, id: string): string | undefined {
  if (board.columns.some((column) => column.id === id)) {
    return id;
  }
  return board.columns.find((column) => column.cards.some((card) => card.id === id))?.id;
}

export function reorderCard(board: Board, columnId: string, fromIndex: number, toIndex: number): Board {
  return {
    columns: board.columns.map((column) => {
      if (column.id !== columnId) {
        return column;
      }
      return { ...column, cards: arrayMove(column.cards, fromIndex, toIndex) };
    }),
  };
}

export function moveCard(board: Board, cardId: string, toColumnId: string, toIndex: number): Board {
  let moving: Card | undefined;
  const withoutCard = board.columns.map((column) => {
    const card = column.cards.find((item) => item.id === cardId);
    if (!card) {
      return column;
    }
    moving = card;
    return { ...column, cards: column.cards.filter((item) => item.id !== cardId) };
  });

  if (!moving) {
    return board;
  }

  return {
    columns: withoutCard.map((column) => {
      if (column.id !== toColumnId) {
        return column;
      }
      const cards = [...column.cards];
      const index = Math.max(0, Math.min(toIndex, cards.length));
      cards.splice(index, 0, moving);
      return { ...column, cards };
    }),
  };
}
