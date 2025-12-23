# Redo–Undo Engine 🔁

A minimal and easy-to-use redo/undo command engine implemented with the Command pattern in plain JavaScript. This tiny engine tracks executed commands and supports undo and redo operations using `past` and `future` stacks.

---

## Overview ✅

This project demonstrates a simple redo/undo system where commands are objects that implement `do()` and `undo()` methods. The engine exposes three functions:

- `execute(command)` — Runs a command's `do()` and pushes it onto the `past` stack. Clears the `future` stack.
- `undo()` — Pops the last command from `past`, calls its `undo()`, and pushes it to `future`.
- `redo()` — Pops the last command from `future`, calls its `do()`, and pushes it back to `past`.

The implementation is small and dependency-free, making it easy to adapt into your own projects.

---

## Files 🔧

- `script.js` — Implementation of the engine and a small example showing how to use it.

---

## Usage 💡

You can run the example directly with Node or include the script in a browser and use the dev tools console.

Node:

```bash
node script.js
```

Browser:

- Include `script.js` in an HTML page and interact with the functions via the console.

---

## Example

The example in `script.js` uses a simple `value` variable and two helper functions `add(n)` and `subtract(n)` which create command objects and call `execute()`:

```js
let value = 0;

function add(n) {
  const prev = value;
  execute({
    do() {
      value += n;
      console.log(`Added ${n}, value = ${value}`);
    },
    undo() {
      value = prev;
      console.log(`Undo add, value = ${value}`);
    }
  });
}

function subtract(n) {
  const prev = value;
  execute({
    do() {
      value -= n;
      console.log(`Subtracted ${n}, value = ${value}`);
    },
    undo() {
      value = prev;
      console.log(`Undo subtract, value = ${value}`);
    }
  });
}

// Example flow
add(5);
subtract(3);
undo(); // undoes subtract
redo(); // re-applies subtract
```

---

## Extending / Tips ✨

- Commands only need to implement `do()` and `undo()`. Store any necessary prior state on the command object when it's created.
- For richer apps (text editors, drawing apps, etc.), serialize commands or keep lightweight diffs to reduce memory usage.
- You can add limiters (max history size) or grouping of commands to treat multiple operations as a single action.