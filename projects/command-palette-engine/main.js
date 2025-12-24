// Commands List
const commands = [
    {
        id: "new-file",
        title: "New File",
        subtitle: "Create a new untitled file",
        tags: ["file", "create"],
        run: () => console.log("Dummy: New File"),
    },
    {
        id: "open-settings",
        title: "Open Settings",
        subtitle: "Open app settings (dummy)",
        tags: ["settings", "preferences"],
        run: () => console.log("Dummy: Open Settings"),
    },
    {
        id: "toggle-theme",
        title: "Toggle Theme",
        subtitle: "Switch light/dark (dummy)",
        tags: ["view", "theme"],
        run: toggleTheme,
    },
    {
        id: "run-lint",
        title: "Run Linter",
        subtitle: "Run lint checks (dummy)",
        tags: ["tools", "lint"],
        run: () => console.log("Dummy: Linting..."),
    },
    {
        id: "show-help",
        title: "Show Help",
        subtitle: "Open help overlay (dummy)",
        tags: ["help", "info"],
        run: () => console.log("Dummy: Help shown"),
    },
    {
        id: "save-file",
        title: "Save File",
        subtitle: "Save the current file",
        tags: ["file", "save"],
        run: () => console.log("Dummy: File saved"),
    },
    {
        id: "close-file",
        title: "Close File",
        subtitle: "Close the current file",
        tags: ["file", "close"],
        run: () => console.log("Dummy: File closed"),
    },
    {
        id: "duplicate-line",
        title: "Duplicate Line",
        subtitle: "Duplicate the current line",
        tags: ["edit", "line"],
        run: () => console.log("Dummy: Line duplicated"),
    },
    {
        id: "format-document",
        title: "Format Document",
        subtitle: "Run code formatter",
        tags: ["edit", "format"],
        run: () => console.log("Dummy: Document formatted"),
    },
    {
        id: "show-command-palette",
        title: "Show Command Palette",
        subtitle: "Open the command palette",
        tags: ["view", "palette"],
        run: openPalette,
    },
];
// DOM Elements
const palette = document.getElementById("palette");
const input = document.getElementById("palette-input");
const results = document.getElementById("palette-results");
const openBtn = document.getElementById("open-palette");
let filtered = commands.slice();
let selectedIndex = 0;
// Open and close palette
function openPalette() {
    palette.setAttribute("aria-hidden", "false");
    input.value = "";
    filtered = commands.slice();
    renderResults();
    setTimeout(() => input.focus(), 50);
}
function closePalette() {
    palette.setAttribute("aria-hidden", "true");
    selectedIndex = 0;
    input.blur();
}
// Keyboard shortcuts
function onKeyDown(e) {
    if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (palette.getAttribute("aria-hidden") === "true") openPalette();
        else closePalette();
        return;
    }
    if (palette.getAttribute("aria-hidden") === "true") return;
    switch (e.key) {
        case "Escape":
        closePalette();
        break;
        case "ArrowDown":
        selectedIndex = Math.min(filtered.length - 1, selectedIndex + 1);
        renderResults();
        break;
        case "ArrowUp":
        selectedIndex = Math.max(0, selectedIndex - 1);
        renderResults();
        break;
        case "Enter":
        e.preventDefault();
        executeCommand(selectedIndex);
        break;
        default:
        break;
    }
}
// Command Execution
function executeCommand(index) {
    const cmd = filtered[index];
    if (!cmd) return;
    try {
        cmd.run();
    } catch (e) {
        console.error(e);
    }
    closePalette();
}
// Render Results
function renderResults() {
    results.innerHTML = "";
    if (filtered.length === 0) {
        const li = document.createElement("li");
        li.className = "palette-item";
        li.innerHTML =
        '<div class="title">No commands</div><div class="subtitle">Try a different query</div>';
        results.appendChild(li);
        return;
    }
    filtered.forEach((cmd, i) => {
        const li = document.createElement("li");
        li.className = "palette-item";
        li.setAttribute("role", "option");
        li.setAttribute("data-id", cmd.id);
        li.setAttribute("aria-selected", String(i === selectedIndex));
        li.innerHTML = `<div class="title">${cmd.title}</div><div class="subtitle">${cmd.subtitle}</div>`;
        li.addEventListener("click", () => {
        executeCommand(i);
        });
        results.appendChild(li);
    });
    const selected = results.querySelector('[aria-selected="true"]');
    if (selected) selected.scrollIntoView({ block: "nearest" });
}
// Search Logic
function tokenize(query) {
    return query.toLowerCase().split(" ").filter(Boolean);
}
function scoreItem(item, tokens) {
    let score = 0;
    const title = item.title.toLowerCase();
    const tags = (item.tags || []).map((tag) => String(tag).toLowerCase());
    tokens.forEach((token) => {
        if (title.startsWith(token)) score += 15;
        else if (title.includes(token)) score += 10;
        if (tags.includes(token)) {
        score += 5;
        }
    });
    return score;
}
function search(query) {
    const tokens = tokenize(query);
    const results = commands
        .map((item) => ({
        item,
        score: scoreItem(item, tokens),
        }))
        .filter((result) => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((result) => result.item);
    return results;
}
// Input Event
function onInput(e) {
    const q = e.target.value;
    const t = q.trim();
    if (!t) {
        filtered = commands.slice();
        selectedIndex = 0;
        renderResults();
        return;
    }
    filtered = search(t);
    selectedIndex = 0;
    renderResults();
}
function toggleTheme() {
    document.body.classList.toggle("light");
    if (document.body.classList.contains("light")) {
        document.body.style.background = "#f7fafc";
        document.body.style.color = "#071126";
    } else {
        document.body.style.background = "";
        document.body.style.color = "";
    }
    console.log("Dummy: Theme toggled");
}
// wire up
document.addEventListener("keydown", onKeyDown);
input.addEventListener("input", onInput);
openBtn.addEventListener("click", openPalette);
// allow clicking backdrop to close
palette.addEventListener("click", (e) => {
    if (e.target === palette) closePalette();
});
results.addEventListener("keydown", (e) => {
    if (e.key === "Enter") executeCommand(selectedIndex);
});
// initial render
renderResults();
