# Search Query Engine 🔍

A small, dependency-free search scoring engine implemented in plain JavaScript. It tokenizes a search query, scores items by how well their titles and tags match the tokens, and returns sorted results.

---

## Overview ✅

This project demonstrates a simple query tokenizer, scoring function, and ranking pipeline you can embed into small apps or prototypes. The algorithm:

- Tokenizes the query by lowercasing and splitting on whitespace.
- Assigns positive scores when title starts with or contains tokens, and when tags match tokens.
- Sums scores and returns only those items with a score > 0, sorted by descending score.

It's intentionally compact and easy to adapt.

---

## Files 🔧

- `script.js` — Implementation of the tokenizer, scorer, and `search(query)` function with a small example dataset.

---

## Usage 💡

Run the example with Node or include the script in a browser and call `search()` from the console.

Node:

```bash
node script.js
```

Browser:

- Include `script.js` into an HTML page and call `search('your query')` in the developer console.

---

## Example

Given the example item list in `script.js` you can search like this:

```js
const query = "js search";
const results = search(query);
console.log(results);
```

The `search` function tokenizes `query` into tokens and returns the best matching items based on the scoring rules.

---

## How scoring works ✨

- `title.startsWith(token)` → +15 points
- `title.includes(token)` → +10 points
- `tags` containing token → +5 points

This simple weighting favors exact/leading matches in titles while still rewarding tag matches.

---

## Extending & Improvements 🚀

- Add fuzzy matching (Levenshtein / trigram) for typos.
- Use stemming or synonyms to improve recall.
- Add weighting configuration for different fields (title, tags, description).
- Introduce stop-word removal and token normalization for better results.
- Add persistent precomputed indices (in-memory maps or tries) for faster lookups on larger datasets.
