import { error } from 'src';
import { Token, TokenType } from './token';

class Scanner {
    source: string;
    tokens: Token[];
    start = 0;
    current = 0;
    line = 1;

    constructor(source: string) {
        this.source = source;
    }

    scanTokens(): Token[] {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }
        this.tokens.push(new Token(TokenType.EOF, '', null, this.line));
        return this.tokens;
    }

    private scanToken() {
        const c = this.advance();
        switch (c) {
            case '(':
                this.addToken(TokenType.LEFT_PAREN);
                break;
            case ')':
                this.addToken(TokenType.RIGHT_PAREN);
                break;
            case '{':
                this.addToken(TokenType.LEFT_BRACE);
                break;
            case '}':
                this.addToken(TokenType.RIGHT_BRACE);
                break;
            case ',':
                this.addToken(TokenType.COMMA);
                break;
            case '.':
                this.addToken(TokenType.DOT);
                break;
            case '-':
                this.addToken(TokenType.MINUS);
                break;
            case '+':
                this.addToken(TokenType.PLUS);
                break;
            case ';':
                this.addToken(TokenType.SEMICOLON);
                break;
            case '*':
                this.addToken(TokenType.STAR);
                break;
            case '!':
                this.addToken(
                    this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG
                );
                break;
            case '=':
                this.addToken(
                    this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL
                );
                break;
            case '<':
                this.addToken(
                    this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS
                );
                break;
            case '>':
                this.addToken(
                    this.match('=')
                        ? TokenType.GREATER_EQUAL
                        : TokenType.GREATER
                );
                break;
            default:
                error(this.line, 'Unexpected character.');
                break;
        }
    }

    private match(expected: string) {
        if (this.isAtEnd()) return false;
        if (this.source.charAt(this.current) !== expected) return false;
        this.current++;
        return true;
    }

    private addToken(type: TokenType) {
        this.addTokenWithLiteral(type, null);
        return;
    }

    private addTokenWithLiteral(type: TokenType, literal: unknown) {
        const text = this.source.substring(this.start, this.current);
        const token = new Token(type, text, literal, this.line);
        this.tokens.push(token);
    }

    private advance(): string {
        return this.source.charAt(++this.current);
    }

    private isAtEnd(): boolean {
        return this.current >= this.source.length;
    }
}
export default Scanner;
