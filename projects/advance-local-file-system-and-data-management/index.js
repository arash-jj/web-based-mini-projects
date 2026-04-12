#!/usr/bin/env node 
import { addProjects, listProjects, searchProjects } from './lib/actions.js';
import { selectMenu, titleScreen } from './lib/ui.js';
const args = process.argv.slice(2);
const command = args[0];

const main = async () => {
    await titleScreen();
    const choice = await selectMenu("what do you want to do ?", [
        "Add New Project",
        "List All Projects",
        "Find Specific Projects",
        "Exit"
    ]);
    switch (choice) {
        case "Add New Project":
            addProjects()
            break;
        case "List All Projects":
            listProjects()
            break;
        case "Find Specific Projects":
            searchProjects()
            break;
        default:
            process.exit(1)
            break;
    }
}

main();