const items = [
    { id: 1, title: "JavaScript Undo System", tags: ["js", "state"] },
    { id: 2, title: "React Virtual List", tags: ["react", "performance"] },
    { id: 3, title: "CSS Grid Layout", tags: ["css", "layout"] },
    { id: 4, title: "Next.js Search Page", tags: ["next", "search"] }
];

function tokenize(query) {
    return query
    .toLowerCase()
    .split(" ")
    .filter(Boolean);
}
function scoreItem(item, tokens) {
    let score = 0;
    const title = item.title.toLowerCase();
    const tags = item.tags.map(tag => tag.toLowerCase());
    tokens.forEach(token => {
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
    const results = items
        .map(item => ({
            item,
            score: scoreItem(item, tokens)
        }))
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(result => result.item);
    return results;
}
// Example usage:
const query = "js search";
const results = search(query);
console.log(results);