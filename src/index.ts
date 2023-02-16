import * as fs from 'fs';

function runFile(path: string) {
    const bytes = fs.readFileSync(path);
    // run(bytes.toString());
}

// todo
function runPrompt() {
    return;
}

function main() {
    const args = process.argv.slice(2);
    if (args.length > 1) {
        console.log('Usage: jlox [script]');
        process.exit(64);
    } else if (args.length === 1) {
        runFile(args[0]);
    } else {
        runPrompt();
    }
}

main();
