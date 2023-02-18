import { Token, TokenType } from '../token';
import { Scanner } from '../scanner';

test('produces correct tokens', () => {
    const scanner = new Scanner(`var foo = "bar"`);
    const actual = scanner.scanTokens();
    const expected = [
        new Token(TokenType.VAR, 'var', null, 1),
        new Token(TokenType.IDENTIFIER, 'foo', null, 1),
        new Token(TokenType.EQUAL, '=', null, 1),
        new Token(TokenType.STRING, `"bar"`, 'bar', 1),
        new Token(TokenType.EOF, '', null, 1)
    ];
    expect(actual).toStrictEqual(expected);
});
