/* eslint-disable @typescript-eslint/no-explicit-any */
import { Token } from 'src/token';

export abstract class Expr {}

export class Binary extends Expr {
    constructor(public left: Expr, public operator: Token, public right: Expr) {
        super();
    }
}

export class Grouping extends Expr {
    constructor(public expression: Expr) {
        super();
    }
}

export class Literal extends Expr {
    constructor(public value: any) {
        super();
    }
}

export class Unary extends Expr {
    constructor(public operator: Token, public right: Expr) {
        super();
    }
}
