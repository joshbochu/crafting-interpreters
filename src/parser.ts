import { Token } from './token';

class Parser {
    private readonly tokens;
    private current = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }
}
