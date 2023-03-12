import { Binary } from './expr';
import { Token, TokenType } from './token';

class Parser {
    private readonly tokens;
    private current = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    private equality(): Expr {
        let expr = this.comparison();
        while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
            const operator = this.previous();
            const right = this.comparison();
            expr = new Binary(expr, operator, right);
        }
        return expr;
    }
}
