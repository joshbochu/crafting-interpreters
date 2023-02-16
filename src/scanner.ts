import { Token, TokenType } from './token';

class Scanner {
    source: string;
    tokens: Token[] = [];
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

    public scanToken() {
        const c = '';
        // const c = advance();
        switch (c) {
            case '('
        }
    }

    public isAtEnd(): boolean {
        return this.current >= this.source.length;
    }
}
export default Scanner;
