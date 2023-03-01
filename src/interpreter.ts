import { ExprVisitor, Binary, Expr, Grouping, Literal, Unary } from './expr';
import { Token, TokenType } from './token';
import { Lox } from './lox';

export class RuntimeError extends Error {
    constructor(public token: Token, public message: string) {
        super(message);
    }
}

export class Interpreter implements ExprVisitor<any> {
    interpret(expr: Expr) {
        try {
            const value = this.evaluate(expr);
            console.log(this.stringify(value));
        } catch (error) {
            if (error instanceof RuntimeError) {
                Lox.runtimeError(error);
            } else {
                throw error;
            }
        }
    }

    stringify(value: any) {
        if (value === null) return 'nil';
        if (typeof value === 'number') {
            const text = value.toString();
            if (text.endsWith('.0')) {
                return text.substring(0, text.length - 2);
            }
        }
        return String(value);
    }

    evaluate(expr: Expr) {
        return expr.accept(this);
    }

    visitBinaryExpr(expr: Binary): any {
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);
        switch (expr.operator.type) {
            case TokenType.GREATER:
                this.checkNumberOperands(expr.operator, left, right);
                return <number>left > <number>right;
            case TokenType.GREATER_EQUAL:
                return <number>left >= <number>right;
            case TokenType.LESS:
                return <number>left < <number>right;
            case TokenType.LESS_EQUAL:
                return <number>left <= <number>right;
            case TokenType.MINUS:
                this.checkNumberOperand(expr.operator, right);
                return <number>left - <number>right;
            case TokenType.SLASH:
                return <number>left / <number>right;
            case TokenType.STAR:
                return <number>left * <number>right;
            case TokenType.BANG_EQUAL:
                return !this.isEqual(left, right);
                break;
            case TokenType.EQUAL_EQUAL:
                return this.isEqual(left, right);
                break;
            case TokenType.PLUS:
                if (typeof left === 'number' && typeof right === 'number') {
                    return <number>left + <number>right;
                }
                if (typeof left === 'string' && typeof right === 'string') {
                    return <string>left + <string>right;
                }
                throw new RuntimeError(
                    expr.operator,
                    'Operands must be two numbers or two strings.'
                );
                break;
            default:
                break;
        }
        return null;
    }

    checkNumberOperands(operator: Token, left: any, right: any) {
        if (typeof left === 'number' && typeof right === 'number') return;
        throw new RuntimeError(operator, 'Operand must be a number.');
    }

    checkNumberOperand(operator: Token, operand: any) {
        if (typeof operand === 'number') return;
        throw new RuntimeError(operator, 'Operand must be a number.');
    }

    isEqual(a: any, b: any) {
        if (a === null && b === null) return true;
        if (a === null) return false;
        return a === b;
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
