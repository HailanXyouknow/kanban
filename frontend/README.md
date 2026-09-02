# Kanban

Single-board project board. No persistence; reload restores dummy data.

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Testing

```bash
npm test
npx playwright install chromium
npx playwright test
```

## Product scope

- Fixed 5-column board
- Column renaming
- Add and delete cards
- Drag and drop card movement
- Preloaded dummy board data

This app is intentionally kept simple and does not include persistence, user accounts, archives, or filters.
