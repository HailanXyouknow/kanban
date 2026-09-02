import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Board } from "@/components/Board";

describe("Board", () => {
  it("renders five seeded columns", () => {
    render(<Board />);
    expect(screen.getByTestId("column-col-backlog")).toBeInTheDocument();
    expect(screen.getByTestId("column-col-ready")).toBeInTheDocument();
    expect(screen.getByTestId("column-col-progress")).toBeInTheDocument();
    expect(screen.getByTestId("column-col-review")).toBeInTheDocument();
    expect(screen.getByTestId("column-col-done")).toBeInTheDocument();
    expect(screen.getByText("Document public API")).toBeInTheDocument();
  });

  it("renames a column", async () => {
    const user = userEvent.setup();
    render(<Board />);
    await user.click(screen.getByTestId("column-title-col-backlog"));
    const input = screen.getByTestId("column-title-col-backlog");
    await user.clear(input);
    await user.type(input, "Icebox");
    await user.tab();
    expect(screen.getByTestId("column-title-col-backlog")).toHaveTextContent("Icebox");
  });

  it("adds and deletes a card", async () => {
    const user = userEvent.setup();
    render(<Board />);
    await user.click(screen.getByTestId("add-card-toggle-col-done"));
    await user.type(screen.getByTestId("add-card-title-col-done"), "Ship notes");
    await user.type(screen.getByTestId("add-card-details-col-done"), "Write the launch changelog.");
    await user.click(screen.getByTestId("add-card-submit-col-done"));
    expect(screen.getByText("Ship notes")).toBeInTheDocument();

    const newCard = screen.getByText("Ship notes").closest("[data-testid^='card-']");
    expect(newCard).toBeTruthy();
    const cardId = newCard!.getAttribute("data-testid")!.replace("card-", "");
    await user.click(screen.getByTestId(`delete-card-${cardId}`));
    expect(screen.queryByText("Ship notes")).not.toBeInTheDocument();
  });
});
