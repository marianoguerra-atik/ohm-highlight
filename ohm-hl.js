import * as ohm from "./ohm.js";

const grammarDef = String.raw`
  Wafer {
    Module = (FunctionDecl|ExternFunctionDecl)*

    Statement = LetStatement
              | IfStatement
              | WhileStatement
              | ExprStatement

    //+ "let x = 3 + 4;", "let distance = 100 + 2;"
    //- "let y;"
    LetStatement = let identifier "=" Expr ";"

    //+ "if x < 10 {}", "if z { 42; }", "if x {} else if y {} else { 42; }"
    //- "if x < 10 { 3 } else {}"
    IfStatement = if Expr BlockStatements (else (BlockStatements|IfStatement))?

    //+ "while 0 {}", "while x < 10 { x := x + 1; }"
    //- "while 1 { 42 }", "while x < 10 { x := x + 1 }"
    WhileStatement = while Expr BlockStatements

    //+ "func zero() { 0 }", "func add(x, y) { x + y }"
    //- "func x", "func x();"
    FunctionDecl = func identifier "(" Params? ")" BlockExpr

    //+ "extern func print(x);"
    ExternFunctionDecl = extern func identifier "(" Params? ")" ";"

    Params = identifier ("," identifier)*

    //+ "{ 42 }", "{ 66 + 99 }", "{ 1 + 2 - 3 }"
    //+ "{ let x = 3; 42 }"
    //- "{ 3abc }"
    BlockExpr = "{" Statement* Expr "}"

    //+ "{}", "{ let x = 3; }", "{ 42; 99; }"
    //- "{ 42 }", "{ x := 1 }"
    BlockStatements = "{" Statement* "}"

    ExprStatement = Expr ";"

    Expr = AssignmentExpr  -- assignment
          | PrimaryExpr (binaryOp PrimaryExpr)*  -- binary

    //+ "x := 3", "y := 2 + 1", "arr[x + 1] := 3"
    AssignmentExpr = identifier ":=" Expr  -- var
                   | identifier "[" Expr "]" ":=" Expr  -- array

    PrimaryExpr = "(" Expr ")"  -- paren
                | number
                | stringLiteral
                | CallExpr
                | identifier "[" Expr "]"  -- index
                | identifier  -- var
                | IfExpr

    CallExpr = identifier "(" Args? ")"

    Args = Expr ("," Expr)*

    //+ "if x { 42 } else { 99 }", "if x { 42 } else if y { 99 } else { 0 }"
    //- "if x { 42 }"
    IfExpr = if Expr BlockExpr else (BlockExpr|IfExpr)

    binaryOp = "+" | "-" | "*" | "/" | compareOp | logicalOp
    compareOp = "==" | "!=" | "<=" | "<" | ">=" | ">"
    logicalOp = and | or
    number = digit+

    keyword = if | else | func | let | while | and | or | extern
    if = "if" ~identPart
    else = "else" ~identPart
    func = "func" ~identPart
    let = "let" ~identPart
    while = "while" ~identPart
    and = "and" ~identPart
    or = "or" ~identPart
    extern = "extern" ~identPart

    //+ "x", "élan", "_", "_99"
    //- "1", "$nope"
    identifier = ~keyword identStart identPart*
    identStart = letter | "_"
    identPart = identStart | digit

    stringLiteral = quote (~quote any)* quote
    quote = "\""

    space += singleLineComment | multiLineComment
    singleLineComment = "//" (~"\n" any)*
    multiLineComment = "/*" (~"*/" any)* "*/"

    // Examples:
    //+ "func addOne(x) { x + one }", "func one() { 1 } func two() { 2 }"
    //- "42", "let x", "func x {}"
  }
`;

