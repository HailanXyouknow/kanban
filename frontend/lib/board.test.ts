import { describe, expect, it } from "vitest";
import { addCard, deleteCard, findColumnId, moveCard, renameColumn, reorderCard } from "./board";
import { initialBoard } from "./dummy-data";

describe("initialBoard", () => {
  it("has five columns with title and details on each card", () => {
    expect(initialBoard.columns).toHaveLength(5);
    for (const column of initialBoard.columns) {
      for (const card of column.cards) {
        expect(card.title.length).toBeGreaterThan(0);
        expect(card.details.length).toBeGreaterThan(0);
        expect(Object.keys(card).sort()).toEqual(["details", "id", "title"]);
      }
    }
  });
});

describe("board helpers", () => {
  it("renames a column", () => {
    const next = renameColumn(initialBoard, "col-backlog", "Icebox");
    expect(next.columns[0].title).toBe("Icebox");
    expect(initialBoard.columns[0].title).toBe("Backlog");
  });

  it("adds a card to a column", () => {
    const next = addCard(initialBoard, "col-ready", "Design review", "Walk through the latest mockups.", "card-new");
    const ready = next.columns.find((column) => column.id === "col-ready");
    expect(ready?.cards.at(-1)).toEqual({
      id: "card-new",
      title: "Design review",
      details: "Walk through the latest mockups.",
    });
  });

  it("deletes a card", () => {
    const next = deleteCard(initialBoard, "card-api-docs");
    expect(next.columns[0].cards.some((card) => card.id === "card-api-docs")).toBe(false);
  });

  it("reorders a card in the same column", () => {
    const next = reorderCard(initialBoard, "col-backlog", 0, 1);
    expect(next.columns[0].cards.map((card) => card.id)).toEqual(["card-onboarding", "card-api-docs"]);
  });

  it("moves a card to another column", () => {
    const next = moveCard(initialBoard, "card-api-docs", "col-done", 0);
    expect(next.columns[0].cards.some((card) => card.id === "card-api-docs")).toBe(false);
    expect(next.columns[4].cards[0].id).toBe("card-api-docs");
  });

  it("finds a column by column or card id", () => {
    expect(findColumnId(initialBoard, "col-review")).toBe("col-review");
    expect(findColumnId(initialBoard, "card-invoice-export")).toBe("col-progress");
  });
});
