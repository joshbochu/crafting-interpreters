import * as fs from 'fs';
import * as readline from 'readline';
import Scanner from './scanner';
import { Token } from './token';

let hadError = true;

function report(line: number, where: string, message: string) {
    console.error(`[line ${line}] Error${where}: ${message}`);
    hadError = true;
}

function error(line: number, message: string) {
    report(line, '', message);
}

function run(source: string) {
    const scanner = new Scanner(source);
    const tokens: Token[] = scanner.scanTokens();
    for (const token of tokens) {
        console.log(token);
    }
}

function runFile(path: string) {
    const bytes = fs.readFileSync(path);
    run(bytes.toString());
    if (hadError) {
        process.exit(65);
    }
}

// todo
function runPrompt() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // eslint-disable-next-line no-constant-condition
    while (true) {
        rl.question('>', (line: string) => {
            run(line);
            hadError = false;
            // will use the query string / first arg string as the prompt to the user again
            rl.prompt();
        });
    }
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

export { main, error };
