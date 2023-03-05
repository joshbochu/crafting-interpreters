import { Binary, Expr, ExprVisitor, Grouping, Literal, Unary } from './expr';
import { Lox } from './lox';
import { Expression, Print, Stmt, StmtVisitor } from './stmt';
import { Token, TokenType } from './token';

export class RuntimeError extends Error {
    constructor(public token: Token, public message: string) {
        super(message);
    }
}

export class Interpreter implements ExprVisitor<any>, StmtVisitor<void> {
    visitExpressionStmt(expr: Expression): void {
        this.evaluate(expr);
        return;
    }

    visitPrintStmt(expr: Print): void {
        const val = this.stringify(this.evaluate(expr));
        console.log(val);
        return;
    }

    interpret(statements: Stmt[]) {
        try {
            for (const statement of statements) {
                this.execute(statement);
            }
        } catch (error) {
            if (error instanceof RuntimeError) {
                Lox.runtimeError(error);
            } else {
                throw error;
            }
        }
    }

    execute(statement: Stmt) {
        statement.accept(this);
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

    evaluate(expr: Expr | Stmt) {
        console.log(expr);
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
            case TokenType.EQUAL_EQUAL:
                return this.isEqual(left, right);
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
        console.log(expr);
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
