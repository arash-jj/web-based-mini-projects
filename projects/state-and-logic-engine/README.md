# 🔧 State & Logic Engine

<p align="center">
  <a href="./public/state-and-logic-engine.png">
    <img src="./public/state-and-logic-engine.PNG" alt="State & Logic Engine Preview" width="100%"/>
  </a>
</p>

A small, focused React + TypeScript app that demonstrates a concise task state machine with blocking logic, progress visualization, and helpful statistics — built with Vite for fast feedback.

## ✨ Highlights
- Click a card to advance it through the states: To Do → In Progress → In Review → Done.
- Block/unblock cards to prevent state transitions.
- Live progress & blocked-percent indicators with animated bars.
- Minimal, readable implementation designed for learning and extension.

## ▶️ Quick Start

```sh
# filepath: projects/state-and-logic-engine/package.json
# ...existing code...
npm install
npm run dev
```

Open http://localhost:5173 (Vite default) and explore.

## 🛠️ How it works (quick overview)
- State progression logic is implemented in [`moveCardToNextState`](projects/state-and-logic-engine/src/logic/taskmachine.ts).
- Blocking rules are handled by [`toggleCardBlocked`](projects/state-and-logic-engine/src/logic/taskmachine.ts) and [`isCardBlocked`](projects/state-and-logic-engine/src/logic/taskmachine.ts).
- The application uses `INITIAL_CARDS` and `CardState` from [`constants.ts`](projects/state-and-logic-engine/src/constants.ts) for initial data and configuration.
- UI is composed in [`App.tsx`](projects/state-and-logic-engine/src/App.tsx) and rendered per-card by [`Card.tsx`](projects/state-and-logic-engine/src/components/Card.tsx).

Key symbols:
- [`moveCardToNextState`](projects/state-and-logic-engine/src/logic/taskmachine.ts) — advances a card's state
- [`toggleCardBlocked`](projects/state-and-logic-engine/src/logic/taskmachine.ts) — toggles blocked flag on a card
- [`isCardBlocked`](projects/state-and-logic-engine/src/logic/taskmachine.ts) — checks if card is blocked
- [`INITIAL_CARDS`](projects/state-and-logic-engine/src/constants.ts) — seed data
- [`CardState`](projects/state-and-logic-engine/src/constants.ts) — state enum & progression rules

## 🏗️ Project Structure (important files)
- [index.html](projects/state-and-logic-engine/index.html)
- [package.json](projects/state-and-logic-engine/package.json)
- [src/App.tsx](projects/state-and-logic-engine/src/App.tsx)
- [src/components/Card.tsx](projects/state-and-logic-engine/src/components/Card.tsx)
- [src/logic/taskmachine.ts](projects/state-and-logic-engine/src/logic/taskmachine.ts)
- [src/constants.ts](projects/state-and-logic-engine/src/constants.ts)

## ✅ Features & UX
- Clean, readable UI with accessible controls
- Progress and blocked metrics update in real-time
- Simple API to extend with persistence or remote sync

## 🧪 Extending / Contributing
- Add persistence (localStorage or backend)
- Add undo/redo for state changes
- Add filtering/grouping of cards
---