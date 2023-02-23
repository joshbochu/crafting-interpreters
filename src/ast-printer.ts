import {
    Binary,
    Expr,
    ExprVisitor,
    Grouping,
    Literal,
    Unary
} from './tool/expr';

export class AstPrinter implements ExprVisitor<string> {
    print(expr: Expr): string {
        return expr.accept(this);
    }

    visitBinaryExpr(expr: Binary): string {
        return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
    }

    visitGroupingExpr(expr: Grouping): string {
        return this.parenthesize('group', expr.expression);
    }

    visitLiteralExpr(expr: Literal): string {
        if (!expr.value) return 'nil';
        return expr.value.toString();
    }

    visitUnaryExpr(expr: Unary): string {
        return this.parenthesize(expr.operator.lexeme, expr.right);
    }

    parenthesize(name: string, ...exprs: Expr[]) {
        const exprStrs = exprs.map((e) => e.accept(this));
        return `(${name} ${exprStrs.join(' ')})`;
    }
}
