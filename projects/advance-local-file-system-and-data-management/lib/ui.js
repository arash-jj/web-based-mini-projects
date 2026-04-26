import readline from 'readline';

export const colors = {
    reset: '\x1b[0m',
    bold: txt => `\x1b[1m${txt}${colors.reset}`,
    dim: txt => `\x1b[2m${txt}${colors.reset}`,
    cyan: txt => `\x1b[36m${txt}${colors.reset}`,
    green: txt => `\x1b[32m${txt}${colors.reset}`,
    red: txt => `\x1b[31m${txt}${colors.reset}`,
    yellow: txt => `\x1b[33m${txt}${colors.reset}`
}

export const clearScreen = () => {
    process.stdout.write('\x1Bc');
}

export const spinner = (message) => {
    const frames = ['⠋','⠙','⠇','⠴','⠦','⠇']
    let i = 0;
    const interval = setInterval(() => {
        process.stdout.write(`\r${colors.cyan(frames[i])} ${message}`);
        i = (i + 1) % frames.length;
    }, 80);
    return {
        stop(success = true) {
            clearInterval(interval);
            process.stdout.write(
                `\r${success ? colors.green("ok") : colors.red("no")} ${message}\n`
            )
        }
    }
}

export const inputPrompt = (question) => {
    restoreInput();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    return new Promise(resolve => {
        rl.question(colors.bold(question + " "), answer => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

export const selectMenu = async (title, choices) => {
    return new Promise(resolve => {
        let selected = 0;
        clearScreen();
        console.log(colors.bold(title));
        console.log("");
        const render = () => {
            clearScreen();
            console.log(colors.bold(title));
            console.log("");
            choices.forEach((choices, idx) => {
                const prefix = idx === selected ? colors.cyan(">") : " ";
                const text = idx === selected ? colors.bold(choices) : colors.dim(choices);
                console.log(`${prefix} ${text}`);
            });
            console.log(colors.dim("\nUse ↑ ↓ and Enter"));
        }
        render();
        readline.emitKeypressEvents(process.stdin);
        if(process.stdin.isTTY) process.stdin.setRawMode(true);
        const onKeyPress = (str, key) => {
            if(key.name === "down") {
                selected = (selected + 1) % choices.length;
                render();
            } else if (key.name === "up") {
                selected = (selected - 1 + choices.length) % choices.length;
                render();
            } else if (key.name === "return") {
                restoreInput();
                resolve(choices[selected]);
            } else if (key.ctrl && key.name === "c") {
                restoreInput();
                console.log('n\Exiting...\n');
                process.exit(0);
            }
        }
        process.stdin.on("keypress", onKeyPress);
    })
}

export const titleScreen = async () => {
    clearScreen();
    console.log(colors.bold("Project Manager CLI"));
    console.log(colors.dim("Initializing... \n"))
    const steps = [
        "Loading database",
        "Preparing UI",
        "Starting modules"
    ];
    for (const step of steps) {
        const spin = spinner(step);
        await new Promise(r => setTimeout(r, 800));
        spin.stop(true);
    }
    console.log("")
}

export const restoreInput = () => {
    if(process.stdin.isTTY) {
        try {
            process.stdin.setRawMode(false);
        } catch (error) {
            console.error(error);
        }
    }
    process.stdin.removeAllListeners("keypress");
}