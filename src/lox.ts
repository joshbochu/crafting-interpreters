/* eslint-disable no-constant-condition */
import * as fs from 'fs';
import * as readline from 'readline';
import { Scanner } from './scanner';
import { Token } from './token';

export class Lox {
    static hadError = false;

    static main() {
        const args = process.argv.slice(2);
        if (args.length > 1) {
            console.log('Usage: jlox [script]');
            process.exit(64);
        } else if (args.length === 1) {
            Lox.runFile(args[0]);
        } else {
            Lox.runPrompt();
            Lox.hadError = false;
        }
    }

    static report(line: number, where: string, message: string) {
        console.error(`[line ${line}] Error${where}: ${message}`);
        Lox.hadError = true;
    }

    static error(line: number, message: string) {
        Lox.report(line, '', message);
    }

    static run(source: string) {
        const scanner = new Scanner(source);
        const tokens: Token[] = scanner.scanTokens();
        for (const token of tokens) {
            console.log(token.toString());
        }
    }

    static runFile(path: string) {
        const bytes = fs.readFileSync(path);
        Lox.run(bytes.toString());
        if (Lox.hadError) {
            process.exit(65);
        }
    }

    static async runPrompt() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        while (true) {
            const input = await new Promise<string>((resolve) => {
                rl.question('> ', resolve);
            });
            Lox.run(input);
        }
    }
}
