// import { main } from './lox';

import { AstPrinter } from "./ast-printer";
import { Token, TokenType } from "./token";
import { Binary, Grouping, Literal, Unary } from "./tool/expr";

// main();

const main = () => {
    const expression = new Binary(
        new Unary(
          new Token(TokenType.MINUS, "-", null, 1),
          new Literal(123)
        ),
        new Token(TokenType.STAR, "*", null, 1),
        new Grouping(
          new Literal(45.67)
        )
      );
  
      console.log(new AstPrinter().print(expression));
}
main();