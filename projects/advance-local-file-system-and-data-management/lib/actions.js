import readline from 'readline';
import { loadDB, saveDB } from './db.js';

const ask = (question) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> "
    });
    rl.prompt();
    return new Promise(resolve => 
        rl.question(question, answer => {
            rl.close();
            resolve(answer.trim());
        })
    );
}

export const addProjects = async () => {
    const name = await ask("Project Name: ");
    const description = await ask("Description: ");
    const tech = await ask("Technologies (comma separated): ");
    const folder = await ask("Local path: ");
    const db = await loadDB();
    db.push({
        id: Date.now(),
        name,
        description, 
        tech: tech.split(",").map(s => s.trim()),
        folder,
        createdAt: new Date().toISOString()
    })
    await saveDB(db);
    console.log("Project saved!");
}

export const listProjects = async () => {
    const db = await loadDB();
    console.log("\nYour Projects:");
    db.forEach(p => {
        console.log(`- ${p.name} (${p.tech.join(', ')})`);
    });
}

function tokenize(query) {
    return query
    .toLowerCase()
    .split(" ")
    .filter(Boolean);
}
function scoreItem(item, tokens) {
    let score = 0;
    const title = item.name.toLowerCase();
    const tags = item.tech.map(tag => tag.toLowerCase());
    tokens.forEach(token => {
        if (title.startsWith(token)) score += 15;
        else if (title.includes(token)) score += 10;
        if (tags.includes(token)) {
        score += 5;
        }
    });
    return score;
}
export const searchProjects = async (query) => {
    const tokens = tokenize(query);
    const db = await loadDB();
    const results = db
    if (results.length === 0) console.log("NO MATCH FOUND !")
    db.map(item => ({
        item,
        score: scoreItem(item, tokens)
    }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.item);
    console.log(results);
    
}
