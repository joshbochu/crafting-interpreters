import { Binary, Expr } from './expr';
import { Token, TokenType } from './token';

export class Parser {
    tokens: Token[];
    current = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    expression(): Expr {
        return this.equality();
    }

    equality(): Expr {
        let expr = this.comparison();
        while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL)) {
            const operator: Token = this.previous();
            const right = this.comparison();
            expr = new Binary(expr, operator, right);
        }
        return expr;
    }

    comparison(): Expr {
        return {} as Expr;
    }

    match(...types: TokenType[]): boolean {
        for (const t of types) {
            if (this.check(t)) {
                this.advance();
                return true;
            }
        }
        return false;
    }

    check(type: TokenType) {
        if (this.isAtEnd()) return false;
        return this.peek().type === type;
    }

    advance() {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    }

    isAtEnd() {
        return this.peek().type === TokenType.EOF;
    }

    peek() {
        return this.tokens[this.current];
    }

    previous() {
        return this.tokens[this.current - 1];
    }
}
