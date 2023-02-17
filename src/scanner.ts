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

    public scanTokens(): Token[] {
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
            default:
                break;
        }
    }

    public addToken(type: TokenType) {
        this.addTokenWithLiteral(type, null);
        return;
    }

    public addTokenWithLiteral(type: TokenType, literal: unknown) {
        const text = this.source.substring(this.start, this.current);
        const token = new Token(type, text, literal, this.line);
        this.tokens.push(token);
    }

    public advance(): string {
        return this.source.charAt(++this.current);
    }

    public isAtEnd(): boolean {
        return this.current >= this.source.length;
    }
}
export default Scanner;
