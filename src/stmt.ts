import { Expr } from './expr';

export interface StmtVisitor<R> {
    visitExpressionStmt(expr: Expression): R;
    visitPrintStmt(expr: Print): R;
}

export abstract class Stmt {
    abstract accept<R>(visitor: StmtVisitor<R>): R;
}

export class Expression extends Stmt {
    constructor(public expression: Expr) {
        super();
    }

    accept<R>(visitor: StmtVisitor<R>): R {
        return visitor.visitExpressionStmt(this);
    }
}

export class Print extends Stmt {
    constructor(public expression: Expr) {
        super();
    }

    accept<R>(visitor: StmtVisitor<R>): R {
        return visitor.visitPrintStmt(this);
    }
}
