# Virtualized List Engine (Vanilla JS) ⚙

A high-performance virtualized list implementation built from scratch using **Vanilla JavaScript**.

This project demonstrates how to efficiently render and scroll through **thousands of items** by rendering only a small, reusable subset of DOM nodes — the same core idea used in libraries like **React Virtualized** and **React Window**.

---

## 🚀 Demo Behavior

- Smooth scrolling through **10,000+ items**
- Constant, low DOM node count (≈10–15 elements)
- No performance degradation
- No external libraries

---

## 🧠 Core Concept

> The DOM should never know how big your data really is.

Instead of rendering all items:
- A **fixed-height spacer** creates the illusion of a large list
- A **small render window** displays only visible items
- Items are **reused and repositioned** as the user scrolls

This approach is known as **list virtualization / windowing**.

---

## 🧩 How It Works

1. **Data**
   - A large logical dataset (e.g. 10,000 items)

2. **Geometry**
   - Fixed item height
   - Fixed viewport height

3. **Scroll Mapping**
   - `scrollTop → startIndex`
   - Only render items in the visible range (+ overscan)

4. **Positioning**
   - The rendered list is moved using `transform: translateY(...)`
   - Individual items are never positioned manually

---

## 🛠 Tech Stack

- HTML
- CSS
- Vanilla JavaScript

No frameworks. No libraries.

---

## 📐 Key Calculations

```js
startIndex = Math.floor(scrollTop / itemHeight);
visibleCount = Math.ceil(viewportHeight / itemHeight);
renderCount = visibleCount + overscan;
