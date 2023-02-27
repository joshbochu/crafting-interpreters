import { ExprVisitor, Binary, Expr, Grouping, Literal, Unary } from './expr';
import { TokenType } from './token';

export class Interpreter implements ExprVisitor<any> {
    evaluate(expr: Expr) {
        return expr.accept(this);
    }

    visitBinaryExpr(expr: Binary): any {
        throw new Error('Method not implemented.');
    }

    visitGroupingExpr(expr: Grouping): any {
        return this.evaluate(expr.expression);
    }

    visitLiteralExpr(expr: Literal): any {
        return expr.value;
    }

    visitUnaryExpr(expr: Unary): any {
        const right = this.evaluate(expr.right);
        switch (expr.operator.type) {
            case TokenType.MINUS:
                return -(<number>right);
            case TokenType.BANG:
                return !(() => {
                    if (right === null || right === undefined) return;
                    if (typeof right === 'boolean') return <boolean>right;
                    return true;
                })();
            default:
                break;
        }
        return null;
    }
}
