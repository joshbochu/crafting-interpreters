import { Binary, ExprVisitor, Grouping, Literal, Unary } from './expr';

export class Interpreter implements ExprVisitor<object> {
    visitBinaryExpr(expr: Binary): object {
        throw new Error('Method not implemented.');
    }
    visitGroupingExpr(expr: Grouping): object {
        throw new Error('Method not implemented.');
    }
    visitLiteralExpr(expr: Literal): object {
        throw new Error('Method not implemented.');
    }
    visitUnaryExpr(expr: Unary): object {
        throw new Error('Method not implemented.');
    }
}
