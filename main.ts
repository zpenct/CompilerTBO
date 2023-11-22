import { Lexer,Parser, CodeGenerator, Evaluator } from "./source";


// const inputCode = '3 + 4 * 2 - 7 / 3';
const inputCode = '0 + 4 * 0 - 7 / 3 + 89';
const lexer = new Lexer(inputCode);
const parser = new Parser(lexer);
const tokens = parser.parse();

console.log(tokens);

const codeGenerator = new CodeGenerator();
const generatedCode = codeGenerator.generate(tokens);

console.log('Generated JavaScript Code:', generatedCode);

const evaluator = new Evaluator();
const result = evaluator.evaluate(generatedCode);

console.log('Result:', result);