/* eslint-disable @typescript-eslint/no-unused-vars */
import { Token, TokenType } from './alt-token';

const tokenize = (source: string): Token[] => {
    let tokens: Token[] = [];
    let start = 0;
    let cursor = 0;
    let line = 1;

    const addToken = (type: TokenType, literal: unknown = null) => {
        const lexeme = source.substring(start, cursor);
        tokens.push({ type, lexeme, literal, line });
    };

    const matchNext = (match: string) => {
        if (cursor + 1 < n && source.charAt(cursor + 1) === match) {
            return true;
        }
        return false;
    };

    const n = source.length;
    while (cursor < n) {
        const curChar = source.charAt(cursor);
        switch (curChar) {
            case ' ':
            case '\r':
            case '\t':
                break;
            case '\n:':
                line += 1
                break;
            case '(':
                addToken(TokenType.LEFT_PAREN);
                break;
            case ')':
                addToken(TokenType.RIGHT_PAREN);
                break;
            case '{':
                addToken(TokenType.LEFT_BRACE);
                break;
            case '}':
                addToken(TokenType.RIGHT_BRACE);
                break;
            case ',':
                addToken(TokenType.COMMA);
                break;
            case '.':
                addToken(TokenType.DOT);
                break;
            case '-':
                addToken(TokenType.MINUS);
                break;
            case '+':
                addToken(TokenType.PLUS);
                break;
            case ';':
                addToken(TokenType.SEMICOLON);
                break;
            case '*':
                addToken(TokenType.STAR);
                break;
            case '!':
                if (matchNext('=')) {
                    cursor += 1;
                    addToken(TokenType.BANG_EQUAL);
                } else {
                    addToken(TokenType.BANG);
                }
                break;
            case '=':
                if (matchNext('=')) {
                    cursor += 1;
                    addToken(TokenType.EQUAL_EQUAL);
                } else {
                    addToken(TokenType.EQUAL);
                }
                break;
            case '<':
                if (matchNext('=')) {
                    cursor += 1;
                    addToken(TokenType.LESS_EQUAL);
                } else {
                    addToken(TokenType.LESS);
                }
                break;
            case '>':
                if (matchNext('=')) {
                    cursor += 1;
                    addToken(TokenType.GREATER_EQUAL);
                } else {
                    addToken(TokenType.GREATER);
                }
                break;
            case '/':
                if (matchNext('/')) {
                    cursor += 1;
                    while (!matchNext('\n')) {
                        cursor += 1;
                    }
                } else {
                    addToken(TokenType.SLASH);
                }
                break;
            default:
                break;
        }
        cursor += 1;
    }
    addToken(TokenType.EOF, null);
    return tokens;
};
