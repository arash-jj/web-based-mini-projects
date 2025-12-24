# Command Palette Engine ⚡

A tiny, pluggable command palette demo that shows how you can add a searchable, keyboard-driven command UI to any web project.
“Built with vanilla JavaScript to keep the logic framework-agnostic and reusable.”

---

## 🚀 Quick overview

- **Live demo:** Open `index.html` in your browser
- **Keyboard:** Press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> or click the **⌘ K** button
- **Search:** Type to filter commands using a tokenized scoring search engine (by title and optional tags)

---

## 🎯 Why this project?

Command palettes are a common UX pattern in modern tools like VS Code, Notion, and Linear.  
This project focuses on building the core logic — search, ranking, and keyboard interaction — in a framework-agnostic way that can later be reused in React, Next.js, or other environments.

---

## ✨ Highlights

- Lightweight, dependency-free JavaScript
- Tokenized search with scoring (prefix matches boost score)
- Simple command structure: id, title, subtitle, run (function), optional `tags`
- Accessible UI with keyboard navigation and ARIA attributes

---

## 📋 Features

- Add commands in `main.js` (see `commands` array)
- Automatic ranking via `scoreItem` (title startsWith > title includes > tag matches)
- Works offline — just open `index.html` or serve the folder
- Focused UX: keyboard support, click-to-execute, and fallback when no results

---

## 🔧 Quick start

1. Clone or download the repository
2. Open `projects/command-palette-engine/index.html` in your browser

Or serve the folder (recommended) to avoid CORS issues:

```bash
# simple python server
python -m http.server 8000
# or use a node static server if you prefer
npx serve .
```

Then browse to `http://localhost:8000/projects/command-palette-engine/` and press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd>.

---

## 🧠 How the search works

- Query is lower-cased and tokenized on spaces
- Each command is scored by `scoreItem`:
  - +15 points if title starts with a token
  - +10 points if title includes a token
  - +5 points if a token matches any `tags`
- Results with score > 0 are returned, sorted by score

Tip: add descriptive `tags` to commands to improve discoverability.

---

## ✍️ Add / Customize commands

Edit `projects/command-palette-engine/main.js` and update the `commands` array. Each command looks like:

```js
{
  id: 'save-file',
  title: 'Save File',
  subtitle: 'Save the current file',
  tags: ['file', 'save'], // optional
  run: () => { /* your logic */ }
}
```

To tune ranking, update `scoreItem` in the same file.

---

## ✅ Accessibility & UX

- ARIA attributes on the palette and items
- Keyboard navigation (ArrowUp / ArrowDown / Enter / Escape)
- Offers a helpful message when there are no matching commands

---
> 💡 Tip: Use this repo as a minimal starting point for building richer command palettes — connect it to application state, add fuzzy matching or fuzzy libraries, or integrate with keyboard shortcut registries.

Enjoy! 🎯
