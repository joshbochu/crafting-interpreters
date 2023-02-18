/* eslint-disable @typescript-eslint/no-explicit-any */

enum TokenType {
    // Single-character tokens.
    LEFT_PAREN,
    RIGHT_PAREN,
    LEFT_BRACE,
    RIGHT_BRACE,
    COMMA,
    DOT,
    MINUS,
    PLUS,
    SEMICOLON,
    SLASH,
    STAR,

    // One or two character tokens.
    BANG,
    BANG_EQUAL,
    EQUAL,
    EQUAL_EQUAL,
    GREATER,
    GREATER_EQUAL,
    LESS,
    LESS_EQUAL,

    // Literals.
    IDENTIFIER,
    STRING,
    NUMBER,

    // Keywords.
    AND,
    CLASS,
    ELSE,
    FALSE,
    FUN,
    FOR,
    IF,
    NIL,
    OR,
    PRINT,
    RETURN,
    SUPER,
    THIS,
    TRUE,
    VAR,
    WHILE,
    EOF
}

const TOKEN_TYPE = {
    [TokenType.LEFT_PAREN]: 'LEFT_PAREN',
    [TokenType.RIGHT_PAREN]: 'RIGHT_PAREN',
    [TokenType.LEFT_BRACE]: 'LEFT_BRACE',
    [TokenType.RIGHT_BRACE]: 'RIGHT_BRACE',
    [TokenType.COMMA]: 'COMMA',
    [TokenType.DOT]: 'DOT',
    [TokenType.MINUS]: 'MINUS',
    [TokenType.PLUS]: 'PLUS',
    [TokenType.SEMICOLON]: 'SEMICOLON',
    [TokenType.SLASH]: 'SLASH',
    [TokenType.STAR]: 'STAR',
    [TokenType.BANG]: 'BANG',
    [TokenType.BANG_EQUAL]: 'BANG_EQUAL',
    [TokenType.EQUAL]: 'EQUAL',
    [TokenType.EQUAL_EQUAL]: 'EQUAL_EQUAL',
    [TokenType.GREATER]: 'GREATER',
    [TokenType.GREATER_EQUAL]: 'GREATER_EQUAL',
    [TokenType.LESS]: 'LESS',
    [TokenType.LESS_EQUAL]: 'LESS_EQUAL',
    [TokenType.IDENTIFIER]: 'IDENTIFIER',
    [TokenType.STRING]: 'STRING',
    [TokenType.NUMBER]: 'NUMBER',
    [TokenType.AND]: 'AND',
    [TokenType.CLASS]: 'CLASS',
    [TokenType.ELSE]: 'ELSE',
    [TokenType.FALSE]: 'FALSE',
    [TokenType.FUN]: 'FUN',
    [TokenType.FOR]: 'FOR',
    [TokenType.IF]: 'IF',
    [TokenType.NIL]: 'NIL',
    [TokenType.OR]: 'OR',
    [TokenType.PRINT]: 'PRINT',
    [TokenType.RETURN]: 'RETURN',
    [TokenType.SUPER]: 'SUPER',
    [TokenType.THIS]: 'THIS',
    [TokenType.TRUE]: 'TRUE',
    [TokenType.VAR]: 'VAR',
    [TokenType.WHILE]: 'WHILE',
    [TokenType.EOF]: 'EOF'
};
class Token {
    type: TokenType;
    lexeme: string;
    literal: any;
    line: number;

    getTokenTypeName(tokenType: TokenType) {
        const typeName = TOKEN_TYPE[tokenType];
        return typeName !== undefined ? typeName : 'Unknown TokenType';
    }

    constructor(type: TokenType, lexeme: string, literal: any, line: number) {
        this.type = type;
        this.lexeme = lexeme;
        this.literal = literal;
        this.line = line;
    }

    public toString(): string {
        const type = this.getTokenTypeName(this.type);
        return `${type} ${this.lexeme} ${this.literal ?? ''}`;
    }
}

export { Token, TokenType };
