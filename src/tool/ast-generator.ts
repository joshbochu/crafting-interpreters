import * as fs from 'fs';

function main(args: string[]): void {
    if (args.length !== 1) {
        console.error('Usage: generate_ast <output directory>');
        process.exit(64);
    }

    const outputDir = args[0];

    defineAst(outputDir, 'Expr', [
        'Binary   : Expr left, Token operator, Expr right',
        'Grouping : Expr expression',
        'Literal  : Object value',
        'Unary    : Token operator, Expr right'
    ]);
    // Your code to generate AST goes here
}

function defineAst(outputDir: string, baseName: string, types: string[]) {
    const path = `${outputDir}/${baseName.toLowerCase()}.ts`;
    const writer = fs.createWriteStream(path);

    defineVisitor(writer, baseName, types);

    writer.write(`export abstract class ${baseName} {\n`);
    writer.write(`\tabstract accept<R>(visitor: ExprVisitor<R>): R;\n}\n\n`);

    // define subclassess that extend abstract class
    for (const t of types) {
        const className = t.split(':')[0].trim();
        const fields = t.split(':')[1].trim();
        defineType(writer, baseName, className, fields);
    }
}

function defineVisitor(
    writer: fs.WriteStream,
    baseName: string,
    types: string[]
): void {
    writer.write(`export interface ExprVisitor<R> {\n`);

    for (const type of types) {
        const typeName = type.split(':')[0].trim();
        const methodName = `visit${typeName}${baseName}`;
        writer.write(`\t${methodName}(expr: ${typeName}): R;\n`);
    }

    writer.write(`}\n\n`);
}

function defineType(
    writer: fs.WriteStream,
    baseName: string,
    className: string,
    fieldList: string
) {
    writer.write(`export class ${className} extends ${baseName} {\n`);
    writer.write(`  constructor(`);
    //fields
    const fields = fieldList.split(', ');
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i].split(' ')[1];
        let type = fields[i].split(' ')[0];
        type = type === 'Object' ? 'any' : type;
        writer.write(`public ${field}: ${type}`);
        if (i !== fields.length - 1) writer.write(', ');
    }
    writer.write(') {\n');
    writer.write('super();}\n\n');
    writer.write('\taccept<R>(visitor: ExprVisitor<R>): R {\n');
    writer.write(`\treturn visitor.visit${className}Expr(this);}\n`);
    writer.write('}\n\n\n');
}

main(process.argv.slice(2));
