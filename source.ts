// Token class representing the basic units of the code
export class Token {
  constructor(public type: string, public value: string) {}
}

// Lexer class to tokenize the input code
export class Lexer {
  private input: string;
  private currentPos: number = 0;

  constructor(input: string) {
    this.input = input;
  }

  private isWhitespace(char: string): boolean {
    return /\s/.test(char);
  }

  private isDigit(char: string): boolean {
    return /\d/.test(char);
  }

  private isOperator(char: string): boolean {
    return /[+\-*/]/.test(char);
  }

  private readNumber(): string {
    let result = "";
    while (this.isDigit(this.input[this.currentPos])) {
      result += this.input[this.currentPos];
      this.currentPos++;
    }
    return result;
  }

  getNextToken(): Token | null {
    while (this.currentPos < this.input.length) {
      const char = this.input[this.currentPos];

      if (this.isWhitespace(char)) {
        this.currentPos++;
        continue;
      }

      if (this.isDigit(char)) {
        return new Token("NUMBER", this.readNumber());
      }

      if (this.isOperator(char)) {
        this.currentPos++;
        return new Token("OPERATOR", char);
      }

      throw new Error(`Unexpected character: ${char}`);
    }

    return null;
  }
}

// Parser class to build an abstract syntax tree (AST)
export class Parser {
  private lexer: Lexer;

  constructor(lexer: Lexer) {
    this.lexer = lexer;
  }

  parse(): Token[] {
    const tokens: Token[] = [];
    let token = this.lexer.getNextToken();

    while (token !== null) {
      tokens.push(token);
      token = this.lexer.getNextToken();
    }

    return tokens;
  }
}

// CodeGenerator class to generate JavaScript code from AST
export class CodeGenerator {
    generate(ast: Token[]): string {
        return this.visit(ast);
    }

    private visit(node: Token | Token[]): string {
        if (Array.isArray(node)) {
            return node.map((n) => this.visit(n)).join(' ');
        }

        switch (node.type) {
            case 'NUMBER':
                return node.value;
            case 'OPERATOR':
                return this.visitOperator(node);
            default:
                throw new Error(`Unexpected node type: ${node.type}`);
        }
    }

    private visitOperator(node: Token): string {
        switch (node.value) {
            case '+':
                return '+';
            case '-':
                return '-';
            case '*':
                return '*';
            case '/':
                return '/';
            default:
                throw new Error(`Unknown operator: ${node.value}`);
        }
    }
}

export class Evaluator {
    evaluate(jsCode: string): any {
        return eval(jsCode);
    }
}
