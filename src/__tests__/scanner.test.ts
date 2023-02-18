import { Scanner } from '../scanner';

test('produces correct tokens', () => {
    const scanner = new Scanner(`var foo = "bar"`);
    const actual = scanner.scanTokens();
    expect(actual).toBe([]);
});
