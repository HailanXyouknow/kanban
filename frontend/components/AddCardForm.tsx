"use client";

import { FormEvent, useState } from "react";

type AddCardFormProps = {
  columnId: string;
  onAdd: (title: string, details: string) => void;
};

export function AddCardForm({ columnId, onAdd }: AddCardFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  function reset() {
    setTitle("");
    setDetails("");
    setOpen(false);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextTitle = title.trim();
    const nextDetails = details.trim();
    if (!nextTitle || !nextDetails) {
      return;
    }
    onAdd(nextTitle, nextDetails);
    reset();
  }

  if (!open) {
    return (
      <button
        type="button"
        data-testid={`add-card-toggle-${columnId}`}
        onClick={() => setOpen(true)}
        className="mt-3 w-full text-left text-sm font-medium text-primary hover:underline"
      >
        Add a card
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-2">
      <input
        data-testid={`add-card-title-${columnId}`}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
        className="w-full rounded-md border border-black/10 bg-white px-2 py-1.5 text-sm text-navy outline-none focus:border-accent"
      />
      <textarea
        data-testid={`add-card-details-${columnId}`}
        value={details}
        onChange={(event) => setDetails(event.target.value)}
        placeholder="Details"
        rows={3}
        className="w-full resize-none rounded-md border border-black/10 bg-white px-2 py-1.5 text-sm text-navy outline-none focus:border-accent"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          data-testid={`add-card-submit-${columnId}`}
          className="rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-white hover:brightness-110"
        >
          Add
        </button>
        <button type="button" onClick={reset} className="text-sm text-muted hover:text-navy">
          Cancel
        </button>
      </div>
    </form>
  );
}
