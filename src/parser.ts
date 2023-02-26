/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Binary, Expr, Grouping, Literal, Unary } from './expr';
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
        let expr = this.term();
        while (
            this.match(
                TokenType.GREATER,
                TokenType.GREATER_EQUAL,
                TokenType.LESS,
                TokenType.LESS_EQUAL
            )
        ) {
            const operator = this.previous();
            const right = this.term();
            expr = new Binary(expr, operator, right);
        }
        return expr;
    }

    term(): Expr {
        let expr = this.factor();
        while (
            this.match(
                TokenType.MINUS,
                TokenType.PLUS,
                TokenType.LESS,
                TokenType.LESS_EQUAL
            )
        ) {
            const operator = this.previous();
            const right = this.factor();
            expr = new Binary(expr, operator, right);
        }
        return expr;
    }

    factor(): Expr {
        let expr = this.unary();
        while (this.match(TokenType.SLASH, TokenType.STAR)) {
            const operator = this.previous();
            const right = this.unary();
            expr = new Binary(expr, operator, right);
        }
        return expr;
    }

    unary(): Expr {
        if (this.match(TokenType.BANG, TokenType.MINUS)) {
            const operator = this.previous();
            const right = this.unary();
            return new Unary(operator, right);
        }
        return this.primary();
    }

    primary(): Expr {
        if (this.match(TokenType.LEFT_PAREN)) {
            const expr = this.expression();
            this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.");
            return new Grouping(expr);
        }
        if (this.match(TokenType.FALSE)) return new Literal(false);
        if (this.match(TokenType.TRUE)) return new Literal(true);
        if (this.match(TokenType.NUMBER, TokenType.STRING))
            return new Literal(this.previous().literal);
        return new Literal(null);
    }

    //@ts-ignore
    consume(type: TokenType, message: string): Token {
        return { type, message } as unknown as Token;
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