const wafer = ohm.grammar(grammarDef);
const semantics = wafer.createSemantics();
semantics.addOperation("toHLInfo(ctx)", {
  Module(iter) {
    iter.children.forEach((c) => c.toHLInfo(this.args.ctx));
  },
  FunctionDecl(func, ident, lparen, optParams, rparen, blockExpr) {
    const { ctx } = this.args;
    ctx.add("kw", func);
    ctx.add("ident", ident);
    ctx.add("punct", lparen);
    ctx.add("punct", rparen);
    blockExpr.toHLInfo(ctx);
  },
  BlockExpr(lbrace, iterStatement, expr, rbrace) {
    const { ctx } = this.args;
    ctx.add("punct", lbrace);
    ctx.add("punct", rbrace);
    iterStatement.children.forEach((c) => c.toHLInfo(ctx));
    expr.toHLInfo(ctx);
  },
  BlockStatements(lbrace, iterStatement, rbrace) {
    ctx.add("punct", lbrace);
    ctx.add("punct", rbrace);
    iterStatement.children.forEach((c) => c.toHLInfo(this.args.ctx));
  },
  LetStatement(let_, ident, eq, expr, semicolon) {
    const { ctx } = this.args;
    ctx.add("kw", let_);
    ctx.add("ident", ident);
    ctx.add("op", eq);
    ctx.add("punct", semicolon);
    expr.toHLInfo(ctx);
  },
  IfStatement(if_, expr, thenBlock, else_, iterElseBlock) {
    const { ctx } = this.args;
    ctx.add("kw", if_);
    ctx.add("kw", else_);
    expr.toHLInfo(ctx);
    thenBlock.toHLInfo(ctx);
    iterElseBlock.child(0)?.toHLInfo(ctx);
  },
  WhileStatement(while_, cond, body) {
    const { ctx } = this.args;
    ctx.add("kw", while_);
    cond.toHLInfo(this.args.ctx);
    body.toHLInfo(this.args.ctx);
  },
  ExprStatement(expr, semicolon) {
    const { ctx } = this.args;
    ctx.add("punct", semicolon);
    expr.toHLInfo(ctx);
  },
  Expr_binary(num, iterOps, iterOperands) {
    const { ctx } = this.args;
    num.toHLInfo(ctx);
    for (let i = 0; i < iterOps.numChildren; i++) {
      const op = iterOps.child(i);
      const operand = iterOperands.child(i);
      operand.toHLInfo(ctx);
      op.toHLInfo(ctx);
    }
  },
  AssignmentExpr_var(ident, eq, expr) {
    const { ctx } = this.args;
    ctx.add("ident", ident);
    ctx.add("op", eq);
    expr.toHLInfo(ctx);
  },
  AssignmentExpr_array(ident, lbracket, idxExpr, rbracket, eq, expr) {
    const { ctx } = this.args;
    ctx.add("ident", ident);
    ctx.add("punct", lbracket);
    ctx.add("punct", rbracket);
    ctx.add("op", eq);
    idxExpr.toHLInfo(ctx);
    expr.toHLInfo(ctx);
  },
  PrimaryExpr_paren(lparen, expr, rparen) {
    const { ctx } = this.args;
    ctx.add("punct", lparen);
    ctx.add("punct", rparen);
    expr.toHLInfo(ctx);
  },
  PrimaryExpr_index(ident, lbracket, idxExpr, rbracket) {
    const { ctx } = this.args;
    ctx.add("ident", ident);
    ctx.add("punct", lbracket);
    ctx.add("punct", rbracket);
    idxExpr.toHLInfo(ctx);
  },
  CallExpr(ident, lparen, optArgs, rparen) {
    const { ctx } = this.args;
    ctx.add("ident", ident);
    ctx.add("punct", lparen);
    ctx.add("punct", rparen);
    optArgs.children.forEach((c) => c.toHLInfo(ctx));
  },
  Args(exp, commas, iterExp) {
    const { ctx } = this.args;
    exp.toHLInfo(ctx);
    commas.children.forEach((c) => ctx.add("punct", c));
    iterExp.children.forEach((c) => c.toHLInfo(ctx));
  },
  IfExpr(if_, expr, thenBlock, else_, elseBlock) {
    const { ctx } = this.args;
    ctx.add("kw", if_);
    ctx.add("kw", else_);
    expr.toHLInfo(ctx);
    thenBlock.toHLInfo(ctx);
    elseBlock.toHLInfo(ctx);
  },
  PrimaryExpr_var(ident) {
    this.args.ctx.add("ident", ident);
  },
  binaryOp(char) {
    this.args.ctx.add("op", char);
  },
  number(digits) {
    this.args.ctx.add("number", digits);
  },
  stringLiteral(lquote, _chars, rquote) {
    this.args.ctx.addRange("string", lquote, rquote);
  },
});

export class HLInfo {
  constructor() {
    this.byType = {};
  }
  _add(type, from, to) {
    this.byType[type] ??= [];
    this.byType[type].push([from, to]);
  }
  add(type, node) {
    this._add(type, node.source.startIdx, node.source.endIdx);
  }
  addRange(type, from, to) {
    this._add(type, from.source.startIdx, to.source.endIdx);
  }
  static fromOhm(code, grammar, opName = "toHLInfo") {
    const matchResult = grammar.match(code);
    const info = new HLInfo();
    // TODO: check if succeeded instead?
    try {
      semantics(matchResult)[opName](info);
      return { info, error: null };
    } catch (error) {
      return { info, error };
    }
  }
}
export function getHighlightInfo(code) {
  return HLInfo.fromOhm(code, wafer);
}
