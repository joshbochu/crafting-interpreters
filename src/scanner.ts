import { Token } from './token';

class Scanner {
    source: string;

    constructor(source: string) {
        this.source = source;
    }

    public scanTokens(): Token[] {
        return [];
    }
}
export default Scanner;
