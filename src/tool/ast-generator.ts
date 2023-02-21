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
        'Literal  : any value',
        'Unary    : Token operator, Expr right'
    ]);
    // Your code to generate AST goes here
}

function defineAst(outputDir: string, baseName: string, types: string[]) {
    const path = `${outputDir}/${baseName.toLowerCase()}.ts`;
    const writer = fs.createWriteStream(path);

    writer.write(`export abstract class ${baseName} {}\n\n`);
    for (const t of types) {
        const className = t.split(':')[0].trim();
        const fields = t.split(':')[1].trim();
        defineType(writer, baseName, className, fields);
    }
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
        const type = fields[i].split(' ')[0];
        writer.write(`public ${field}: ${type}`);
        if (i !== fields.length - 1) writer.write(', ');
    }
    writer.write(') {\n');
    writer.write('super();}}\n\n');
}

main(process.argv.slice(2));
