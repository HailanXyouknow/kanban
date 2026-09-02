import type { Board } from "./types";

export const initialBoard: Board = {
  columns: [
    {
      id: "col-backlog",
      title: "Backlog",
      cards: [
        {
          id: "card-api-docs",
          title: "Document public API",
          details: "Write endpoint notes for billing and auth so the frontend team can integrate without guesswork.",
        },
        {
          id: "card-onboarding",
          title: "Onboarding checklist",
          details: "Draft the first-week checklist for new engineers covering repo setup and local services.",
        },
      ],
    },
    {
      id: "col-ready",
      title: "Ready",
      cards: [
        {
          id: "card-empty-states",
          title: "Empty states copy",
          details: "Finalize wording for empty lists on the dashboard so the UI feels complete before launch.",
        },
      ],
    },
    {
      id: "col-progress",
      title: "In Progress",
      cards: [
        {
          id: "card-invoice-export",
          title: "Invoice CSV export",
          details: "Add an export action on the invoices table that downloads the current filter as CSV.",
        },
        {
          id: "card-nav-audit",
          title: "Navigation audit",
          details: "Walk every primary route and note broken labels, missing pages, and inconsistent titles.",
        },
      ],
    },
    {
      id: "col-review",
      title: "Review",
      cards: [
        {
          id: "card-color-tokens",
          title: "Color token pass",
          details: "Check that headings, actions, and supporting text use the agreed palette across the board.",
        },
      ],
    },
    {
      id: "col-done",
      title: "Done",
      cards: [
        {
          id: "card-repo-setup",
          title: "Repository setup",
          details: "Next.js app, linting, and local run scripts are in place for the team.",
        },
      ],
    },
  ],
};
