import { Token, TokenType } from '../token';
import { Scanner } from '../scanner';
import { Binary, Unary, Literal, Grouping } from '../expr';
import { AstPrinter } from '../ast-printer';

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

test('produces correct expression', () => {
    const expression = new Binary(
        new Unary(new Token(TokenType.MINUS, '-', null, 1), new Literal(123)),
        new Token(TokenType.STAR, '*', null, 1),
        new Grouping(new Literal(45.67))
    );
    const actual = new AstPrinter().print(expression);
    const expected = '(* (- 123) (group 45.67))';
    expect(actual).toEqual(expected);
});
