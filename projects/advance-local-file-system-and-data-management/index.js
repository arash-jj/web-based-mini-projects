#!/usr/bin/env node 
import { addProjects, listProjects, searchProjects } from './lib/actions.js';
const args = process.argv.slice(2);
const command = args[0];

const main = async () => {
    switch (command) {
        case "add":
            await addProjects();
            break;
        case "list":
            await listProjects();
            break;
        case "search":
            await searchProjects(args[1]);
            break;
        default:
            console.log("Usage:");
            console.log(" node index.js add");
            console.log(" node index.js list");
            console.log(" node index.js search <keyword>");
            break;
    }
}

main();