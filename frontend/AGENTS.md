# Frontend agent notes

This is the Kanban frontend app. Keep changes small, focused, and consistent with the project requirements in the root AGENTS.md file.

## Requirements

- Single board, fixed 5 columns
- Cards have a title and details only
- Drag and drop between columns
- Add and delete cards
- No persistence, no user management, no search/filter
- Prefer simple, polished UI over extra features

## Commands

```bash
npm install
npm run dev
npm test
npx playwright install chromium
npx playwright test
```

Run commands from this folder, not the repo root.
