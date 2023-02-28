import { ExprVisitor, Binary, Expr, Grouping, Literal, Unary } from './expr';
import { TokenType } from './token';

export class Interpreter implements ExprVisitor<any> {
    evaluate(expr: Expr) {
        return expr.accept(this);
    }

    visitBinaryExpr(expr: Binary): any {
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);
        switch (expr.operator.type) {
            case TokenType.GREATER:
                return <number>left > <number>right;
            case TokenType.GREATER_EQUAL:
                return <number>left >= <number>right;
            case TokenType.LESS:
                return <number>left < <number>right;
            case TokenType.LESS_EQUAL:
                return <number>left <= <number>right;
            case TokenType.MINUS:
                return <number>left - <number>right;
            case TokenType.SLASH:
                return <number>left / <number>right;
            case TokenType.STAR:
                return <number>left * <number>right;
            case TokenType.BANG_EQUAL:
                //TODO
                break;
            case TokenType.EQUAL_EQUAL:
                //TODO
                break;
            case TokenType.PLUS:
                if (typeof left === 'number' && typeof right === 'number') {
                    return <number>left + <number>right;
                }
                if (typeof left === 'string' && typeof right === 'string') {
                    return <string>left + <string>right;
                }
                break;
            default:
                break;
        }
        return null;
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
