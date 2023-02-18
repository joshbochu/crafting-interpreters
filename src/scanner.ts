import { error } from './lox';
import { Token, TokenType } from './token';

class Scanner {
    source: string;
    tokens: Token[] = [];
    start = 0;
    current = 0;
    line = 1;
    keywords: Map<string, TokenType> = new Map([
        ['and', TokenType.AND],
        ['class', TokenType.CLASS],
        ['else', TokenType.ELSE],
        ['false', TokenType.FALSE],
        ['for', TokenType.FOR],
        ['fun', TokenType.FUN],
        ['if', TokenType.IF],
        ['nil', TokenType.NIL],
        ['or', TokenType.OR],
        ['print', TokenType.PRINT],
        ['return', TokenType.RETURN],
        ['super', TokenType.SUPER],
        ['this', TokenType.THIS],
        ['true', TokenType.TRUE],
        ['var', TokenType.VAR],
        ['while', TokenType.WHILE]
    ]);

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

    scanToken() {
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
            case '/':
                if (this.match('/')) {
                    // we use newline so scan loop re-runs and we can incr line num
                    while (this.peek() !== '\n' && !this.isAtEnd()) {
                        this.advance();
                    }
                } else {
                    this.addToken(TokenType.SLASH);
                }
                break;
            // ignore whitespace
            case ' ':
            case '\r':
            case '\t':
                break;
            case '\n:':
                this.line++;
                break;
            case '"':
                this.string();
                break;
            default:
                if (this.isDigit(c)) {
                    this.number();
                } else if (this.isAlpha(c)) {
                    this.identifier();
                } else {
                    error(this.line, 'Unexpected character.');
                }
                break;
        }
    }

    isAlpha(c: string): boolean {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
    }

    isAlphaNumeric(c: string) {
        return this.isAlpha(c) || this.isDigit(c);
    }

    identifier() {
        while (this.isAlphaNumeric(this.peek())) this.advance();
        const text = this.source.substring(this.start, this.current);
        const tokenType = this.keywords.get(text) ?? TokenType.IDENTIFIER;
        this.addToken(tokenType);
    }

    number() {
        while (this.isDigit(this.peek())) this.advance();
        if (this.peek() === '.' && this.peekNext()) {
            this.advance();
            while (this.isDigit(this.peek())) this.advance();
        }
        const value = this.source.substring(this.start, this.current);
        console.log(value);
        this.addTokenWithLiteral(TokenType.NUMBER, value);
    }

    peekNext() {
        if (this.current + 1 < this.source.length) {
            return this.source.charAt(this.current + 1);
        }
        return '\0';
    }

    isDigit(c: string) {
        return c >= '0' && c <= '9';
    }

    string() {
        if (this.peek() !== '"' && !this.isAtEnd()) {
            if (this.peek() === '\n') this.line++;
            this.advance();
        }

        if (this.isAtEnd()) {
            error(this.line, 'unterminated string');
            return;
        }

        this.advance();

        const num = parseFloat(
            this.source.substring(this.start + 1, this.current - 1)
        );
        this.addTokenWithLiteral(TokenType.STRING, num);
    }

    peek(): string {
        if (this.isAtEnd()) return '\0';
        return this.source.charAt(this.current);
    }

    match(expected: string) {
        if (this.isAtEnd()) return false;
        if (this.source.charAt(this.current) !== expected) return false;
        this.current++;
        return true;
    }

    addToken(type: TokenType) {
        this.addTokenWithLiteral(type, null);
        return;
    }

    addTokenWithLiteral(type: TokenType, literal: unknown) {
        const text = this.source.substring(this.start, this.current);
        const token = new Token(type, text, literal, this.line);
        this.tokens.push(token);
    }

    advance(): string {
        return this.source.charAt(this.current++);
    }

    isAtEnd(): boolean {
        return this.current >= this.source.length;
    }
}
export default Scanner;
