let past = [];
let future = [];

function execute(command) {
    command.do();
    past.push(command);
    future = [];
}
function undo() {
    if (past.length === 0) return;
    const command = past.pop();
    command.undo();
    future.push(command);
}
function redo() {
    if (future.length === 0) return;
    const command = future.pop();
    command.do();
    past.push(command);
}
// Example usage:
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
// Testing the redo-undo engine
add(5);
subtract(3);
undo();