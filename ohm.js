var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// deno:https://esm.sh/ohm-js@17.2.1/es2022/src/common.mjs
var common_exports = {};
__export(common_exports, {
  StringBuffer: () => i,
  abstract: () => f,
  assert: () => p,
  checkNotNull: () => y,
  clone: () => l,
  copyWithoutDuplicates: () => g,
  defineLazyProperty: () => h,
  getDuplicates: () => x,
  isLexical: () => A,
  isSyntactic: () => a,
  padLeft: () => C,
  repeat: () => d,
  repeatFn: () => u,
  repeatStr: () => s,
  unescapeCodePoint: () => m,
  unexpectedObjToString: () => S
});
var n = {};
for (let t = 0; t < 128; t++) n[t] = String.fromCharCode(t);
n[39] = "\\'";
n[34] = '\\"';
n[92] = "\\\\";
n[8] = "\\b";
n[12] = "\\f";
n[10] = "\\n";
n[13] = "\\r";
n[9] = "\\t";
n[11] = "\\v";
function f(t) {
  let e = t || "";
  return function() {
    throw new Error("this method " + e + " is abstract! (it has no implementation in class " + this.constructor.name + ")");
  };
}
function p(t, e) {
  if (!t) throw new Error(e || "Assertion failed");
}
function h(t, e, r8) {
  let o;
  Object.defineProperty(t, e, {
    get() {
      return o || (o = r8.call(this)), o;
    }
  });
}
function l(t) {
  return t && Object.assign({}, t);
}
function u(t, e) {
  let r8 = [];
  for (; e-- > 0; ) r8.push(t());
  return r8;
}
function s(t, e) {
  return new Array(e + 1).join(t);
}
function d(t, e) {
  return u(() => t, e);
}
function x(t) {
  let e = [];
  for (let r8 = 0; r8 < t.length; r8++) {
    let o = t[r8];
    t.lastIndexOf(o) !== r8 && e.indexOf(o) < 0 && e.push(o);
  }
  return e;
}
function g(t) {
  let e = [];
  return t.forEach((r8) => {
    e.indexOf(r8) < 0 && e.push(r8);
  }), e;
}
function a(t) {
  let e = t[0];
  return e === e.toUpperCase();
}
function A(t) {
  return !a(t);
}
function C(t, e, r8) {
  let o = r8 || " ";
  return t.length < e ? s(o, e - t.length) + t : t;
}
function i() {
  this.strings = [];
}
i.prototype.append = function(t) {
  this.strings.push(t);
};
i.prototype.contents = function() {
  return this.strings.join("");
};
var c = (t) => String.fromCodePoint(parseInt(t, 16));
function m(t) {
  if (t.charAt(0) === "\\") switch (t.charAt(1)) {
    case "b":
      return "\b";
    case "f":
      return "\f";
    case "n":
      return `
`;
    case "r":
      return "\r";
    case "t":
      return "	";
    case "v":
      return "\v";
    case "x":
      return c(t.slice(2, 4));
    case "u":
      return t.charAt(2) === "{" ? c(t.slice(3, -1)) : c(t.slice(2, 6));
    default:
      return t.charAt(1);
  }
  else return t;
}
function S(t) {
  if (t == null) return String(t);
  let e = Object.prototype.toString.call(t);
  try {
    let r8;
    return t.constructor && t.constructor.name ? r8 = t.constructor.name : e.indexOf("[object ") === 0 ? r8 = e.slice(8, -1) : r8 = typeof t, r8 + ": " + JSON.stringify(String(t));
  } catch {
    return e;
  }
}
function y(t, e = "unexpected null value") {
  if (t == null) throw new Error(e);
  return t;
}

// deno:https://esm.sh/ohm-js@17.2.1/es2022/src/util.mjs
function h2(e) {
  let n2 = 0;
  return e.map((i2) => {
    let t = i2.toString();
    return n2 = Math.max(n2, t.length), t;
  }).map((i2) => C(i2, n2));
}
function g2(e, n2, o) {
  let i2 = e.length, t = e.slice(0, o), r8 = e.slice(o + n2.length);
  return (t + n2 + r8).substr(0, i2);
}
function x2(...e) {
  let n2 = this, { offset: o } = n2, { repeatStr: i2 } = common_exports, t = new i();
  t.append("Line " + n2.lineNum + ", col " + n2.colNum + `:
`);
  let r8 = h2([
    n2.prevLine == null ? 0 : n2.lineNum - 1,
    n2.lineNum,
    n2.nextLine == null ? 0 : n2.lineNum + 1
  ]), u2 = (a2, l2, f3) => {
    t.append(f3 + r8[a2] + " | " + l2 + `
`);
  };
  n2.prevLine != null && u2(0, n2.prevLine, "  "), u2(1, n2.line, "> ");
  let m2 = n2.line.length, c2 = i2(" ", m2 + 1);
  for (let a2 = 0; a2 < e.length; ++a2) {
    let l2 = e[a2][0], f3 = e[a2][1];
    p(l2 >= 0 && l2 <= f3, "range start must be >= 0 and <= end");
    let L2 = o - n2.colNum + 1;
    l2 = Math.max(0, l2 - L2), f3 = Math.min(f3 - L2, m2), c2 = g2(c2, i2("~", f3 - l2), l2);
  }
  let s2 = 2 + r8[1].length + 3;
  return t.append(i2(" ", s2)), c2 = g2(c2, "^", n2.colNum - 1), t.append(c2.replace(/ +$/, "") + `
`), n2.nextLine != null && u2(2, n2.nextLine, "  "), t.contents();
}
var d2 = [];
function O(e) {
  d2.push(e);
}
function S2(e) {
  d2.forEach((n2) => {
    n2(e);
  }), d2 = null;
}
function N(e, n2) {
  let o = 1, i2 = 1, t = 0, r8 = 0, u2 = null, m2 = null, c2 = -1;
  for (; t < n2; ) {
    let l2 = e.charAt(t++);
    l2 === `
` ? (o++, i2 = 1, c2 = r8, r8 = t) : l2 !== "\r" && i2++;
  }
  let s2 = e.indexOf(`
`, r8);
  if (s2 === -1) s2 = e.length;
  else {
    let l2 = e.indexOf(`
`, s2 + 1);
    u2 = l2 === -1 ? e.slice(s2) : e.slice(s2, l2), u2 = u2.replace(/^\r?\n/, "").replace(/\r$/, "");
  }
  c2 >= 0 && (m2 = e.slice(c2, r8).replace(/\r?\n$/, ""));
  let a2 = e.slice(r8, s2).replace(/\r$/, "");
  return {
    offset: n2,
    lineNum: o,
    colNum: i2,
    line: a2,
    prevLine: m2,
    nextLine: u2,
    toString: x2
  };
}
function b(e, n2, ...o) {
  return N(e, n2).toString(...o);
}
var C2 = /* @__PURE__ */ (() => {
  let e = 0;
  return (n2) => "" + n2 + e++;
})();

// deno:https://esm.sh/ohm-js@17.2.1/es2022/ohm-js.mjs
var Nt = Object.defineProperty;
var Lt = (r8, e) => {
  for (var t in e) Nt(r8, t, { get: e[t], enumerable: true });
};
var qe = { Lu: /\p{Lu}/u, Ll: /\p{Ll}/u, Lt: /\p{Lt}/u, Lm: /\p{Lm}/u, Lo: /\p{Lo}/u, Nl: /\p{Nl}/u, Nd: /\p{Nd}/u, Mn: /\p{Mn}/u, Mc: /\p{Mc}/u, Pc: /\p{Pc}/u, Zs: /\p{Zs}/u, L: /\p{Letter}/u, Ltmo: /\p{Lt}|\p{Lm}|\p{Lo}/u };
var h3 = class r {
  constructor() {
    if (this.constructor === r) throw new Error("PExpr cannot be instantiated -- it's abstract");
  }
  withSource(e) {
    return e && (this.source = e.trimmed()), this;
  }
};
var w = Object.create(h3.prototype);
var _ = Object.create(h3.prototype);
var I = class extends h3 {
  constructor(e) {
    super(), this.obj = e;
  }
};
var y2 = class extends h3 {
  constructor(e, t) {
    super(), this.from = e, this.to = t, this.matchCodePoint = e.length > 1 || t.length > 1;
  }
};
var S3 = class extends h3 {
  constructor(e) {
    super(), this.index = e;
  }
};
var g3 = class extends h3 {
  constructor(e) {
    super(), this.terms = e;
  }
};
var G = class extends g3 {
  constructor(e, t, n2) {
    let s2 = e.rules[t].body;
    super([n2, s2]), this.superGrammar = e, this.name = t, this.body = n2;
  }
};
var q = class extends g3 {
  constructor(e, t, n2, s2) {
    let i2 = e.rules[t].body;
    super([...n2, i2, ...s2]), this.superGrammar = e, this.ruleName = t, this.expansionPos = n2.length;
  }
};
var x3 = class extends h3 {
  constructor(e) {
    super(), this.factors = e;
  }
};
var O2 = class extends h3 {
  constructor(e) {
    super(), this.expr = e;
  }
};
var M = class extends O2 {
};
var B = class extends O2 {
};
var F = class extends O2 {
};
M.prototype.operator = "*";
B.prototype.operator = "+";
F.prototype.operator = "?";
M.prototype.minNumMatches = 0;
B.prototype.minNumMatches = 1;
F.prototype.minNumMatches = 0;
M.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
B.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
F.prototype.maxNumMatches = 1;
var A2 = class extends h3 {
  constructor(e) {
    super(), this.expr = e;
  }
};
var b2 = class extends h3 {
  constructor(e) {
    super(), this.expr = e;
  }
};
var L = class extends h3 {
  constructor(e) {
    super(), this.expr = e;
  }
};
var f2 = class extends h3 {
  constructor(e, t = []) {
    super(), this.ruleName = e, this.args = t;
  }
  isSyntactic() {
    return a(this.ruleName);
  }
  toMemoKey() {
    return this._memoKey || Object.defineProperty(this, "_memoKey", { value: this.toString() }), this._memoKey;
  }
};
var v = class extends h3 {
  constructor(e) {
    super(), this.category = e, this.pattern = qe[e];
  }
};
function R(r8, e) {
  let t;
  return e ? (t = new Error(e.getLineAndColumnMessage() + r8), t.shortMessage = r8, t.interval = e) : t = new Error(r8), t;
}
function he() {
  return R("Interval sources don't match");
}
function Ke(r8) {
  let e = new Error();
  return Object.defineProperty(e, "message", { enumerable: true, get() {
    return r8.message;
  } }), Object.defineProperty(e, "shortMessage", { enumerable: true, get() {
    return "Expected " + r8.getExpectedText();
  } }), e.interval = r8.getInterval(), e;
}
function He(r8, e, t) {
  let n2 = e ? `Grammar ${r8} is not declared in namespace '${e}'` : "Undeclared grammar " + r8;
  return R(n2, t);
}
function ze(r8, e) {
  return R("Grammar " + r8.name + " is already declared in this namespace");
}
function $e(r8) {
  return R(`Grammar '${r8.name}' does not support incremental parsing`);
}
function me(r8, e, t) {
  return R("Rule " + r8 + " is not declared in grammar " + e, t);
}
function Ve(r8, e, t) {
  return R("Cannot override rule " + r8 + " because it is not declared in " + e, t);
}
function We(r8, e, t) {
  return R("Cannot extend rule " + r8 + " because it is not declared in " + e, t);
}
function Oe(r8, e, t, n2) {
  let s2 = "Duplicate declaration for rule '" + r8 + "' in grammar '" + e + "'";
  return e !== t && (s2 += " (originally declared in '" + t + "')"), R(s2, n2);
}
function fe(r8, e, t, n2) {
  return R("Wrong number of parameters for rule " + r8 + " (expected " + e + ", got " + t + ")", n2);
}
function Je(r8, e, t, n2) {
  return R("Wrong number of arguments for rule " + r8 + " (expected " + e + ", got " + t + ")", n2);
}
function Re(r8, e, t) {
  return R("Duplicate parameter names in rule " + r8 + ": " + e.join(", "), t);
}
function Qe(r8, e) {
  return R("Invalid parameter to rule " + r8 + ": " + e + " has arity " + e.getArity() + ", but parameter expressions must have arity 1", e.source);
}
var Rt = "NOTE: A _syntactic rule_ is a rule whose name begins with a capital letter. See https://ohmjs.org/d/svl for more details.";
function Ze(r8, e) {
  return R("Cannot apply syntactic rule " + r8 + " from here (inside a lexical context)", e.source);
}
function Ye(r8) {
  let { ruleName: e } = r8;
  return R(`applySyntactic is for syntactic rules, but '${e}' is a lexical rule. ` + Rt, r8.source);
}
function Xe(r8) {
  return R("applySyntactic is not required here (in a syntactic context)", r8.source);
}
function Pe(r8, e) {
  return R("Incorrect argument type: expected " + r8, e.source);
}
function et(r8) {
  return R("'...' can appear at most once in a rule body", r8.source);
}
function tt(r8) {
  let e = r8._node;
  p(e && e.isNonterminal() && e.ctorName === "escapeChar_unicodeCodePoint");
  let t = r8.children.slice(1, -1).map((s2) => s2.source), n2 = t[0].coverageWith(...t.slice(1));
  return R(`U+${n2.contents} is not a valid Unicode code point`, n2);
}
function de(r8, e) {
  let t = e.length > 0 ? e[e.length - 1].args : [], s2 = "Nullable expression " + r8.expr.substituteParams(t) + " is not allowed inside '" + r8.operator + "' (possible infinite loop)";
  if (e.length > 0) {
    let i2 = e.map((o) => new f2(o.ruleName, o.args)).join(`
`);
    s2 += `
Application stack (most recent application last):
` + i2;
  }
  return R(s2, r8.expr.source);
}
function Ee(r8, e, t, n2) {
  return R("Rule " + r8 + " involves an alternation which has inconsistent arity (expected " + e + ", got " + t + ")", n2.source);
}
function Pt(r8) {
  let e = r8.map((t) => t.message);
  return R(["Errors:"].concat(e).join(`
- `), r8[0].interval);
}
function rt(r8, e, t, n2) {
  let s2 = n2.slice(0, -1).map((c2) => {
    let m2 = "  " + c2[0].name + " > " + c2[1];
    return c2.length === 3 ? m2 + " for '" + c2[2] + "'" : m2;
  }).join(`
`);
  s2 += `
  ` + e + " > " + r8;
  let i2 = "";
  r8 === "_iter" && (i2 = [`
NOTE: as of Ohm v16, there is no default action for iteration nodes \u2014 see `, "  https://ohmjs.org/d/dsa for details."].join(`
`));
  let o = [`Missing semantic action for '${r8}' in ${t} '${e}'.${i2}`, "Action stack (most recent call last):", s2].join(`
`), l2 = R(o);
  return l2.name = "missingSemanticAction", l2;
}
function nt(r8) {
  if (r8.length === 1) throw r8[0];
  if (r8.length > 1) throw Pt(r8);
}
var H = class r2 {
  constructor(e, t, n2) {
    this.sourceString = e, this.startIdx = t, this.endIdx = n2;
  }
  get contents() {
    return this._contents === void 0 && (this._contents = this.sourceString.slice(this.startIdx, this.endIdx)), this._contents;
  }
  get length() {
    return this.endIdx - this.startIdx;
  }
  coverageWith(...e) {
    return r2.coverage(...e, this);
  }
  collapsedLeft() {
    return new r2(this.sourceString, this.startIdx, this.startIdx);
  }
  collapsedRight() {
    return new r2(this.sourceString, this.endIdx, this.endIdx);
  }
  getLineAndColumn() {
    return N(this.sourceString, this.startIdx);
  }
  getLineAndColumnMessage() {
    let e = [this.startIdx, this.endIdx];
    return b(this.sourceString, this.startIdx, e);
  }
  minus(e) {
    if (this.sourceString !== e.sourceString) throw he();
    return this.startIdx === e.startIdx && this.endIdx === e.endIdx ? [] : this.startIdx < e.startIdx && e.endIdx < this.endIdx ? [new r2(this.sourceString, this.startIdx, e.startIdx), new r2(this.sourceString, e.endIdx, this.endIdx)] : this.startIdx < e.endIdx && e.endIdx < this.endIdx ? [new r2(this.sourceString, e.endIdx, this.endIdx)] : this.startIdx < e.startIdx && e.startIdx < this.endIdx ? [new r2(this.sourceString, this.startIdx, e.startIdx)] : [this];
  }
  relativeTo(e) {
    if (this.sourceString !== e.sourceString) throw he();
    return p(this.startIdx >= e.startIdx && this.endIdx <= e.endIdx, "other interval does not cover this one"), new r2(this.sourceString, this.startIdx - e.startIdx, this.endIdx - e.startIdx);
  }
  trimmed() {
    let { contents: e } = this, t = this.startIdx + e.match(/^\s*/)[0].length, n2 = this.endIdx - e.match(/\s*$/)[0].length;
    return new r2(this.sourceString, t, n2);
  }
  subInterval(e, t) {
    let n2 = this.startIdx + e;
    return new r2(this.sourceString, n2, n2 + t);
  }
};
H.coverage = function(r8, ...e) {
  let { startIdx: t, endIdx: n2 } = r8;
  for (let s2 of e) {
    if (s2.sourceString !== r8.sourceString) throw he();
    t = Math.min(t, s2.startIdx), n2 = Math.max(n2, s2.endIdx);
  }
  return new H(r8.sourceString, t, n2);
};
var Ft = 65535;
var z = class {
  constructor(e) {
    this.source = e, this.pos = 0, this.examinedLength = 0;
  }
  atEnd() {
    let e = this.pos >= this.source.length;
    return this.examinedLength = Math.max(this.examinedLength, this.pos + 1), e;
  }
  next() {
    let e = this.source[this.pos++];
    return this.examinedLength = Math.max(this.examinedLength, this.pos), e;
  }
  nextCharCode() {
    let e = this.next();
    return e && e.charCodeAt(0);
  }
  nextCodePoint() {
    let e = this.source.slice(this.pos++).codePointAt(0);
    return e > Ft && (this.pos += 1), this.examinedLength = Math.max(this.examinedLength, this.pos), e;
  }
  matchString(e, t) {
    let n2;
    if (t) {
      for (n2 = 0; n2 < e.length; n2++) {
        let s2 = this.next(), i2 = e[n2];
        if (s2 == null || s2.toUpperCase() !== i2.toUpperCase()) return false;
      }
      return true;
    }
    for (n2 = 0; n2 < e.length; n2++) if (this.next() !== e[n2]) return false;
    return true;
  }
  sourceSlice(e, t) {
    return this.source.slice(e, t);
  }
  interval(e, t) {
    return new H(this.source, e, t || this.pos);
  }
};
var Y = class {
  constructor(e, t, n2, s2, i2, o, l2) {
    this.matcher = e, this.input = t, this.startExpr = n2, this._cst = s2, this._cstOffset = i2, this._rightmostFailurePosition = o, this._rightmostFailures = l2, this.failed() && (h(this, "message", function() {
      let c2 = "Expected " + this.getExpectedText();
      return b(this.input, this.getRightmostFailurePosition()) + c2;
    }), h(this, "shortMessage", function() {
      let c2 = "expected " + this.getExpectedText(), m2 = N(this.input, this.getRightmostFailurePosition());
      return "Line " + m2.lineNum + ", col " + m2.colNum + ": " + c2;
    }));
  }
  succeeded() {
    return !!this._cst;
  }
  failed() {
    return !this.succeeded();
  }
  getRightmostFailurePosition() {
    return this._rightmostFailurePosition;
  }
  getRightmostFailures() {
    if (!this._rightmostFailures) {
      this.matcher.setInput(this.input);
      let e = this.matcher._match(this.startExpr, { tracing: false, positionToRecordFailures: this.getRightmostFailurePosition() });
      this._rightmostFailures = e.getRightmostFailures();
    }
    return this._rightmostFailures;
  }
  toString() {
    return this.succeeded() ? "[match succeeded]" : "[match failed at position " + this.getRightmostFailurePosition() + "]";
  }
  getExpectedText() {
    if (this.succeeded()) throw new Error("cannot get expected text of a successful MatchResult");
    let e = new i(), t = this.getRightmostFailures();
    t = t.filter((n2) => !n2.isFluffy());
    for (let n2 = 0; n2 < t.length; n2++) n2 > 0 && (n2 === t.length - 1 ? e.append(t.length > 2 ? ", or " : " or ") : e.append(", ")), e.append(t[n2].toString());
    return e.contents();
  }
  getInterval() {
    let e = this.getRightmostFailurePosition();
    return new H(this.input, e, e);
  }
};
var Ie = class {
  constructor() {
    this.applicationMemoKeyStack = [], this.memo = {}, this.maxExaminedLength = 0, this.maxRightmostFailureOffset = -1, this.currentLeftRecursion = void 0;
  }
  isActive(e) {
    return this.applicationMemoKeyStack.indexOf(e.toMemoKey()) >= 0;
  }
  enter(e) {
    this.applicationMemoKeyStack.push(e.toMemoKey());
  }
  exit() {
    this.applicationMemoKeyStack.pop();
  }
  startLeftRecursion(e, t) {
    t.isLeftRecursion = true, t.headApplication = e, t.nextLeftRecursion = this.currentLeftRecursion, this.currentLeftRecursion = t;
    let { applicationMemoKeyStack: n2 } = this, s2 = n2.indexOf(e.toMemoKey()) + 1, i2 = n2.slice(s2);
    t.isInvolved = function(o) {
      return i2.indexOf(o) >= 0;
    }, t.updateInvolvedApplicationMemoKeys = function() {
      for (let o = s2; o < n2.length; o++) {
        let l2 = n2[o];
        this.isInvolved(l2) || i2.push(l2);
      }
    };
  }
  endLeftRecursion() {
    this.currentLeftRecursion = this.currentLeftRecursion.nextLeftRecursion;
  }
  shouldUseMemoizedResult(e) {
    if (!e.isLeftRecursion) return true;
    let { applicationMemoKeyStack: t } = this;
    for (let n2 = 0; n2 < t.length; n2++) {
      let s2 = t[n2];
      if (e.isInvolved(s2)) return false;
    }
    return true;
  }
  memoize(e, t) {
    return this.memo[e] = t, this.maxExaminedLength = Math.max(this.maxExaminedLength, t.examinedLength), this.maxRightmostFailureOffset = Math.max(this.maxRightmostFailureOffset, t.rightmostFailureOffset), t;
  }
  clearObsoleteEntries(e, t) {
    if (e + this.maxExaminedLength <= t) return;
    let { memo: n2 } = this;
    this.maxExaminedLength = 0, this.maxRightmostFailureOffset = -1, Object.keys(n2).forEach((s2) => {
      let i2 = n2[s2];
      e + i2.examinedLength > t ? delete n2[s2] : (this.maxExaminedLength = Math.max(this.maxExaminedLength, i2.examinedLength), this.maxRightmostFailureOffset = Math.max(this.maxRightmostFailureOffset, i2.rightmostFailureOffset));
    });
  }
};
var Ct = "\u2717";
var Tt = "\u2713";
var kt = "\u22C5";
var Dt = "\u21D2";
var Mt = "\u2409";
var Bt = "\u240A";
var jt = "\u240D";
var Fe = { succeeded: 1, isRootNode: 2, isImplicitSpaces: 4, isMemoized: 8, isHeadOfLeftRecursion: 16, terminatesLR: 32 };
function Gt(r8) {
  return d(" ", r8).join("");
}
function qt(r8, e, t) {
  let n2 = st(r8.slice(e, e + t));
  return n2.length < t ? n2 + d(" ", t - n2.length).join("") : n2;
}
function st(r8) {
  return typeof r8 == "string" ? r8.replace(/ /g, kt).replace(/\t/g, Mt).replace(/\n/g, Bt).replace(/\r/g, jt) : String(r8);
}
var W = class r3 {
  constructor(e, t, n2, s2, i2, o, l2) {
    this.input = e, this.pos = this.pos1 = t, this.pos2 = n2, this.source = new H(e, t, n2), this.expr = s2, this.bindings = o, this.children = l2 || [], this.terminatingLREntry = null, this._flags = i2 ? Fe.succeeded : 0;
  }
  get displayString() {
    return this.expr.toDisplayString();
  }
  clone() {
    return this.cloneWithExpr(this.expr);
  }
  cloneWithExpr(e) {
    let t = new r3(this.input, this.pos, this.pos2, e, this.succeeded, this.bindings, this.children);
    return t.isHeadOfLeftRecursion = this.isHeadOfLeftRecursion, t.isImplicitSpaces = this.isImplicitSpaces, t.isMemoized = this.isMemoized, t.isRootNode = this.isRootNode, t.terminatesLR = this.terminatesLR, t.terminatingLREntry = this.terminatingLREntry, t;
  }
  recordLRTermination(e, t) {
    this.terminatingLREntry = new r3(this.input, this.pos, this.pos2, this.expr, false, [t], [e]), this.terminatingLREntry.terminatesLR = true;
  }
  walk(e, t) {
    let n2 = e;
    typeof n2 == "function" && (n2 = { enter: n2 });
    function s2(i2, o, l2) {
      let c2 = true;
      n2.enter && n2.enter.call(t, i2, o, l2) === r3.prototype.SKIP && (c2 = false), c2 && (i2.children.forEach((m2) => {
        s2(m2, i2, l2 + 1);
      }), n2.exit && n2.exit.call(t, i2, o, l2));
    }
    this.isRootNode ? this.children.forEach((i2) => {
      s2(i2, null, 0);
    }) : s2(this, null, 0);
  }
  toString() {
    let e = new i();
    return this.walk((t, n2, s2) => {
      if (!t) return this.SKIP;
      if (t.expr.constructor.name !== "Alt") {
        if (e.append(qt(t.input, t.pos, 10) + Gt(s2 * 2 + 1)), e.append((t.succeeded ? Tt : Ct) + " " + t.displayString), t.isHeadOfLeftRecursion && e.append(" (LR)"), t.succeeded) {
          let o = st(t.source.contents);
          e.append(" " + Dt + "  "), e.append(typeof o == "string" ? '"' + o + '"' : o);
        }
        e.append(`
`);
      }
    }), e.contents();
  }
};
W.prototype.SKIP = {};
Object.keys(Fe).forEach((r8) => {
  let e = Fe[r8];
  Object.defineProperty(W.prototype, r8, { get() {
    return (this._flags & e) !== 0;
  }, set(t) {
    t ? this._flags |= e : this._flags &= ~e;
  } });
});
var $ = {};
Lt($, { Alt: () => g3, Apply: () => f2, CaseInsensitiveTerminal: () => ee, Extend: () => G, Iter: () => O2, Lex: () => L, Lookahead: () => b2, Not: () => A2, Opt: () => F, PExpr: () => h3, Param: () => S3, Plus: () => B, Range: () => y2, Seq: () => x3, Splice: () => q, Star: () => M, Terminal: () => I, UnicodeChar: () => v, any: () => w, end: () => _ });
h3.prototype.allowsSkippingPrecedingSpace = f("allowsSkippingPrecedingSpace");
w.allowsSkippingPrecedingSpace = _.allowsSkippingPrecedingSpace = f2.prototype.allowsSkippingPrecedingSpace = I.prototype.allowsSkippingPrecedingSpace = y2.prototype.allowsSkippingPrecedingSpace = v.prototype.allowsSkippingPrecedingSpace = function() {
  return true;
};
g3.prototype.allowsSkippingPrecedingSpace = O2.prototype.allowsSkippingPrecedingSpace = L.prototype.allowsSkippingPrecedingSpace = b2.prototype.allowsSkippingPrecedingSpace = A2.prototype.allowsSkippingPrecedingSpace = S3.prototype.allowsSkippingPrecedingSpace = x3.prototype.allowsSkippingPrecedingSpace = function() {
  return false;
};
var se;
O((r8) => {
  se = r8;
});
var ye;
h3.prototype.assertAllApplicationsAreValid = function(r8, e) {
  ye = 0, this._assertAllApplicationsAreValid(r8, e);
};
h3.prototype._assertAllApplicationsAreValid = f("_assertAllApplicationsAreValid");
w._assertAllApplicationsAreValid = _._assertAllApplicationsAreValid = I.prototype._assertAllApplicationsAreValid = y2.prototype._assertAllApplicationsAreValid = S3.prototype._assertAllApplicationsAreValid = v.prototype._assertAllApplicationsAreValid = function(r8, e) {
};
L.prototype._assertAllApplicationsAreValid = function(r8, e) {
  ye++, this.expr._assertAllApplicationsAreValid(r8, e), ye--;
};
g3.prototype._assertAllApplicationsAreValid = function(r8, e) {
  for (let t = 0; t < this.terms.length; t++) this.terms[t]._assertAllApplicationsAreValid(r8, e);
};
x3.prototype._assertAllApplicationsAreValid = function(r8, e) {
  for (let t = 0; t < this.factors.length; t++) this.factors[t]._assertAllApplicationsAreValid(r8, e);
};
O2.prototype._assertAllApplicationsAreValid = A2.prototype._assertAllApplicationsAreValid = b2.prototype._assertAllApplicationsAreValid = function(r8, e) {
  this.expr._assertAllApplicationsAreValid(r8, e);
};
f2.prototype._assertAllApplicationsAreValid = function(r8, e, t = false) {
  let n2 = e.rules[this.ruleName], s2 = a(r8) && ye === 0;
  if (!n2) throw me(this.ruleName, e.name, this.source);
  if (!t && a(this.ruleName) && !s2) throw Ze(this.ruleName, this);
  let i2 = this.args.length, o = n2.formals.length;
  if (i2 !== o) throw Je(this.ruleName, o, i2, this.source);
  let l2 = se && n2 === se.rules.applySyntactic;
  if (se && n2 === se.rules.caseInsensitive && !(this.args[0] instanceof I)) throw Pe('a Terminal (e.g. "abc")', this.args[0]);
  if (l2) {
    let m2 = this.args[0];
    if (!(m2 instanceof f2)) throw Pe("a syntactic rule application", m2);
    if (!a(m2.ruleName)) throw Ye(m2);
    if (s2) throw Xe(this);
  }
  this.args.forEach((m2) => {
    if (m2._assertAllApplicationsAreValid(r8, e, l2), m2.getArity() !== 1) throw Qe(this.ruleName, m2);
  });
};
h3.prototype.assertChoicesHaveUniformArity = f("assertChoicesHaveUniformArity");
w.assertChoicesHaveUniformArity = _.assertChoicesHaveUniformArity = I.prototype.assertChoicesHaveUniformArity = y2.prototype.assertChoicesHaveUniformArity = S3.prototype.assertChoicesHaveUniformArity = L.prototype.assertChoicesHaveUniformArity = v.prototype.assertChoicesHaveUniformArity = function(r8) {
};
g3.prototype.assertChoicesHaveUniformArity = function(r8) {
  if (this.terms.length === 0) return;
  let e = this.terms[0].getArity();
  for (let t = 0; t < this.terms.length; t++) {
    let n2 = this.terms[t];
    n2.assertChoicesHaveUniformArity();
    let s2 = n2.getArity();
    if (e !== s2) throw Ee(r8, e, s2, n2);
  }
};
G.prototype.assertChoicesHaveUniformArity = function(r8) {
  let e = this.terms[0].getArity(), t = this.terms[1].getArity();
  if (e !== t) throw Ee(r8, t, e, this.terms[0]);
};
x3.prototype.assertChoicesHaveUniformArity = function(r8) {
  for (let e = 0; e < this.factors.length; e++) this.factors[e].assertChoicesHaveUniformArity(r8);
};
O2.prototype.assertChoicesHaveUniformArity = function(r8) {
  this.expr.assertChoicesHaveUniformArity(r8);
};
A2.prototype.assertChoicesHaveUniformArity = function(r8) {
};
b2.prototype.assertChoicesHaveUniformArity = function(r8) {
  this.expr.assertChoicesHaveUniformArity(r8);
};
f2.prototype.assertChoicesHaveUniformArity = function(r8) {
};
h3.prototype.assertIteratedExprsAreNotNullable = f("assertIteratedExprsAreNotNullable");
w.assertIteratedExprsAreNotNullable = _.assertIteratedExprsAreNotNullable = I.prototype.assertIteratedExprsAreNotNullable = y2.prototype.assertIteratedExprsAreNotNullable = S3.prototype.assertIteratedExprsAreNotNullable = v.prototype.assertIteratedExprsAreNotNullable = function(r8) {
};
g3.prototype.assertIteratedExprsAreNotNullable = function(r8) {
  for (let e = 0; e < this.terms.length; e++) this.terms[e].assertIteratedExprsAreNotNullable(r8);
};
x3.prototype.assertIteratedExprsAreNotNullable = function(r8) {
  for (let e = 0; e < this.factors.length; e++) this.factors[e].assertIteratedExprsAreNotNullable(r8);
};
O2.prototype.assertIteratedExprsAreNotNullable = function(r8) {
  if (this.expr.assertIteratedExprsAreNotNullable(r8), this.expr.isNullable(r8)) throw de(this, []);
};
F.prototype.assertIteratedExprsAreNotNullable = A2.prototype.assertIteratedExprsAreNotNullable = b2.prototype.assertIteratedExprsAreNotNullable = L.prototype.assertIteratedExprsAreNotNullable = function(r8) {
  this.expr.assertIteratedExprsAreNotNullable(r8);
};
f2.prototype.assertIteratedExprsAreNotNullable = function(r8) {
  this.args.forEach((e) => {
    e.assertIteratedExprsAreNotNullable(r8);
  });
};
var ie = class {
  constructor(e) {
    this.matchLength = e;
  }
  get ctorName() {
    throw new Error("subclass responsibility");
  }
  numChildren() {
    return this.children ? this.children.length : 0;
  }
  childAt(e) {
    if (this.children) return this.children[e];
  }
  indexOfChild(e) {
    return this.children.indexOf(e);
  }
  hasChildren() {
    return this.numChildren() > 0;
  }
  hasNoChildren() {
    return !this.hasChildren();
  }
  onlyChild() {
    if (this.numChildren() !== 1) throw new Error("cannot get only child of a node of type " + this.ctorName + " (it has " + this.numChildren() + " children)");
    return this.firstChild();
  }
  firstChild() {
    if (this.hasNoChildren()) throw new Error("cannot get first child of a " + this.ctorName + " node, which has no children");
    return this.childAt(0);
  }
  lastChild() {
    if (this.hasNoChildren()) throw new Error("cannot get last child of a " + this.ctorName + " node, which has no children");
    return this.childAt(this.numChildren() - 1);
  }
  childBefore(e) {
    let t = this.indexOfChild(e);
    if (t < 0) throw new Error("Node.childBefore() called w/ an argument that is not a child");
    if (t === 0) throw new Error("cannot get child before first child");
    return this.childAt(t - 1);
  }
  childAfter(e) {
    let t = this.indexOfChild(e);
    if (t < 0) throw new Error("Node.childAfter() called w/ an argument that is not a child");
    if (t === this.numChildren() - 1) throw new Error("cannot get child after last child");
    return this.childAt(t + 1);
  }
  isTerminal() {
    return false;
  }
  isNonterminal() {
    return false;
  }
  isIteration() {
    return false;
  }
  isOptional() {
    return false;
  }
};
var j = class extends ie {
  get ctorName() {
    return "_terminal";
  }
  isTerminal() {
    return true;
  }
  get primitiveValue() {
    throw new Error("The `primitiveValue` property was removed in Ohm v17.");
  }
};
var ve = class extends ie {
  constructor(e, t, n2, s2) {
    super(s2), this.ruleName = e, this.children = t, this.childOffsets = n2;
  }
  get ctorName() {
    return this.ruleName;
  }
  isNonterminal() {
    return true;
  }
  isLexical() {
    return A(this.ctorName);
  }
  isSyntactic() {
    return a(this.ctorName);
  }
};
var X = class extends ie {
  constructor(e, t, n2, s2) {
    super(n2), this.children = e, this.childOffsets = t, this.optional = s2;
  }
  get ctorName() {
    return "_iter";
  }
  isIteration() {
    return true;
  }
  isOptional() {
    return this.optional;
  }
};
h3.prototype.eval = f("eval");
w.eval = function(r8) {
  let { inputStream: e } = r8, t = e.pos, n2 = e.nextCodePoint();
  return n2 !== void 0 ? (r8.pushBinding(new j(String.fromCodePoint(n2).length), t), true) : (r8.processFailure(t, this), false);
};
_.eval = function(r8) {
  let { inputStream: e } = r8, t = e.pos;
  return e.atEnd() ? (r8.pushBinding(new j(0), t), true) : (r8.processFailure(t, this), false);
};
I.prototype.eval = function(r8) {
  let { inputStream: e } = r8, t = e.pos;
  return e.matchString(this.obj) ? (r8.pushBinding(new j(this.obj.length), t), true) : (r8.processFailure(t, this), false);
};
y2.prototype.eval = function(r8) {
  let { inputStream: e } = r8, t = e.pos, n2 = this.matchCodePoint ? e.nextCodePoint() : e.nextCharCode();
  return n2 !== void 0 && this.from.codePointAt(0) <= n2 && n2 <= this.to.codePointAt(0) ? (r8.pushBinding(new j(String.fromCodePoint(n2).length), t), true) : (r8.processFailure(t, this), false);
};
S3.prototype.eval = function(r8) {
  return r8.eval(r8.currentApplication().args[this.index]);
};
L.prototype.eval = function(r8) {
  r8.enterLexifiedContext();
  let e = r8.eval(this.expr);
  return r8.exitLexifiedContext(), e;
};
g3.prototype.eval = function(r8) {
  for (let e = 0; e < this.terms.length; e++) if (r8.eval(this.terms[e])) return true;
  return false;
};
x3.prototype.eval = function(r8) {
  for (let e = 0; e < this.factors.length; e++) {
    let t = this.factors[e];
    if (!r8.eval(t)) return false;
  }
  return true;
};
O2.prototype.eval = function(r8) {
  let { inputStream: e } = r8, t = e.pos, n2 = this.getArity(), s2 = [], i2 = [];
  for (; s2.length < n2; ) s2.push([]), i2.push([]);
  let o = 0, l2 = t, c2;
  for (; o < this.maxNumMatches && r8.eval(this.expr); ) {
    if (e.pos === l2) throw de(this, r8._applicationStack);
    l2 = e.pos, o++;
    let u2 = r8._bindings.splice(r8._bindings.length - n2, n2), d3 = r8._bindingOffsets.splice(r8._bindingOffsets.length - n2, n2);
    for (c2 = 0; c2 < u2.length; c2++) s2[c2].push(u2[c2]), i2[c2].push(d3[c2]);
  }
  if (o < this.minNumMatches) return false;
  let m2 = r8.posToOffset(t), a2 = 0;
  if (o > 0) {
    let u2 = s2[n2 - 1], d3 = i2[n2 - 1], N2 = d3[d3.length - 1] + u2[u2.length - 1].matchLength;
    m2 = i2[0][0], a2 = N2 - m2;
  }
  let p2 = this instanceof F;
  for (c2 = 0; c2 < s2.length; c2++) r8._bindings.push(new X(s2[c2], i2[c2], a2, p2)), r8._bindingOffsets.push(m2);
  return true;
};
A2.prototype.eval = function(r8) {
  let { inputStream: e } = r8, t = e.pos;
  r8.pushFailuresInfo();
  let n2 = r8.eval(this.expr);
  return r8.popFailuresInfo(), n2 ? (r8.processFailure(t, this), false) : (e.pos = t, true);
};
b2.prototype.eval = function(r8) {
  let { inputStream: e } = r8, t = e.pos;
  return r8.eval(this.expr) ? (e.pos = t, true) : false;
};
f2.prototype.eval = function(r8) {
  let e = r8.currentApplication(), t = e ? e.args : [], n2 = this.substituteParams(t), s2 = r8.getCurrentPosInfo();
  if (s2.isActive(n2)) return n2.handleCycle(r8);
  let i2 = n2.toMemoKey(), o = s2.memo[i2];
  if (o && s2.shouldUseMemoizedResult(o)) {
    if (r8.hasNecessaryInfo(o)) return r8.useMemoizedResult(r8.inputStream.pos, o);
    delete s2.memo[i2];
  }
  return n2.reallyEval(r8);
};
f2.prototype.handleCycle = function(r8) {
  let e = r8.getCurrentPosInfo(), { currentLeftRecursion: t } = e, n2 = this.toMemoKey(), s2 = e.memo[n2];
  return t && t.headApplication.toMemoKey() === n2 ? s2.updateInvolvedApplicationMemoKeys() : s2 || (s2 = e.memoize(n2, { matchLength: 0, examinedLength: 0, value: false, rightmostFailureOffset: -1 }), e.startLeftRecursion(this, s2)), r8.useMemoizedResult(r8.inputStream.pos, s2);
};
f2.prototype.reallyEval = function(r8) {
  let { inputStream: e } = r8, t = e.pos, n2 = r8.getCurrentPosInfo(), s2 = r8.grammar.rules[this.ruleName], { body: i2 } = s2, { description: o } = s2;
  r8.enterApplication(n2, this), o && r8.pushFailuresInfo();
  let l2 = e.examinedLength;
  e.examinedLength = 0;
  let c2 = this.evalOnce(i2, r8), m2 = n2.currentLeftRecursion, a2 = this.toMemoKey(), p2 = m2 && m2.headApplication.toMemoKey() === a2, u2;
  r8.doNotMemoize ? r8.doNotMemoize = false : p2 ? (c2 = this.growSeedResult(i2, r8, t, m2, c2), n2.endLeftRecursion(), u2 = m2, u2.examinedLength = e.examinedLength - t, u2.rightmostFailureOffset = r8._getRightmostFailureOffset(), n2.memoize(a2, u2)) : (!m2 || !m2.isInvolved(a2)) && (u2 = n2.memoize(a2, { matchLength: e.pos - t, examinedLength: e.examinedLength - t, value: c2, failuresAtRightmostPosition: r8.cloneRecordedFailures(), rightmostFailureOffset: r8._getRightmostFailureOffset() }));
  let d3 = !!c2;
  if (o && (r8.popFailuresInfo(), d3 || r8.processFailure(t, this), u2 && (u2.failuresAtRightmostPosition = r8.cloneRecordedFailures())), r8.isTracing() && u2) {
    let N2 = r8.getTraceEntry(t, this, d3, d3 ? [c2] : []);
    p2 && (p(N2.terminatingLREntry != null || !d3), N2.isHeadOfLeftRecursion = true), u2.traceEntry = N2;
  }
  return e.examinedLength = Math.max(e.examinedLength, l2), r8.exitApplication(n2, c2), d3;
};
f2.prototype.evalOnce = function(r8, e) {
  let { inputStream: t } = e, n2 = t.pos;
  if (e.eval(r8)) {
    let s2 = r8.getArity(), i2 = e._bindings.splice(e._bindings.length - s2, s2), o = e._bindingOffsets.splice(e._bindingOffsets.length - s2, s2), l2 = t.pos - n2;
    return new ve(this.ruleName, i2, o, l2);
  } else return false;
};
f2.prototype.growSeedResult = function(r8, e, t, n2, s2) {
  if (!s2) return false;
  let { inputStream: i2 } = e;
  for (; ; ) {
    if (n2.matchLength = i2.pos - t, n2.value = s2, n2.failuresAtRightmostPosition = e.cloneRecordedFailures(), e.isTracing()) {
      let o = e.trace[e.trace.length - 1];
      n2.traceEntry = new W(e.input, t, i2.pos, this, true, [s2], [o.clone()]);
    }
    if (i2.pos = t, s2 = this.evalOnce(r8, e), i2.pos - t <= n2.matchLength) break;
    e.isTracing() && e.trace.splice(-2, 1);
  }
  return e.isTracing() && n2.traceEntry.recordLRTermination(e.trace.pop(), s2), i2.pos = t + n2.matchLength, n2.value;
};
v.prototype.eval = function(r8) {
  let { inputStream: e } = r8, t = e.pos, n2 = e.next();
  return n2 && this.pattern.test(n2) ? (r8.pushBinding(new j(n2.length), t), true) : (r8.processFailure(t, this), false);
};
h3.prototype.getArity = f("getArity");
w.getArity = _.getArity = I.prototype.getArity = y2.prototype.getArity = S3.prototype.getArity = f2.prototype.getArity = v.prototype.getArity = function() {
  return 1;
};
g3.prototype.getArity = function() {
  return this.terms.length === 0 ? 0 : this.terms[0].getArity();
};
x3.prototype.getArity = function() {
  let r8 = 0;
  for (let e = 0; e < this.factors.length; e++) r8 += this.factors[e].getArity();
  return r8;
};
O2.prototype.getArity = function() {
  return this.expr.getArity();
};
A2.prototype.getArity = function() {
  return 0;
};
b2.prototype.getArity = L.prototype.getArity = function() {
  return this.expr.getArity();
};
function U(r8, e) {
  let t = {};
  if (r8.source && e) {
    let n2 = r8.source.relativeTo(e);
    t.sourceInterval = [n2.startIdx, n2.endIdx];
  }
  return t;
}
h3.prototype.outputRecipe = f("outputRecipe");
w.outputRecipe = function(r8, e) {
  return ["any", U(this, e)];
};
_.outputRecipe = function(r8, e) {
  return ["end", U(this, e)];
};
I.prototype.outputRecipe = function(r8, e) {
  return ["terminal", U(this, e), this.obj];
};
y2.prototype.outputRecipe = function(r8, e) {
  return ["range", U(this, e), this.from, this.to];
};
S3.prototype.outputRecipe = function(r8, e) {
  return ["param", U(this, e), this.index];
};
g3.prototype.outputRecipe = function(r8, e) {
  return ["alt", U(this, e)].concat(this.terms.map((t) => t.outputRecipe(r8, e)));
};
G.prototype.outputRecipe = function(r8, e) {
  return this.terms[0].outputRecipe(r8, e);
};
q.prototype.outputRecipe = function(r8, e) {
  let t = this.terms.slice(0, this.expansionPos), n2 = this.terms.slice(this.expansionPos + 1);
  return ["splice", U(this, e), t.map((s2) => s2.outputRecipe(r8, e)), n2.map((s2) => s2.outputRecipe(r8, e))];
};
x3.prototype.outputRecipe = function(r8, e) {
  return ["seq", U(this, e)].concat(this.factors.map((t) => t.outputRecipe(r8, e)));
};
M.prototype.outputRecipe = B.prototype.outputRecipe = F.prototype.outputRecipe = A2.prototype.outputRecipe = b2.prototype.outputRecipe = L.prototype.outputRecipe = function(r8, e) {
  return [this.constructor.name.toLowerCase(), U(this, e), this.expr.outputRecipe(r8, e)];
};
f2.prototype.outputRecipe = function(r8, e) {
  return ["app", U(this, e), this.ruleName, this.args.map((t) => t.outputRecipe(r8, e))];
};
v.prototype.outputRecipe = function(r8, e) {
  return ["unicodeChar", U(this, e), this.category];
};
h3.prototype.introduceParams = f("introduceParams");
w.introduceParams = _.introduceParams = I.prototype.introduceParams = y2.prototype.introduceParams = S3.prototype.introduceParams = v.prototype.introduceParams = function(r8) {
  return this;
};
g3.prototype.introduceParams = function(r8) {
  return this.terms.forEach((e, t, n2) => {
    n2[t] = e.introduceParams(r8);
  }), this;
};
x3.prototype.introduceParams = function(r8) {
  return this.factors.forEach((e, t, n2) => {
    n2[t] = e.introduceParams(r8);
  }), this;
};
O2.prototype.introduceParams = A2.prototype.introduceParams = b2.prototype.introduceParams = L.prototype.introduceParams = function(r8) {
  return this.expr = this.expr.introduceParams(r8), this;
};
f2.prototype.introduceParams = function(r8) {
  let e = r8.indexOf(this.ruleName);
  if (e >= 0) {
    if (this.args.length > 0) throw new Error("Parameterized rules cannot be passed as arguments to another rule.");
    return new S3(e).withSource(this.source);
  } else return this.args.forEach((t, n2, s2) => {
    s2[n2] = t.introduceParams(r8);
  }), this;
};
h3.prototype.isNullable = function(r8) {
  return this._isNullable(r8, /* @__PURE__ */ Object.create(null));
};
h3.prototype._isNullable = f("_isNullable");
w._isNullable = y2.prototype._isNullable = S3.prototype._isNullable = B.prototype._isNullable = v.prototype._isNullable = function(r8, e) {
  return false;
};
_._isNullable = function(r8, e) {
  return true;
};
I.prototype._isNullable = function(r8, e) {
  return typeof this.obj == "string" ? this.obj === "" : false;
};
g3.prototype._isNullable = function(r8, e) {
  return this.terms.length === 0 || this.terms.some((t) => t._isNullable(r8, e));
};
x3.prototype._isNullable = function(r8, e) {
  return this.factors.every((t) => t._isNullable(r8, e));
};
M.prototype._isNullable = F.prototype._isNullable = A2.prototype._isNullable = b2.prototype._isNullable = function(r8, e) {
  return true;
};
L.prototype._isNullable = function(r8, e) {
  return this.expr._isNullable(r8, e);
};
f2.prototype._isNullable = function(r8, e) {
  let t = this.toMemoKey();
  if (!Object.prototype.hasOwnProperty.call(e, t)) {
    let { body: n2 } = r8.rules[this.ruleName], s2 = n2.substituteParams(this.args);
    e[t] = false, e[t] = s2._isNullable(r8, e);
  }
  return e[t];
};
h3.prototype.substituteParams = f("substituteParams");
w.substituteParams = _.substituteParams = I.prototype.substituteParams = y2.prototype.substituteParams = v.prototype.substituteParams = function(r8) {
  return this;
};
S3.prototype.substituteParams = function(r8) {
  return y(r8[this.index]);
};
g3.prototype.substituteParams = function(r8) {
  return new g3(this.terms.map((e) => e.substituteParams(r8)));
};
x3.prototype.substituteParams = function(r8) {
  return new x3(this.factors.map((e) => e.substituteParams(r8)));
};
O2.prototype.substituteParams = A2.prototype.substituteParams = b2.prototype.substituteParams = L.prototype.substituteParams = function(r8) {
  return new this.constructor(this.expr.substituteParams(r8));
};
f2.prototype.substituteParams = function(r8) {
  if (this.args.length === 0) return this;
  {
    let e = this.args.map((t) => t.substituteParams(r8));
    return new f2(this.ruleName, e);
  }
};
function ot(r8) {
  return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(r8);
}
function Te(r8) {
  let e = /* @__PURE__ */ Object.create(null);
  r8.forEach((t) => {
    e[t] = (e[t] || 0) + 1;
  }), Object.keys(e).forEach((t) => {
    if (e[t] <= 1) return;
    let n2 = 1;
    r8.forEach((s2, i2) => {
      s2 === t && (r8[i2] = s2 + "_" + n2++);
    });
  });
}
h3.prototype.toArgumentNameList = f("toArgumentNameList");
w.toArgumentNameList = function(r8, e) {
  return ["any"];
};
_.toArgumentNameList = function(r8, e) {
  return ["end"];
};
I.prototype.toArgumentNameList = function(r8, e) {
  return typeof this.obj == "string" && /^[_a-zA-Z0-9]+$/.test(this.obj) ? ["_" + this.obj] : ["$" + r8];
};
y2.prototype.toArgumentNameList = function(r8, e) {
  let t = this.from + "_to_" + this.to;
  return ot(t) || (t = "_" + t), ot(t) || (t = "$" + r8), [t];
};
g3.prototype.toArgumentNameList = function(r8, e) {
  let t = this.terms.map((i2) => i2.toArgumentNameList(r8, true)), n2 = [], s2 = t[0].length;
  for (let i2 = 0; i2 < s2; i2++) {
    let o = [];
    for (let c2 = 0; c2 < this.terms.length; c2++) o.push(t[c2][i2]);
    let l2 = g(o);
    n2.push(l2.join("_or_"));
  }
  return e || Te(n2), n2;
};
x3.prototype.toArgumentNameList = function(r8, e) {
  let t = [];
  return this.factors.forEach((n2) => {
    let s2 = n2.toArgumentNameList(r8, true);
    t = t.concat(s2), r8 += s2.length;
  }), e || Te(t), t;
};
O2.prototype.toArgumentNameList = function(r8, e) {
  let t = this.expr.toArgumentNameList(r8, e).map((n2) => n2[n2.length - 1] === "s" ? n2 + "es" : n2 + "s");
  return e || Te(t), t;
};
F.prototype.toArgumentNameList = function(r8, e) {
  return this.expr.toArgumentNameList(r8, e).map((t) => "opt" + t[0].toUpperCase() + t.slice(1));
};
A2.prototype.toArgumentNameList = function(r8, e) {
  return [];
};
b2.prototype.toArgumentNameList = L.prototype.toArgumentNameList = function(r8, e) {
  return this.expr.toArgumentNameList(r8, e);
};
f2.prototype.toArgumentNameList = function(r8, e) {
  return [this.ruleName];
};
v.prototype.toArgumentNameList = function(r8, e) {
  return ["$" + r8];
};
S3.prototype.toArgumentNameList = function(r8, e) {
  return ["param" + this.index];
};
h3.prototype.toDisplayString = f("toDisplayString");
g3.prototype.toDisplayString = x3.prototype.toDisplayString = function() {
  return this.source ? this.source.trimmed().contents : "[" + this.constructor.name + "]";
};
w.toDisplayString = _.toDisplayString = O2.prototype.toDisplayString = A2.prototype.toDisplayString = b2.prototype.toDisplayString = L.prototype.toDisplayString = I.prototype.toDisplayString = y2.prototype.toDisplayString = S3.prototype.toDisplayString = function() {
  return this.toString();
};
f2.prototype.toDisplayString = function() {
  if (this.args.length > 0) {
    let r8 = this.args.map((e) => e.toDisplayString());
    return this.ruleName + "<" + r8.join(",") + ">";
  } else return this.ruleName;
};
v.prototype.toDisplayString = function() {
  return "Unicode [" + this.category + "] character";
};
function tr(r8) {
  return r8 === "description" || r8 === "string" || r8 === "code";
}
var T = class r4 {
  constructor(e, t, n2) {
    if (!tr(n2)) throw new Error("invalid Failure type: " + n2);
    this.pexpr = e, this.text = t, this.type = n2, this.fluffy = false;
  }
  getPExpr() {
    return this.pexpr;
  }
  getText() {
    return this.text;
  }
  getType() {
    return this.type;
  }
  isDescription() {
    return this.type === "description";
  }
  isStringTerminal() {
    return this.type === "string";
  }
  isCode() {
    return this.type === "code";
  }
  isFluffy() {
    return this.fluffy;
  }
  makeFluffy() {
    this.fluffy = true;
  }
  clearFluffy() {
    this.fluffy = false;
  }
  subsumes(e) {
    return this.getText() === e.getText() && this.type === e.type && (!this.isFluffy() || this.isFluffy() && e.isFluffy());
  }
  toString() {
    return this.type === "string" ? JSON.stringify(this.getText()) : this.getText();
  }
  clone() {
    let e = new r4(this.pexpr, this.text, this.type);
    return this.isFluffy() && e.makeFluffy(), e;
  }
  toKey() {
    return this.toString() + "#" + this.type;
  }
};
h3.prototype.toFailure = f("toFailure");
w.toFailure = function(r8) {
  return new T(this, "any object", "description");
};
_.toFailure = function(r8) {
  return new T(this, "end of input", "description");
};
I.prototype.toFailure = function(r8) {
  return new T(this, this.obj, "string");
};
y2.prototype.toFailure = function(r8) {
  return new T(this, JSON.stringify(this.from) + ".." + JSON.stringify(this.to), "code");
};
A2.prototype.toFailure = function(r8) {
  let e = this.expr === w ? "nothing" : "not " + this.expr.toFailure(r8);
  return new T(this, e, "description");
};
b2.prototype.toFailure = function(r8) {
  return this.expr.toFailure(r8);
};
f2.prototype.toFailure = function(r8) {
  let { description: e } = r8.rules[this.ruleName];
  return e || (e = (/^[aeiouAEIOU]/.test(this.ruleName) ? "an" : "a") + " " + this.ruleName), new T(this, e, "description");
};
v.prototype.toFailure = function(r8) {
  return new T(this, "a Unicode [" + this.category + "] character", "description");
};
g3.prototype.toFailure = function(r8) {
  let t = "(" + this.terms.map((n2) => n2.toFailure(r8)).join(" or ") + ")";
  return new T(this, t, "description");
};
x3.prototype.toFailure = function(r8) {
  let t = "(" + this.factors.map((n2) => n2.toFailure(r8)).join(" ") + ")";
  return new T(this, t, "description");
};
O2.prototype.toFailure = function(r8) {
  let e = "(" + this.expr.toFailure(r8) + this.operator + ")";
  return new T(this, e, "description");
};
h3.prototype.toString = f("toString");
w.toString = function() {
  return "any";
};
_.toString = function() {
  return "end";
};
I.prototype.toString = function() {
  return JSON.stringify(this.obj);
};
y2.prototype.toString = function() {
  return JSON.stringify(this.from) + ".." + JSON.stringify(this.to);
};
S3.prototype.toString = function() {
  return "$" + this.index;
};
L.prototype.toString = function() {
  return "#(" + this.expr.toString() + ")";
};
g3.prototype.toString = function() {
  return this.terms.length === 1 ? this.terms[0].toString() : "(" + this.terms.map((r8) => r8.toString()).join(" | ") + ")";
};
x3.prototype.toString = function() {
  return this.factors.length === 1 ? this.factors[0].toString() : "(" + this.factors.map((r8) => r8.toString()).join(" ") + ")";
};
O2.prototype.toString = function() {
  return this.expr + this.operator;
};
A2.prototype.toString = function() {
  return "~" + this.expr;
};
b2.prototype.toString = function() {
  return "&" + this.expr;
};
f2.prototype.toString = function() {
  if (this.args.length > 0) {
    let r8 = this.args.map((e) => e.toString());
    return this.ruleName + "<" + r8.join(",") + ">";
  } else return this.ruleName;
};
v.prototype.toString = function() {
  return "\\p{" + this.category + "}";
};
var ee = class r5 extends h3 {
  constructor(e) {
    super(), this.obj = e;
  }
  _getString(e) {
    let t = e.currentApplication().args[this.obj.index];
    return p(t instanceof I, "expected a Terminal expression"), t.obj;
  }
  allowsSkippingPrecedingSpace() {
    return true;
  }
  eval(e) {
    let { inputStream: t } = e, n2 = t.pos, s2 = this._getString(e);
    return t.matchString(s2, true) ? (e.pushBinding(new j(s2.length), n2), true) : (e.processFailure(n2, this), false);
  }
  getArity() {
    return 1;
  }
  substituteParams(e) {
    return new r5(this.obj.substituteParams(e));
  }
  toDisplayString() {
    return this.obj.toDisplayString() + " (case-insensitive)";
  }
  toFailure(e) {
    return new T(this, this.obj.toFailure(e) + " (case-insensitive)", "description");
  }
  _isNullable(e, t) {
    return this.obj._isNullable(e, t);
  }
};
var pt;
O((r8) => {
  pt = r8.rules.applySyntactic.body;
});
var ke = new f2("spaces");
var be = class {
  constructor(e, t, n2) {
    this.matcher = e, this.startExpr = t, this.grammar = e.grammar, this.input = e.getInput(), this.inputStream = new z(this.input), this.memoTable = e._memoTable, this.userData = void 0, this.doNotMemoize = false, this._bindings = [], this._bindingOffsets = [], this._applicationStack = [], this._posStack = [0], this.inLexifiedContextStack = [false], this.rightmostFailurePosition = -1, this._rightmostFailurePositionStack = [], this._recordedFailuresStack = [], n2 !== void 0 && (this.positionToRecordFailures = n2, this.recordedFailures = /* @__PURE__ */ Object.create(null));
  }
  posToOffset(e) {
    return e - this._posStack[this._posStack.length - 1];
  }
  enterApplication(e, t) {
    this._posStack.push(this.inputStream.pos), this._applicationStack.push(t), this.inLexifiedContextStack.push(false), e.enter(t), this._rightmostFailurePositionStack.push(this.rightmostFailurePosition), this.rightmostFailurePosition = -1;
  }
  exitApplication(e, t) {
    let n2 = this._posStack.pop();
    this._applicationStack.pop(), this.inLexifiedContextStack.pop(), e.exit(), this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, this._rightmostFailurePositionStack.pop()), t && this.pushBinding(t, n2);
  }
  enterLexifiedContext() {
    this.inLexifiedContextStack.push(true);
  }
  exitLexifiedContext() {
    this.inLexifiedContextStack.pop();
  }
  currentApplication() {
    return this._applicationStack[this._applicationStack.length - 1];
  }
  inSyntacticContext() {
    let e = this.currentApplication();
    return e ? e.isSyntactic() && !this.inLexifiedContext() : this.startExpr.factors[0].isSyntactic();
  }
  inLexifiedContext() {
    return this.inLexifiedContextStack[this.inLexifiedContextStack.length - 1];
  }
  skipSpaces() {
    return this.pushFailuresInfo(), this.eval(ke), this.popBinding(), this.popFailuresInfo(), this.inputStream.pos;
  }
  skipSpacesIfInSyntacticContext() {
    return this.inSyntacticContext() ? this.skipSpaces() : this.inputStream.pos;
  }
  maybeSkipSpacesBefore(e) {
    return e.allowsSkippingPrecedingSpace() && e !== ke ? this.skipSpacesIfInSyntacticContext() : this.inputStream.pos;
  }
  pushBinding(e, t) {
    this._bindings.push(e), this._bindingOffsets.push(this.posToOffset(t));
  }
  popBinding() {
    this._bindings.pop(), this._bindingOffsets.pop();
  }
  numBindings() {
    return this._bindings.length;
  }
  truncateBindings(e) {
    for (; this._bindings.length > e; ) this.popBinding();
  }
  getCurrentPosInfo() {
    return this.getPosInfo(this.inputStream.pos);
  }
  getPosInfo(e) {
    let t = this.memoTable[e];
    return t || (t = this.memoTable[e] = new Ie()), t;
  }
  processFailure(e, t) {
    if (this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, e), this.recordedFailures && e === this.positionToRecordFailures) {
      let n2 = this.currentApplication();
      n2 && (t = t.substituteParams(n2.args)), this.recordFailure(t.toFailure(this.grammar), false);
    }
  }
  recordFailure(e, t) {
    let n2 = e.toKey();
    this.recordedFailures[n2] ? this.recordedFailures[n2].isFluffy() && !e.isFluffy() && this.recordedFailures[n2].clearFluffy() : this.recordedFailures[n2] = t ? e.clone() : e;
  }
  recordFailures(e, t) {
    Object.keys(e).forEach((n2) => {
      this.recordFailure(e[n2], t);
    });
  }
  cloneRecordedFailures() {
    if (!this.recordedFailures) return;
    let e = /* @__PURE__ */ Object.create(null);
    return Object.keys(this.recordedFailures).forEach((t) => {
      e[t] = this.recordedFailures[t].clone();
    }), e;
  }
  getRightmostFailurePosition() {
    return this.rightmostFailurePosition;
  }
  _getRightmostFailureOffset() {
    return this.rightmostFailurePosition >= 0 ? this.posToOffset(this.rightmostFailurePosition) : -1;
  }
  getMemoizedTraceEntry(e, t) {
    let n2 = this.memoTable[e];
    if (n2 && t instanceof f2) {
      let s2 = n2.memo[t.toMemoKey()];
      if (s2 && s2.traceEntry) {
        let i2 = s2.traceEntry.cloneWithExpr(t);
        return i2.isMemoized = true, i2;
      }
    }
    return null;
  }
  getTraceEntry(e, t, n2, s2) {
    if (t instanceof f2) {
      let i2 = this.currentApplication(), o = i2 ? i2.args : [];
      t = t.substituteParams(o);
    }
    return this.getMemoizedTraceEntry(e, t) || new W(this.input, e, this.inputStream.pos, t, n2, s2, this.trace);
  }
  isTracing() {
    return !!this.trace;
  }
  hasNecessaryInfo(e) {
    return this.trace && !e.traceEntry ? false : this.recordedFailures && this.inputStream.pos + e.rightmostFailureOffset === this.positionToRecordFailures ? !!e.failuresAtRightmostPosition : true;
  }
  useMemoizedResult(e, t) {
    this.trace && this.trace.push(t.traceEntry);
    let n2 = this.inputStream.pos + t.rightmostFailureOffset;
    return this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, n2), this.recordedFailures && this.positionToRecordFailures === n2 && t.failuresAtRightmostPosition && this.recordFailures(t.failuresAtRightmostPosition, true), this.inputStream.examinedLength = Math.max(this.inputStream.examinedLength, t.examinedLength + e), t.value ? (this.inputStream.pos += t.matchLength, this.pushBinding(t.value, e), true) : false;
  }
  eval(e) {
    let { inputStream: t } = this, n2 = this._bindings.length, s2 = this.userData, i2;
    this.recordedFailures && (i2 = this.recordedFailures, this.recordedFailures = /* @__PURE__ */ Object.create(null));
    let o = t.pos, l2 = this.maybeSkipSpacesBefore(e), c2;
    this.trace && (c2 = this.trace, this.trace = []);
    let m2 = e.eval(this);
    if (this.trace) {
      let a2 = this._bindings.slice(n2), p2 = this.getTraceEntry(l2, e, m2, a2);
      p2.isImplicitSpaces = e === ke, p2.isRootNode = e === this.startExpr, c2.push(p2), this.trace = c2;
    }
    return m2 ? this.recordedFailures && t.pos === this.positionToRecordFailures && Object.keys(this.recordedFailures).forEach((a2) => {
      this.recordedFailures[a2].makeFluffy();
    }) : (t.pos = o, this.truncateBindings(n2), this.userData = s2), this.recordedFailures && this.recordFailures(i2, false), e === pt && this.skipSpaces(), m2;
  }
  getMatchResult() {
    this.grammar._setUpMatchState(this), this.eval(this.startExpr);
    let e;
    this.recordedFailures && (e = Object.keys(this.recordedFailures).map((n2) => this.recordedFailures[n2]));
    let t = this._bindings[0];
    return t && (t.grammar = this.grammar), new Y(this.matcher, this.input, this.startExpr, t, this._bindingOffsets[0], this.rightmostFailurePosition, e);
  }
  getTrace() {
    this.trace = [];
    let e = this.getMatchResult(), t = this.trace[this.trace.length - 1];
    return t.result = e, t;
  }
  pushFailuresInfo() {
    this._rightmostFailurePositionStack.push(this.rightmostFailurePosition), this._recordedFailuresStack.push(this.recordedFailures);
  }
  popFailuresInfo() {
    this.rightmostFailurePosition = this._rightmostFailurePositionStack.pop(), this.recordedFailures = this._recordedFailuresStack.pop();
  }
};
var _e = class {
  constructor(e) {
    this.grammar = e, this._memoTable = [], this._input = "", this._isMemoTableStale = false;
  }
  _resetMemoTable() {
    this._memoTable = [], this._isMemoTableStale = false;
  }
  getInput() {
    return this._input;
  }
  setInput(e) {
    return this._input !== e && this.replaceInputRange(0, this._input.length, e), this;
  }
  replaceInputRange(e, t, n2) {
    let s2 = this._input, i2 = this._memoTable;
    if (e < 0 || e > s2.length || t < 0 || t > s2.length || e > t) throw new Error("Invalid indices: " + e + " and " + t);
    this._input = s2.slice(0, e) + n2 + s2.slice(t), this._input !== s2 && i2.length > 0 && (this._isMemoTableStale = true);
    let o = i2.slice(t);
    i2.length = e;
    for (let l2 = 0; l2 < n2.length; l2++) i2.push(void 0);
    for (let l2 of o) i2.push(l2);
    for (let l2 = 0; l2 < e; l2++) {
      let c2 = i2[l2];
      c2 && c2.clearObsoleteEntries(l2, e);
    }
    return this;
  }
  match(e, t = { incremental: true }) {
    return this._match(this._getStartExpr(e), { incremental: t.incremental, tracing: false });
  }
  trace(e, t = { incremental: true }) {
    return this._match(this._getStartExpr(e), { incremental: t.incremental, tracing: true });
  }
  _match(e, t = {}) {
    let n2 = { tracing: false, incremental: true, positionToRecordFailures: void 0, ...t };
    if (!n2.incremental) this._resetMemoTable();
    else if (this._isMemoTableStale && !this.grammar.supportsIncrementalParsing) throw $e(this.grammar);
    let s2 = new be(this, e, n2.positionToRecordFailures);
    return n2.tracing ? s2.getTrace() : s2.getMatchResult();
  }
  _getStartExpr(e) {
    let t = e || this.grammar.defaultStartRule;
    if (!t) throw new Error("Missing start rule argument -- the grammar has no default start rule.");
    let n2 = this.grammar.parseApplication(t);
    return new x3([n2, _]);
  }
};
var oe = [];
var Me = (r8, e) => Object.prototype.hasOwnProperty.call(r8, e);
var we = class {
  constructor(e, t, n2) {
    this._node = e, this.source = t, this._baseInterval = n2, e.isNonterminal() && p(t === n2), this._childWrappers = [];
  }
  _forgetMemoizedResultFor(e) {
    delete this._node[this._semantics.attributeKeys[e]], this.children.forEach((t) => {
      t._forgetMemoizedResultFor(e);
    });
  }
  child(e) {
    if (!(0 <= e && e < this._node.numChildren())) return;
    let t = this._childWrappers[e];
    if (!t) {
      let n2 = this._node.childAt(e), s2 = this._node.childOffsets[e], i2 = this._baseInterval.subInterval(s2, n2.matchLength), o = n2.isNonterminal() ? i2 : this._baseInterval;
      t = this._childWrappers[e] = this._semantics.wrap(n2, i2, o);
    }
    return t;
  }
  _children() {
    for (let e = 0; e < this._node.numChildren(); e++) this.child(e);
    return this._childWrappers;
  }
  isIteration() {
    return this._node.isIteration();
  }
  isTerminal() {
    return this._node.isTerminal();
  }
  isNonterminal() {
    return this._node.isNonterminal();
  }
  isSyntactic() {
    return this.isNonterminal() && this._node.isSyntactic();
  }
  isLexical() {
    return this.isNonterminal() && this._node.isLexical();
  }
  isOptional() {
    return this._node.isOptional();
  }
  iteration(e) {
    let t = e || [], n2 = t.map((o) => o._node), s2 = new X(n2, [], -1, false), i2 = this._semantics.wrap(s2, null, null);
    return i2._childWrappers = t, i2;
  }
  get children() {
    return this._children();
  }
  get ctorName() {
    return this._node.ctorName;
  }
  get numChildren() {
    return this._node.numChildren();
  }
  get sourceString() {
    return this.source.contents;
  }
};
var k = class r6 {
  constructor(e, t) {
    let n2 = this;
    if (this.grammar = e, this.checkedActionDicts = false, this.Wrapper = class extends (t ? t.Wrapper : we) {
      constructor(s2, i2, o) {
        super(s2, i2, o), n2.checkActionDictsIfHaventAlready(), this._semantics = n2;
      }
      toString() {
        return "[semantics wrapper for " + n2.grammar.name + "]";
      }
    }, this.super = t, t) {
      if (!(e.equals(this.super.grammar) || e._inheritsFrom(this.super.grammar))) throw new Error("Cannot extend a semantics for grammar '" + this.super.grammar.name + "' for use with grammar '" + e.name + "' (not a sub-grammar)");
      this.operations = Object.create(this.super.operations), this.attributes = Object.create(this.super.attributes), this.attributeKeys = /* @__PURE__ */ Object.create(null);
      for (let s2 in this.attributes) Object.defineProperty(this.attributeKeys, s2, { value: C2(s2) });
    } else this.operations = /* @__PURE__ */ Object.create(null), this.attributes = /* @__PURE__ */ Object.create(null), this.attributeKeys = /* @__PURE__ */ Object.create(null);
  }
  toString() {
    return "[semantics for " + this.grammar.name + "]";
  }
  checkActionDictsIfHaventAlready() {
    this.checkedActionDicts || (this.checkActionDicts(), this.checkedActionDicts = true);
  }
  checkActionDicts() {
    let e;
    for (e in this.operations) this.operations[e].checkActionDict(this.grammar);
    for (e in this.attributes) this.attributes[e].checkActionDict(this.grammar);
  }
  toRecipe(e) {
    function t(s2) {
      return s2.super !== r6.BuiltInSemantics._getSemantics();
    }
    let n2 = `(function(g) {
`;
    if (t(this)) {
      n2 += "  var semantics = " + this.super.toRecipe(true) + "(g";
      let s2 = this.super.grammar, i2 = this.grammar;
      for (; i2 !== s2; ) n2 += ".superGrammar", i2 = i2.superGrammar;
      n2 += `);
`, n2 += "  return g.extendSemantics(semantics)";
    } else n2 += "  return g.createSemantics()";
    return ["Operation", "Attribute"].forEach((s2) => {
      let i2 = this[s2.toLowerCase() + "s"];
      Object.keys(i2).forEach((o) => {
        let { actionDict: l2, formals: c2, builtInDefault: m2 } = i2[o], a2 = o;
        c2.length > 0 && (a2 += "(" + c2.join(", ") + ")");
        let p2;
        t(this) && this.super[s2.toLowerCase() + "s"][o] ? p2 = "extend" + s2 : p2 = "add" + s2, n2 += `
    .` + p2 + "(" + JSON.stringify(a2) + ", {";
        let u2 = [];
        Object.keys(l2).forEach((d3) => {
          if (l2[d3] !== m2) {
            let N2 = l2[d3].toString().trim();
            N2 = N2.replace(/^.*\(/, "function("), u2.push(`
      ` + JSON.stringify(d3) + ": " + N2);
          }
        }), n2 += u2.join(",") + `
    })`;
      });
    }), n2 += `;
  })`, e || (n2 = `(function() {
  var grammar = this.fromRecipe(` + this.grammar.toRecipe() + `);
  var semantics = ` + n2 + `(grammar);
  return semantics;
});
`), n2;
  }
  addOperationOrAttribute(e, t, n2) {
    let s2 = e + "s", i2 = lt(t, e), { name: o } = i2, { formals: l2 } = i2;
    this.assertNewName(o, e);
    let c2 = ir(e, o, p2), m2 = { _default: c2 };
    Object.keys(n2).forEach((u2) => {
      m2[u2] = n2[u2];
    });
    let a2 = e === "operation" ? new Q(o, l2, m2, c2) : new ae(o, m2, c2);
    a2.checkActionDict(this.grammar), this[s2][o] = a2;
    function p2(...u2) {
      let d3 = this._semantics[s2][o];
      if (arguments.length !== d3.formals.length) throw new Error("Invalid number of arguments passed to " + o + " " + e + " (expected " + d3.formals.length + ", got " + arguments.length + ")");
      let N2 = /* @__PURE__ */ Object.create(null);
      for (let [J, te] of Object.entries(u2)) {
        let wt = d3.formals[J];
        N2[wt] = te;
      }
      let E = this.args;
      this.args = N2;
      let C3 = d3.execute(this._semantics, this);
      return this.args = E, C3;
    }
    e === "operation" ? (this.Wrapper.prototype[o] = p2, this.Wrapper.prototype[o].toString = function() {
      return "[" + o + " operation]";
    }) : (Object.defineProperty(this.Wrapper.prototype, o, { get: p2, configurable: true }), Object.defineProperty(this.attributeKeys, o, { value: C2(o) }));
  }
  extendOperationOrAttribute(e, t, n2) {
    let s2 = e + "s";
    if (lt(t, "attribute"), !(this.super && t in this.super[s2])) throw new Error("Cannot extend " + e + " '" + t + "': did not inherit an " + e + " with that name");
    if (Me(this[s2], t)) throw new Error("Cannot extend " + e + " '" + t + "' again");
    let i2 = this[s2][t].formals, o = this[s2][t].actionDict, l2 = Object.create(o);
    Object.keys(n2).forEach((c2) => {
      l2[c2] = n2[c2];
    }), this[s2][t] = e === "operation" ? new Q(t, i2, l2) : new ae(t, l2), this[s2][t].checkActionDict(this.grammar);
  }
  assertNewName(e, t) {
    if (Me(we.prototype, e)) throw new Error("Cannot add " + t + " '" + e + "': that's a reserved name");
    if (e in this.operations) throw new Error("Cannot add " + t + " '" + e + "': an operation with that name already exists");
    if (e in this.attributes) throw new Error("Cannot add " + t + " '" + e + "': an attribute with that name already exists");
  }
  wrap(e, t, n2) {
    let s2 = n2 || t;
    return e instanceof this.Wrapper ? e : new this.Wrapper(e, t, s2);
  }
};
function lt(r8, e) {
  if (!k.prototypeGrammar) return p(r8.indexOf("(") === -1), { name: r8, formals: [] };
  let t = k.prototypeGrammar.match(r8, e === "operation" ? "OperationSignature" : "AttributeSignature");
  if (t.failed()) throw new Error(t.message);
  return k.prototypeGrammarSemantics(t).parse();
}
function ir(r8, e, t) {
  return function(...n2) {
    let i2 = (this._semantics.operations[e] || this._semantics.attributes[e]).formals.map((o) => this.args[o]);
    if (!this.isIteration() && n2.length === 1) return t.apply(n2[0], i2);
    throw rt(this.ctorName, e, r8, oe);
  };
}
k.createSemantics = function(r8, e) {
  let t = new k(r8, e !== void 0 ? e : k.BuiltInSemantics._getSemantics()), n2 = function(i2) {
    if (!(i2 instanceof Y)) throw new TypeError("Semantics expected a MatchResult, but got " + S(i2));
    if (i2.failed()) throw new TypeError("cannot apply Semantics to " + i2.toString());
    let o = i2._cst;
    if (o.grammar !== r8) throw new Error("Cannot use a MatchResult from grammar '" + o.grammar.name + "' with a semantics for '" + r8.name + "'");
    let l2 = new z(i2.input);
    return t.wrap(o, l2.interval(i2._cstOffset, i2.input.length));
  };
  return n2.addOperation = function(s2, i2) {
    return t.addOperationOrAttribute("operation", s2, i2), n2;
  }, n2.extendOperation = function(s2, i2) {
    return t.extendOperationOrAttribute("operation", s2, i2), n2;
  }, n2.addAttribute = function(s2, i2) {
    return t.addOperationOrAttribute("attribute", s2, i2), n2;
  }, n2.extendAttribute = function(s2, i2) {
    return t.extendOperationOrAttribute("attribute", s2, i2), n2;
  }, n2._getActionDict = function(s2) {
    let i2 = t.operations[s2] || t.attributes[s2];
    if (!i2) throw new Error('"' + s2 + '" is not a valid operation or attribute name in this semantics for "' + r8.name + '"');
    return i2.actionDict;
  }, n2._remove = function(s2) {
    let i2;
    return s2 in t.operations ? (i2 = t.operations[s2], delete t.operations[s2]) : s2 in t.attributes && (i2 = t.attributes[s2], delete t.attributes[s2]), delete t.Wrapper.prototype[s2], i2;
  }, n2.getOperationNames = function() {
    return Object.keys(t.operations);
  }, n2.getAttributeNames = function() {
    return Object.keys(t.attributes);
  }, n2.getGrammar = function() {
    return t.grammar;
  }, n2.toRecipe = function(s2) {
    return t.toRecipe(s2);
  }, n2.toString = t.toString.bind(t), n2._getSemantics = function() {
    return t;
  }, n2;
};
var Q = class {
  constructor(e, t, n2, s2) {
    this.name = e, this.formals = t, this.actionDict = n2, this.builtInDefault = s2;
  }
  checkActionDict(e) {
    e._checkTopDownActionDict(this.typeName, this.name, this.actionDict);
  }
  execute(e, t) {
    try {
      let { ctorName: n2 } = t._node, s2 = this.actionDict[n2];
      return s2 ? (oe.push([this, n2]), s2.apply(t, t._children())) : t.isNonterminal() && (s2 = this.actionDict._nonterminal, s2) ? (oe.push([this, "_nonterminal", n2]), s2.apply(t, t._children())) : (oe.push([this, "default action", n2]), this.actionDict._default.apply(t, t._children()));
    } finally {
      oe.pop();
    }
  }
};
Q.prototype.typeName = "operation";
var ae = class extends Q {
  constructor(e, t, n2) {
    super(e, [], t, n2);
  }
  execute(e, t) {
    let n2 = t._node, s2 = e.attributeKeys[this.name];
    return Me(n2, s2) || (n2[s2] = Q.prototype.execute.call(this, e, t)), n2[s2];
  }
};
ae.prototype.typeName = "attribute";
var ct = ["_iter", "_terminal", "_nonterminal", "_default"];
function ut(r8) {
  return Object.keys(r8.rules).sort().map((e) => r8.rules[e]);
}
var or = (r8) => r8.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
var ht;
var mt;
var P = class r7 {
  constructor(e, t, n2, s2) {
    if (this.name = e, this.superGrammar = t, this.rules = n2, s2) {
      if (!(s2 in n2)) throw new Error("Invalid start rule: '" + s2 + "' is not a rule in grammar '" + e + "'");
      this.defaultStartRule = s2;
    }
    this._matchStateInitializer = void 0, this.supportsIncrementalParsing = true;
  }
  matcher() {
    return new _e(this);
  }
  isBuiltIn() {
    return this === r7.ProtoBuiltInRules || this === r7.BuiltInRules;
  }
  equals(e) {
    if (this === e) return true;
    if (e == null || this.name !== e.name || this.defaultStartRule !== e.defaultStartRule || !(this.superGrammar === e.superGrammar || this.superGrammar.equals(e.superGrammar))) return false;
    let t = ut(this), n2 = ut(e);
    return t.length === n2.length && t.every((s2, i2) => s2.description === n2[i2].description && s2.formals.join(",") === n2[i2].formals.join(",") && s2.body.toString() === n2[i2].body.toString());
  }
  match(e, t) {
    let n2 = this.matcher();
    return n2.replaceInputRange(0, 0, e), n2.match(t);
  }
  trace(e, t) {
    let n2 = this.matcher();
    return n2.replaceInputRange(0, 0, e), n2.trace(t);
  }
  createSemantics() {
    return k.createSemantics(this);
  }
  extendSemantics(e) {
    return k.createSemantics(this, e._getSemantics());
  }
  _checkTopDownActionDict(e, t, n2) {
    let s2 = [];
    for (let i2 in n2) {
      let o = n2[i2];
      if (!ct.includes(i2) && !(i2 in this.rules)) {
        s2.push(`'${i2}' is not a valid semantic action for '${this.name}'`);
        continue;
      }
      if (typeof o != "function") {
        s2.push(`'${i2}' must be a function in an action dictionary for '${this.name}'`);
        continue;
      }
      let c2 = o.length, m2 = this._topDownActionArity(i2);
      if (c2 !== m2) {
        let a2;
        i2 === "_iter" || i2 === "_nonterminal" ? a2 = `it should use a rest parameter, e.g. \`${i2}(...children) {}\`. NOTE: this is new in Ohm v16 \u2014 see https://ohmjs.org/d/ati for details.` : a2 = `expected ${m2}, got ${c2}`, s2.push(`Semantic action '${i2}' has the wrong arity: ${a2}`);
      }
    }
    if (s2.length > 0) {
      let i2 = s2.map((l2) => "- " + l2), o = new Error([`Found errors in the action dictionary of the '${t}' ${e}:`, ...i2].join(`
`));
      throw o.problems = s2, o;
    }
  }
  _topDownActionArity(e) {
    return ct.includes(e) ? 0 : this.rules[e].body.getArity();
  }
  _inheritsFrom(e) {
    let t = this.superGrammar;
    for (; t; ) {
      if (t.equals(e, true)) return true;
      t = t.superGrammar;
    }
    return false;
  }
  toRecipe(e = void 0) {
    let t = {};
    this.source && (t.source = this.source.contents);
    let n2 = null;
    this.defaultStartRule && (n2 = this.defaultStartRule);
    let s2 = {};
    Object.keys(this.rules).forEach((l2) => {
      let c2 = this.rules[l2], { body: m2 } = c2, a2 = !this.superGrammar || !this.superGrammar.rules[l2], p2;
      a2 ? p2 = "define" : p2 = m2 instanceof G ? "extend" : "override";
      let u2 = {};
      if (c2.source && this.source) {
        let E = c2.source.relativeTo(this.source);
        u2.sourceInterval = [E.startIdx, E.endIdx];
      }
      let d3 = a2 ? c2.description : null, N2 = m2.outputRecipe(c2.formals, this.source);
      s2[l2] = [p2, u2, d3, c2.formals, N2];
    });
    let i2 = "null";
    e ? i2 = e : this.superGrammar && !this.superGrammar.isBuiltIn() && (i2 = this.superGrammar.toRecipe());
    let o = [...["grammar", t, this.name].map(JSON.stringify), i2, ...[n2, s2].map(JSON.stringify)];
    return or(`[${o.join(",")}]`);
  }
  toOperationActionDictionaryTemplate() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  }
  toAttributeActionDictionaryTemplate() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  }
  _toOperationOrAttributeActionDictionaryTemplate() {
    let e = new i();
    e.append("{");
    let t = true;
    for (let n2 in this.rules) {
      let { body: s2 } = this.rules[n2];
      t ? t = false : e.append(","), e.append(`
`), e.append("  "), this.addSemanticActionTemplate(n2, s2, e);
    }
    return e.append(`
}`), e.contents();
  }
  addSemanticActionTemplate(e, t, n2) {
    n2.append(e), n2.append(": function(");
    let s2 = this._topDownActionArity(e);
    n2.append(d("_", s2).join(", ")), n2.append(`) {
`), n2.append("  }");
  }
  parseApplication(e) {
    let t;
    if (e.indexOf("<") === -1) t = new f2(e);
    else {
      let s2 = ht.match(e, "Base_application");
      t = mt(s2, {});
    }
    if (!(t.ruleName in this.rules)) throw me(t.ruleName, this.name);
    let { formals: n2 } = this.rules[t.ruleName];
    if (n2.length !== t.args.length) {
      let { source: s2 } = this.rules[t.ruleName];
      throw fe(t.ruleName, n2.length, t.args.length, s2);
    }
    return t;
  }
  _setUpMatchState(e) {
    this._matchStateInitializer && this._matchStateInitializer(e);
  }
};
P.ProtoBuiltInRules = new P("ProtoBuiltInRules", void 0, { any: { body: w, formals: [], description: "any character", primitive: true }, end: { body: _, formals: [], description: "end of input", primitive: true }, caseInsensitive: { body: new ee(new S3(0)), formals: ["str"], primitive: true }, lower: { body: new v("Ll"), formals: [], description: "a lowercase letter", primitive: true }, upper: { body: new v("Lu"), formals: [], description: "an uppercase letter", primitive: true }, unicodeLtmo: { body: new v("Ltmo"), formals: [], description: "a Unicode character in Lt, Lm, or Lo", primitive: true }, spaces: { body: new M(new f2("space")), formals: [] }, space: { body: new y2("\0", " "), formals: [], description: "a space" } });
P.initApplicationParser = function(r8, e) {
  ht = r8, mt = e;
};
var le = class {
  constructor(e) {
    this.name = e;
  }
  sourceInterval(e, t) {
    return this.source.subInterval(e, t - e);
  }
  ensureSuperGrammar() {
    return this.superGrammar || this.withSuperGrammar(this.name === "BuiltInRules" ? P.ProtoBuiltInRules : P.BuiltInRules), this.superGrammar;
  }
  ensureSuperGrammarRuleForOverriding(e, t) {
    let n2 = this.ensureSuperGrammar().rules[e];
    if (!n2) throw Ve(e, this.superGrammar.name, t);
    return n2;
  }
  installOverriddenOrExtendedRule(e, t, n2, s2) {
    let i2 = x(t);
    if (i2.length > 0) throw Re(e, i2, s2);
    let o = this.ensureSuperGrammar().rules[e], l2 = o.formals, c2 = l2 ? l2.length : 0;
    if (t.length !== c2) throw fe(e, c2, t.length, s2);
    return this.install(e, t, n2, o.description, s2);
  }
  install(e, t, n2, s2, i2, o = false) {
    return this.rules[e] = { body: n2.introduceParams(t), formals: t, description: s2, source: i2, primitive: o }, this;
  }
  withSuperGrammar(e) {
    if (this.superGrammar) throw new Error("the super grammar of a GrammarDecl cannot be set more than once");
    return this.superGrammar = e, this.rules = Object.create(e.rules), e.isBuiltIn() || (this.defaultStartRule = e.defaultStartRule), this;
  }
  withDefaultStartRule(e) {
    return this.defaultStartRule = e, this;
  }
  withSource(e) {
    return this.source = new z(e).interval(0, e.length), this;
  }
  build() {
    let e = new P(this.name, this.ensureSuperGrammar(), this.rules, this.defaultStartRule);
    e._matchStateInitializer = e.superGrammar._matchStateInitializer, e.supportsIncrementalParsing = e.superGrammar.supportsIncrementalParsing;
    let t = [], n2 = false;
    return Object.keys(e.rules).forEach((s2) => {
      let { body: i2 } = e.rules[s2];
      try {
        i2.assertChoicesHaveUniformArity(s2);
      } catch (o) {
        t.push(o);
      }
      try {
        i2.assertAllApplicationsAreValid(s2, e);
      } catch (o) {
        t.push(o), n2 = true;
      }
    }), n2 || Object.keys(e.rules).forEach((s2) => {
      let { body: i2 } = e.rules[s2];
      try {
        i2.assertIteratedExprsAreNotNullable(e, []);
      } catch (o) {
        t.push(o);
      }
    }), t.length > 0 && nt(t), this.source && (e.source = this.source), e;
  }
  define(e, t, n2, s2, i2, o) {
    if (this.ensureSuperGrammar(), this.superGrammar.rules[e]) throw Oe(e, this.name, this.superGrammar.name, i2);
    if (this.rules[e]) throw Oe(e, this.name, this.name, i2);
    let l2 = x(t);
    if (l2.length > 0) throw Re(e, l2, i2);
    return this.install(e, t, n2, s2, i2, o);
  }
  override(e, t, n2, s2, i2) {
    return this.ensureSuperGrammarRuleForOverriding(e, i2), this.installOverriddenOrExtendedRule(e, t, n2, i2), this;
  }
  extend(e, t, n2, s2, i2) {
    if (!this.ensureSuperGrammar().rules[e]) throw We(e, this.superGrammar.name, i2);
    let l2 = new G(this.superGrammar, e, n2);
    return l2.source = n2.source, this.installOverriddenOrExtendedRule(e, t, l2, i2), this;
  }
};
var V = class {
  constructor() {
    this.currentDecl = null, this.currentRuleName = null;
  }
  newGrammar(e) {
    return new le(e);
  }
  grammar(e, t, n2, s2, i2) {
    let o = new le(t);
    return n2 && o.withSuperGrammar(n2 instanceof P ? n2 : this.fromRecipe(n2)), s2 && o.withDefaultStartRule(s2), e && e.source && o.withSource(e.source), this.currentDecl = o, Object.keys(i2).forEach((l2) => {
      this.currentRuleName = l2;
      let c2 = i2[l2], m2 = c2[0], a2 = c2[1], p2 = c2[2], u2 = c2[3], d3 = this.fromRecipe(c2[4]), N2;
      o.source && a2 && a2.sourceInterval && (N2 = o.source.subInterval(a2.sourceInterval[0], a2.sourceInterval[1] - a2.sourceInterval[0])), o[m2](l2, u2, d3, p2, N2);
    }), this.currentRuleName = this.currentDecl = null, o.build();
  }
  terminal(e) {
    return new I(e);
  }
  range(e, t) {
    return new y2(e, t);
  }
  param(e) {
    return new S3(e);
  }
  alt(...e) {
    let t = [];
    for (let n2 of e) n2 instanceof h3 || (n2 = this.fromRecipe(n2)), n2 instanceof g3 ? t = t.concat(n2.terms) : t.push(n2);
    return t.length === 1 ? t[0] : new g3(t);
  }
  seq(...e) {
    let t = [];
    for (let n2 of e) n2 instanceof h3 || (n2 = this.fromRecipe(n2)), n2 instanceof x3 ? t = t.concat(n2.factors) : t.push(n2);
    return t.length === 1 ? t[0] : new x3(t);
  }
  star(e) {
    return e instanceof h3 || (e = this.fromRecipe(e)), new M(e);
  }
  plus(e) {
    return e instanceof h3 || (e = this.fromRecipe(e)), new B(e);
  }
  opt(e) {
    return e instanceof h3 || (e = this.fromRecipe(e)), new F(e);
  }
  not(e) {
    return e instanceof h3 || (e = this.fromRecipe(e)), new A2(e);
  }
  lookahead(e) {
    return e instanceof h3 || (e = this.fromRecipe(e)), new b2(e);
  }
  lex(e) {
    return e instanceof h3 || (e = this.fromRecipe(e)), new L(e);
  }
  app(e, t) {
    return t && t.length > 0 && (t = t.map(function(n2) {
      return n2 instanceof h3 ? n2 : this.fromRecipe(n2);
    }, this)), new f2(e, t);
  }
  splice(e, t) {
    return new q(this.currentDecl.superGrammar, this.currentRuleName, e.map((n2) => this.fromRecipe(n2)), t.map((n2) => this.fromRecipe(n2)));
  }
  fromRecipe(e) {
    let t = e[0] === "grammar" ? e.slice(1) : e.slice(2), n2 = this[e[0]](...t), s2 = e[1];
    return s2 && s2.sourceInterval && this.currentDecl && n2.withSource(this.currentDecl.sourceInterval(...s2.sourceInterval)), n2;
  }
};
function Z(r8) {
  return typeof r8 == "function" ? r8.call(new V()) : (typeof r8 == "string" && (r8 = JSON.parse(r8)), new V().fromRecipe(r8));
}
var ce = Z(["grammar", { source: `BuiltInRules {

  alnum  (an alpha-numeric character)
    = letter
    | digit

  letter  (a letter)
    = lower
    | upper
    | unicodeLtmo

  digit  (a digit)
    = "0".."9"

  hexDigit  (a hexadecimal digit)
    = digit
    | "a".."f"
    | "A".."F"

  ListOf<elem, sep>
    = NonemptyListOf<elem, sep>
    | EmptyListOf<elem, sep>

  NonemptyListOf<elem, sep>
    = elem (sep elem)*

  EmptyListOf<elem, sep>
    = /* nothing */

  listOf<elem, sep>
    = nonemptyListOf<elem, sep>
    | emptyListOf<elem, sep>

  nonemptyListOf<elem, sep>
    = elem (sep elem)*

  emptyListOf<elem, sep>
    = /* nothing */

  // Allows a syntactic rule application within a lexical context.
  applySyntactic<app> = app
}` }, "BuiltInRules", null, null, { alnum: ["define", { sourceInterval: [18, 78] }, "an alpha-numeric character", [], ["alt", { sourceInterval: [60, 78] }, ["app", { sourceInterval: [60, 66] }, "letter", []], ["app", { sourceInterval: [73, 78] }, "digit", []]]], letter: ["define", { sourceInterval: [82, 142] }, "a letter", [], ["alt", { sourceInterval: [107, 142] }, ["app", { sourceInterval: [107, 112] }, "lower", []], ["app", { sourceInterval: [119, 124] }, "upper", []], ["app", { sourceInterval: [131, 142] }, "unicodeLtmo", []]]], digit: ["define", { sourceInterval: [146, 177] }, "a digit", [], ["range", { sourceInterval: [169, 177] }, "0", "9"]], hexDigit: ["define", { sourceInterval: [181, 254] }, "a hexadecimal digit", [], ["alt", { sourceInterval: [219, 254] }, ["app", { sourceInterval: [219, 224] }, "digit", []], ["range", { sourceInterval: [231, 239] }, "a", "f"], ["range", { sourceInterval: [246, 254] }, "A", "F"]]], ListOf: ["define", { sourceInterval: [258, 336] }, null, ["elem", "sep"], ["alt", { sourceInterval: [282, 336] }, ["app", { sourceInterval: [282, 307] }, "NonemptyListOf", [["param", { sourceInterval: [297, 301] }, 0], ["param", { sourceInterval: [303, 306] }, 1]]], ["app", { sourceInterval: [314, 336] }, "EmptyListOf", [["param", { sourceInterval: [326, 330] }, 0], ["param", { sourceInterval: [332, 335] }, 1]]]]], NonemptyListOf: ["define", { sourceInterval: [340, 388] }, null, ["elem", "sep"], ["seq", { sourceInterval: [372, 388] }, ["param", { sourceInterval: [372, 376] }, 0], ["star", { sourceInterval: [377, 388] }, ["seq", { sourceInterval: [378, 386] }, ["param", { sourceInterval: [378, 381] }, 1], ["param", { sourceInterval: [382, 386] }, 0]]]]], EmptyListOf: ["define", { sourceInterval: [392, 434] }, null, ["elem", "sep"], ["seq", { sourceInterval: [438, 438] }]], listOf: ["define", { sourceInterval: [438, 516] }, null, ["elem", "sep"], ["alt", { sourceInterval: [462, 516] }, ["app", { sourceInterval: [462, 487] }, "nonemptyListOf", [["param", { sourceInterval: [477, 481] }, 0], ["param", { sourceInterval: [483, 486] }, 1]]], ["app", { sourceInterval: [494, 516] }, "emptyListOf", [["param", { sourceInterval: [506, 510] }, 0], ["param", { sourceInterval: [512, 515] }, 1]]]]], nonemptyListOf: ["define", { sourceInterval: [520, 568] }, null, ["elem", "sep"], ["seq", { sourceInterval: [552, 568] }, ["param", { sourceInterval: [552, 556] }, 0], ["star", { sourceInterval: [557, 568] }, ["seq", { sourceInterval: [558, 566] }, ["param", { sourceInterval: [558, 561] }, 1], ["param", { sourceInterval: [562, 566] }, 0]]]]], emptyListOf: ["define", { sourceInterval: [572, 682] }, null, ["elem", "sep"], ["seq", { sourceInterval: [685, 685] }]], applySyntactic: ["define", { sourceInterval: [685, 710] }, null, ["app"], ["param", { sourceInterval: [707, 710] }, 0]] }]);
P.BuiltInRules = ce;
S2(P.BuiltInRules);
var ue = Z(["grammar", { source: `Ohm {

  Grammars
    = Grammar*

  Grammar
    = ident SuperGrammar? "{" Rule* "}"

  SuperGrammar
    = "<:" ident

  Rule
    = ident Formals? ruleDescr? "="  RuleBody  -- define
    | ident Formals?            ":=" OverrideRuleBody  -- override
    | ident Formals?            "+=" RuleBody  -- extend

  RuleBody
    = "|"? NonemptyListOf<TopLevelTerm, "|">

  TopLevelTerm
    = Seq caseName  -- inline
    | Seq

  OverrideRuleBody
    = "|"? NonemptyListOf<OverrideTopLevelTerm, "|">

  OverrideTopLevelTerm
    = "..."  -- superSplice
    | TopLevelTerm

  Formals
    = "<" ListOf<ident, ","> ">"

  Params
    = "<" ListOf<Seq, ","> ">"

  Alt
    = NonemptyListOf<Seq, "|">

  Seq
    = Iter*

  Iter
    = Pred "*"  -- star
    | Pred "+"  -- plus
    | Pred "?"  -- opt
    | Pred

  Pred
    = "~" Lex  -- not
    | "&" Lex  -- lookahead
    | Lex

  Lex
    = "#" Base  -- lex
    | Base

  Base
    = ident Params? ~(ruleDescr? "=" | ":=" | "+=")  -- application
    | oneCharTerminal ".." oneCharTerminal           -- range
    | terminal                                       -- terminal
    | "(" Alt ")"                                    -- paren

  ruleDescr  (a rule description)
    = "(" ruleDescrText ")"

  ruleDescrText
    = (~")" any)*

  caseName
    = "--" (~"\\n" space)* name (~"\\n" space)* ("\\n" | &"}")

  name  (a name)
    = nameFirst nameRest*

  nameFirst
    = "_"
    | letter

  nameRest
    = "_"
    | alnum

  ident  (an identifier)
    = name

  terminal
    = "\\"" terminalChar* "\\""

  oneCharTerminal
    = "\\"" terminalChar "\\""

  terminalChar
    = escapeChar
      | ~"\\\\" ~"\\"" ~"\\n" "\\u{0}".."\\u{10FFFF}"

  escapeChar  (an escape sequence)
    = "\\\\\\\\"                                     -- backslash
    | "\\\\\\""                                     -- doubleQuote
    | "\\\\\\'"                                     -- singleQuote
    | "\\\\b"                                      -- backspace
    | "\\\\n"                                      -- lineFeed
    | "\\\\r"                                      -- carriageReturn
    | "\\\\t"                                      -- tab
    | "\\\\u{" hexDigit hexDigit? hexDigit?
             hexDigit? hexDigit? hexDigit? "}"   -- unicodeCodePoint
    | "\\\\u" hexDigit hexDigit hexDigit hexDigit  -- unicodeEscape
    | "\\\\x" hexDigit hexDigit                    -- hexEscape

  space
   += comment

  comment
    = "//" (~"\\n" any)* &("\\n" | end)  -- singleLine
    | "/*" (~"*/" any)* "*/"  -- multiLine

  tokens = token*

  token = caseName | comment | ident | operator | punctuation | terminal | any

  operator = "<:" | "=" | ":=" | "+=" | "*" | "+" | "?" | "~" | "&"

  punctuation = "<" | ">" | "," | "--"
}` }, "Ohm", null, "Grammars", { Grammars: ["define", { sourceInterval: [9, 32] }, null, [], ["star", { sourceInterval: [24, 32] }, ["app", { sourceInterval: [24, 31] }, "Grammar", []]]], Grammar: ["define", { sourceInterval: [36, 83] }, null, [], ["seq", { sourceInterval: [50, 83] }, ["app", { sourceInterval: [50, 55] }, "ident", []], ["opt", { sourceInterval: [56, 69] }, ["app", { sourceInterval: [56, 68] }, "SuperGrammar", []]], ["terminal", { sourceInterval: [70, 73] }, "{"], ["star", { sourceInterval: [74, 79] }, ["app", { sourceInterval: [74, 78] }, "Rule", []]], ["terminal", { sourceInterval: [80, 83] }, "}"]]], SuperGrammar: ["define", { sourceInterval: [87, 116] }, null, [], ["seq", { sourceInterval: [106, 116] }, ["terminal", { sourceInterval: [106, 110] }, "<:"], ["app", { sourceInterval: [111, 116] }, "ident", []]]], Rule_define: ["define", { sourceInterval: [131, 181] }, null, [], ["seq", { sourceInterval: [131, 170] }, ["app", { sourceInterval: [131, 136] }, "ident", []], ["opt", { sourceInterval: [137, 145] }, ["app", { sourceInterval: [137, 144] }, "Formals", []]], ["opt", { sourceInterval: [146, 156] }, ["app", { sourceInterval: [146, 155] }, "ruleDescr", []]], ["terminal", { sourceInterval: [157, 160] }, "="], ["app", { sourceInterval: [162, 170] }, "RuleBody", []]]], Rule_override: ["define", { sourceInterval: [188, 248] }, null, [], ["seq", { sourceInterval: [188, 235] }, ["app", { sourceInterval: [188, 193] }, "ident", []], ["opt", { sourceInterval: [194, 202] }, ["app", { sourceInterval: [194, 201] }, "Formals", []]], ["terminal", { sourceInterval: [214, 218] }, ":="], ["app", { sourceInterval: [219, 235] }, "OverrideRuleBody", []]]], Rule_extend: ["define", { sourceInterval: [255, 305] }, null, [], ["seq", { sourceInterval: [255, 294] }, ["app", { sourceInterval: [255, 260] }, "ident", []], ["opt", { sourceInterval: [261, 269] }, ["app", { sourceInterval: [261, 268] }, "Formals", []]], ["terminal", { sourceInterval: [281, 285] }, "+="], ["app", { sourceInterval: [286, 294] }, "RuleBody", []]]], Rule: ["define", { sourceInterval: [120, 305] }, null, [], ["alt", { sourceInterval: [131, 305] }, ["app", { sourceInterval: [131, 170] }, "Rule_define", []], ["app", { sourceInterval: [188, 235] }, "Rule_override", []], ["app", { sourceInterval: [255, 294] }, "Rule_extend", []]]], RuleBody: ["define", { sourceInterval: [309, 362] }, null, [], ["seq", { sourceInterval: [324, 362] }, ["opt", { sourceInterval: [324, 328] }, ["terminal", { sourceInterval: [324, 327] }, "|"]], ["app", { sourceInterval: [329, 362] }, "NonemptyListOf", [["app", { sourceInterval: [344, 356] }, "TopLevelTerm", []], ["terminal", { sourceInterval: [358, 361] }, "|"]]]]], TopLevelTerm_inline: ["define", { sourceInterval: [385, 408] }, null, [], ["seq", { sourceInterval: [385, 397] }, ["app", { sourceInterval: [385, 388] }, "Seq", []], ["app", { sourceInterval: [389, 397] }, "caseName", []]]], TopLevelTerm: ["define", { sourceInterval: [366, 418] }, null, [], ["alt", { sourceInterval: [385, 418] }, ["app", { sourceInterval: [385, 397] }, "TopLevelTerm_inline", []], ["app", { sourceInterval: [415, 418] }, "Seq", []]]], OverrideRuleBody: ["define", { sourceInterval: [422, 491] }, null, [], ["seq", { sourceInterval: [445, 491] }, ["opt", { sourceInterval: [445, 449] }, ["terminal", { sourceInterval: [445, 448] }, "|"]], ["app", { sourceInterval: [450, 491] }, "NonemptyListOf", [["app", { sourceInterval: [465, 485] }, "OverrideTopLevelTerm", []], ["terminal", { sourceInterval: [487, 490] }, "|"]]]]], OverrideTopLevelTerm_superSplice: ["define", { sourceInterval: [522, 543] }, null, [], ["terminal", { sourceInterval: [522, 527] }, "..."]], OverrideTopLevelTerm: ["define", { sourceInterval: [495, 562] }, null, [], ["alt", { sourceInterval: [522, 562] }, ["app", { sourceInterval: [522, 527] }, "OverrideTopLevelTerm_superSplice", []], ["app", { sourceInterval: [550, 562] }, "TopLevelTerm", []]]], Formals: ["define", { sourceInterval: [566, 606] }, null, [], ["seq", { sourceInterval: [580, 606] }, ["terminal", { sourceInterval: [580, 583] }, "<"], ["app", { sourceInterval: [584, 602] }, "ListOf", [["app", { sourceInterval: [591, 596] }, "ident", []], ["terminal", { sourceInterval: [598, 601] }, ","]]], ["terminal", { sourceInterval: [603, 606] }, ">"]]], Params: ["define", { sourceInterval: [610, 647] }, null, [], ["seq", { sourceInterval: [623, 647] }, ["terminal", { sourceInterval: [623, 626] }, "<"], ["app", { sourceInterval: [627, 643] }, "ListOf", [["app", { sourceInterval: [634, 637] }, "Seq", []], ["terminal", { sourceInterval: [639, 642] }, ","]]], ["terminal", { sourceInterval: [644, 647] }, ">"]]], Alt: ["define", { sourceInterval: [651, 685] }, null, [], ["app", { sourceInterval: [661, 685] }, "NonemptyListOf", [["app", { sourceInterval: [676, 679] }, "Seq", []], ["terminal", { sourceInterval: [681, 684] }, "|"]]]], Seq: ["define", { sourceInterval: [689, 704] }, null, [], ["star", { sourceInterval: [699, 704] }, ["app", { sourceInterval: [699, 703] }, "Iter", []]]], Iter_star: ["define", { sourceInterval: [719, 736] }, null, [], ["seq", { sourceInterval: [719, 727] }, ["app", { sourceInterval: [719, 723] }, "Pred", []], ["terminal", { sourceInterval: [724, 727] }, "*"]]], Iter_plus: ["define", { sourceInterval: [743, 760] }, null, [], ["seq", { sourceInterval: [743, 751] }, ["app", { sourceInterval: [743, 747] }, "Pred", []], ["terminal", { sourceInterval: [748, 751] }, "+"]]], Iter_opt: ["define", { sourceInterval: [767, 783] }, null, [], ["seq", { sourceInterval: [767, 775] }, ["app", { sourceInterval: [767, 771] }, "Pred", []], ["terminal", { sourceInterval: [772, 775] }, "?"]]], Iter: ["define", { sourceInterval: [708, 794] }, null, [], ["alt", { sourceInterval: [719, 794] }, ["app", { sourceInterval: [719, 727] }, "Iter_star", []], ["app", { sourceInterval: [743, 751] }, "Iter_plus", []], ["app", { sourceInterval: [767, 775] }, "Iter_opt", []], ["app", { sourceInterval: [790, 794] }, "Pred", []]]], Pred_not: ["define", { sourceInterval: [809, 824] }, null, [], ["seq", { sourceInterval: [809, 816] }, ["terminal", { sourceInterval: [809, 812] }, "~"], ["app", { sourceInterval: [813, 816] }, "Lex", []]]], Pred_lookahead: ["define", { sourceInterval: [831, 852] }, null, [], ["seq", { sourceInterval: [831, 838] }, ["terminal", { sourceInterval: [831, 834] }, "&"], ["app", { sourceInterval: [835, 838] }, "Lex", []]]], Pred: ["define", { sourceInterval: [798, 862] }, null, [], ["alt", { sourceInterval: [809, 862] }, ["app", { sourceInterval: [809, 816] }, "Pred_not", []], ["app", { sourceInterval: [831, 838] }, "Pred_lookahead", []], ["app", { sourceInterval: [859, 862] }, "Lex", []]]], Lex_lex: ["define", { sourceInterval: [876, 892] }, null, [], ["seq", { sourceInterval: [876, 884] }, ["terminal", { sourceInterval: [876, 879] }, "#"], ["app", { sourceInterval: [880, 884] }, "Base", []]]], Lex: ["define", { sourceInterval: [866, 903] }, null, [], ["alt", { sourceInterval: [876, 903] }, ["app", { sourceInterval: [876, 884] }, "Lex_lex", []], ["app", { sourceInterval: [899, 903] }, "Base", []]]], Base_application: ["define", { sourceInterval: [918, 979] }, null, [], ["seq", { sourceInterval: [918, 963] }, ["app", { sourceInterval: [918, 923] }, "ident", []], ["opt", { sourceInterval: [924, 931] }, ["app", { sourceInterval: [924, 930] }, "Params", []]], ["not", { sourceInterval: [932, 963] }, ["alt", { sourceInterval: [934, 962] }, ["seq", { sourceInterval: [934, 948] }, ["opt", { sourceInterval: [934, 944] }, ["app", { sourceInterval: [934, 943] }, "ruleDescr", []]], ["terminal", { sourceInterval: [945, 948] }, "="]], ["terminal", { sourceInterval: [951, 955] }, ":="], ["terminal", { sourceInterval: [958, 962] }, "+="]]]]], Base_range: ["define", { sourceInterval: [986, 1041] }, null, [], ["seq", { sourceInterval: [986, 1022] }, ["app", { sourceInterval: [986, 1001] }, "oneCharTerminal", []], ["terminal", { sourceInterval: [1002, 1006] }, ".."], ["app", { sourceInterval: [1007, 1022] }, "oneCharTerminal", []]]], Base_terminal: ["define", { sourceInterval: [1048, 1106] }, null, [], ["app", { sourceInterval: [1048, 1056] }, "terminal", []]], Base_paren: ["define", { sourceInterval: [1113, 1168] }, null, [], ["seq", { sourceInterval: [1113, 1124] }, ["terminal", { sourceInterval: [1113, 1116] }, "("], ["app", { sourceInterval: [1117, 1120] }, "Alt", []], ["terminal", { sourceInterval: [1121, 1124] }, ")"]]], Base: ["define", { sourceInterval: [907, 1168] }, null, [], ["alt", { sourceInterval: [918, 1168] }, ["app", { sourceInterval: [918, 963] }, "Base_application", []], ["app", { sourceInterval: [986, 1022] }, "Base_range", []], ["app", { sourceInterval: [1048, 1056] }, "Base_terminal", []], ["app", { sourceInterval: [1113, 1124] }, "Base_paren", []]]], ruleDescr: ["define", { sourceInterval: [1172, 1231] }, "a rule description", [], ["seq", { sourceInterval: [1210, 1231] }, ["terminal", { sourceInterval: [1210, 1213] }, "("], ["app", { sourceInterval: [1214, 1227] }, "ruleDescrText", []], ["terminal", { sourceInterval: [1228, 1231] }, ")"]]], ruleDescrText: ["define", { sourceInterval: [1235, 1266] }, null, [], ["star", { sourceInterval: [1255, 1266] }, ["seq", { sourceInterval: [1256, 1264] }, ["not", { sourceInterval: [1256, 1260] }, ["terminal", { sourceInterval: [1257, 1260] }, ")"]], ["app", { sourceInterval: [1261, 1264] }, "any", []]]]], caseName: ["define", { sourceInterval: [1270, 1338] }, null, [], ["seq", { sourceInterval: [1285, 1338] }, ["terminal", { sourceInterval: [1285, 1289] }, "--"], ["star", { sourceInterval: [1290, 1304] }, ["seq", { sourceInterval: [1291, 1302] }, ["not", { sourceInterval: [1291, 1296] }, ["terminal", { sourceInterval: [1292, 1296] }, `
`]], ["app", { sourceInterval: [1297, 1302] }, "space", []]]], ["app", { sourceInterval: [1305, 1309] }, "name", []], ["star", { sourceInterval: [1310, 1324] }, ["seq", { sourceInterval: [1311, 1322] }, ["not", { sourceInterval: [1311, 1316] }, ["terminal", { sourceInterval: [1312, 1316] }, `
`]], ["app", { sourceInterval: [1317, 1322] }, "space", []]]], ["alt", { sourceInterval: [1326, 1337] }, ["terminal", { sourceInterval: [1326, 1330] }, `
`], ["lookahead", { sourceInterval: [1333, 1337] }, ["terminal", { sourceInterval: [1334, 1337] }, "}"]]]]], name: ["define", { sourceInterval: [1342, 1382] }, "a name", [], ["seq", { sourceInterval: [1363, 1382] }, ["app", { sourceInterval: [1363, 1372] }, "nameFirst", []], ["star", { sourceInterval: [1373, 1382] }, ["app", { sourceInterval: [1373, 1381] }, "nameRest", []]]]], nameFirst: ["define", { sourceInterval: [1386, 1418] }, null, [], ["alt", { sourceInterval: [1402, 1418] }, ["terminal", { sourceInterval: [1402, 1405] }, "_"], ["app", { sourceInterval: [1412, 1418] }, "letter", []]]], nameRest: ["define", { sourceInterval: [1422, 1452] }, null, [], ["alt", { sourceInterval: [1437, 1452] }, ["terminal", { sourceInterval: [1437, 1440] }, "_"], ["app", { sourceInterval: [1447, 1452] }, "alnum", []]]], ident: ["define", { sourceInterval: [1456, 1489] }, "an identifier", [], ["app", { sourceInterval: [1485, 1489] }, "name", []]], terminal: ["define", { sourceInterval: [1493, 1531] }, null, [], ["seq", { sourceInterval: [1508, 1531] }, ["terminal", { sourceInterval: [1508, 1512] }, '"'], ["star", { sourceInterval: [1513, 1526] }, ["app", { sourceInterval: [1513, 1525] }, "terminalChar", []]], ["terminal", { sourceInterval: [1527, 1531] }, '"']]], oneCharTerminal: ["define", { sourceInterval: [1535, 1579] }, null, [], ["seq", { sourceInterval: [1557, 1579] }, ["terminal", { sourceInterval: [1557, 1561] }, '"'], ["app", { sourceInterval: [1562, 1574] }, "terminalChar", []], ["terminal", { sourceInterval: [1575, 1579] }, '"']]], terminalChar: ["define", { sourceInterval: [1583, 1660] }, null, [], ["alt", { sourceInterval: [1602, 1660] }, ["app", { sourceInterval: [1602, 1612] }, "escapeChar", []], ["seq", { sourceInterval: [1621, 1660] }, ["not", { sourceInterval: [1621, 1626] }, ["terminal", { sourceInterval: [1622, 1626] }, "\\"]], ["not", { sourceInterval: [1627, 1632] }, ["terminal", { sourceInterval: [1628, 1632] }, '"']], ["not", { sourceInterval: [1633, 1638] }, ["terminal", { sourceInterval: [1634, 1638] }, `
`]], ["range", { sourceInterval: [1639, 1660] }, "\0", "\u{10FFFF}"]]]], escapeChar_backslash: ["define", { sourceInterval: [1703, 1758] }, null, [], ["terminal", { sourceInterval: [1703, 1709] }, "\\\\"]], escapeChar_doubleQuote: ["define", { sourceInterval: [1765, 1822] }, null, [], ["terminal", { sourceInterval: [1765, 1771] }, '\\"']], escapeChar_singleQuote: ["define", { sourceInterval: [1829, 1886] }, null, [], ["terminal", { sourceInterval: [1829, 1835] }, "\\'"]], escapeChar_backspace: ["define", { sourceInterval: [1893, 1948] }, null, [], ["terminal", { sourceInterval: [1893, 1898] }, "\\b"]], escapeChar_lineFeed: ["define", { sourceInterval: [1955, 2009] }, null, [], ["terminal", { sourceInterval: [1955, 1960] }, "\\n"]], escapeChar_carriageReturn: ["define", { sourceInterval: [2016, 2076] }, null, [], ["terminal", { sourceInterval: [2016, 2021] }, "\\r"]], escapeChar_tab: ["define", { sourceInterval: [2083, 2132] }, null, [], ["terminal", { sourceInterval: [2083, 2088] }, "\\t"]], escapeChar_unicodeCodePoint: ["define", { sourceInterval: [2139, 2243] }, null, [], ["seq", { sourceInterval: [2139, 2221] }, ["terminal", { sourceInterval: [2139, 2145] }, "\\u{"], ["app", { sourceInterval: [2146, 2154] }, "hexDigit", []], ["opt", { sourceInterval: [2155, 2164] }, ["app", { sourceInterval: [2155, 2163] }, "hexDigit", []]], ["opt", { sourceInterval: [2165, 2174] }, ["app", { sourceInterval: [2165, 2173] }, "hexDigit", []]], ["opt", { sourceInterval: [2188, 2197] }, ["app", { sourceInterval: [2188, 2196] }, "hexDigit", []]], ["opt", { sourceInterval: [2198, 2207] }, ["app", { sourceInterval: [2198, 2206] }, "hexDigit", []]], ["opt", { sourceInterval: [2208, 2217] }, ["app", { sourceInterval: [2208, 2216] }, "hexDigit", []]], ["terminal", { sourceInterval: [2218, 2221] }, "}"]]], escapeChar_unicodeEscape: ["define", { sourceInterval: [2250, 2309] }, null, [], ["seq", { sourceInterval: [2250, 2291] }, ["terminal", { sourceInterval: [2250, 2255] }, "\\u"], ["app", { sourceInterval: [2256, 2264] }, "hexDigit", []], ["app", { sourceInterval: [2265, 2273] }, "hexDigit", []], ["app", { sourceInterval: [2274, 2282] }, "hexDigit", []], ["app", { sourceInterval: [2283, 2291] }, "hexDigit", []]]], escapeChar_hexEscape: ["define", { sourceInterval: [2316, 2371] }, null, [], ["seq", { sourceInterval: [2316, 2339] }, ["terminal", { sourceInterval: [2316, 2321] }, "\\x"], ["app", { sourceInterval: [2322, 2330] }, "hexDigit", []], ["app", { sourceInterval: [2331, 2339] }, "hexDigit", []]]], escapeChar: ["define", { sourceInterval: [1664, 2371] }, "an escape sequence", [], ["alt", { sourceInterval: [1703, 2371] }, ["app", { sourceInterval: [1703, 1709] }, "escapeChar_backslash", []], ["app", { sourceInterval: [1765, 1771] }, "escapeChar_doubleQuote", []], ["app", { sourceInterval: [1829, 1835] }, "escapeChar_singleQuote", []], ["app", { sourceInterval: [1893, 1898] }, "escapeChar_backspace", []], ["app", { sourceInterval: [1955, 1960] }, "escapeChar_lineFeed", []], ["app", { sourceInterval: [2016, 2021] }, "escapeChar_carriageReturn", []], ["app", { sourceInterval: [2083, 2088] }, "escapeChar_tab", []], ["app", { sourceInterval: [2139, 2221] }, "escapeChar_unicodeCodePoint", []], ["app", { sourceInterval: [2250, 2291] }, "escapeChar_unicodeEscape", []], ["app", { sourceInterval: [2316, 2339] }, "escapeChar_hexEscape", []]]], space: ["extend", { sourceInterval: [2375, 2394] }, null, [], ["app", { sourceInterval: [2387, 2394] }, "comment", []]], comment_singleLine: ["define", { sourceInterval: [2412, 2458] }, null, [], ["seq", { sourceInterval: [2412, 2443] }, ["terminal", { sourceInterval: [2412, 2416] }, "//"], ["star", { sourceInterval: [2417, 2429] }, ["seq", { sourceInterval: [2418, 2427] }, ["not", { sourceInterval: [2418, 2423] }, ["terminal", { sourceInterval: [2419, 2423] }, `
`]], ["app", { sourceInterval: [2424, 2427] }, "any", []]]], ["lookahead", { sourceInterval: [2430, 2443] }, ["alt", { sourceInterval: [2432, 2442] }, ["terminal", { sourceInterval: [2432, 2436] }, `
`], ["app", { sourceInterval: [2439, 2442] }, "end", []]]]]], comment_multiLine: ["define", { sourceInterval: [2465, 2501] }, null, [], ["seq", { sourceInterval: [2465, 2487] }, ["terminal", { sourceInterval: [2465, 2469] }, "/*"], ["star", { sourceInterval: [2470, 2482] }, ["seq", { sourceInterval: [2471, 2480] }, ["not", { sourceInterval: [2471, 2476] }, ["terminal", { sourceInterval: [2472, 2476] }, "*/"]], ["app", { sourceInterval: [2477, 2480] }, "any", []]]], ["terminal", { sourceInterval: [2483, 2487] }, "*/"]]], comment: ["define", { sourceInterval: [2398, 2501] }, null, [], ["alt", { sourceInterval: [2412, 2501] }, ["app", { sourceInterval: [2412, 2443] }, "comment_singleLine", []], ["app", { sourceInterval: [2465, 2487] }, "comment_multiLine", []]]], tokens: ["define", { sourceInterval: [2505, 2520] }, null, [], ["star", { sourceInterval: [2514, 2520] }, ["app", { sourceInterval: [2514, 2519] }, "token", []]]], token: ["define", { sourceInterval: [2524, 2600] }, null, [], ["alt", { sourceInterval: [2532, 2600] }, ["app", { sourceInterval: [2532, 2540] }, "caseName", []], ["app", { sourceInterval: [2543, 2550] }, "comment", []], ["app", { sourceInterval: [2553, 2558] }, "ident", []], ["app", { sourceInterval: [2561, 2569] }, "operator", []], ["app", { sourceInterval: [2572, 2583] }, "punctuation", []], ["app", { sourceInterval: [2586, 2594] }, "terminal", []], ["app", { sourceInterval: [2597, 2600] }, "any", []]]], operator: ["define", { sourceInterval: [2604, 2669] }, null, [], ["alt", { sourceInterval: [2615, 2669] }, ["terminal", { sourceInterval: [2615, 2619] }, "<:"], ["terminal", { sourceInterval: [2622, 2625] }, "="], ["terminal", { sourceInterval: [2628, 2632] }, ":="], ["terminal", { sourceInterval: [2635, 2639] }, "+="], ["terminal", { sourceInterval: [2642, 2645] }, "*"], ["terminal", { sourceInterval: [2648, 2651] }, "+"], ["terminal", { sourceInterval: [2654, 2657] }, "?"], ["terminal", { sourceInterval: [2660, 2663] }, "~"], ["terminal", { sourceInterval: [2666, 2669] }, "&"]]], punctuation: ["define", { sourceInterval: [2673, 2709] }, null, [], ["alt", { sourceInterval: [2687, 2709] }, ["terminal", { sourceInterval: [2687, 2690] }, "<"], ["terminal", { sourceInterval: [2693, 2696] }, ">"], ["terminal", { sourceInterval: [2699, 2702] }, ","], ["terminal", { sourceInterval: [2705, 2709] }, "--"]]] }]);
var Be = Object.create(h3.prototype);
function dt(r8, e) {
  for (let t in r8) if (t === e) return true;
  return false;
}
function je(r8, e, t) {
  let n2 = new V(), s2, i2, o, l2 = false;
  return (t || ue).createSemantics().addOperation("visit", { Grammars(a2) {
    return a2.children.map((p2) => p2.visit());
  }, Grammar(a2, p2, u2, d3, N2) {
    let E = a2.visit();
    s2 = n2.newGrammar(E), p2.child(0) && p2.child(0).visit(), d3.children.map((J) => J.visit());
    let C3 = s2.build();
    if (C3.source = this.source.trimmed(), dt(e, E)) throw ze(C3, e);
    return e[E] = C3, C3;
  }, SuperGrammar(a2, p2) {
    let u2 = p2.visit();
    if (u2 === "null") s2.withSuperGrammar(null);
    else {
      if (!e || !dt(e, u2)) throw He(u2, e, p2.source);
      s2.withSuperGrammar(e[u2]);
    }
  }, Rule_define(a2, p2, u2, d3, N2) {
    i2 = a2.visit(), o = p2.children.map((te) => te.visit())[0] || [], !s2.defaultStartRule && s2.ensureSuperGrammar() !== P.ProtoBuiltInRules && s2.withDefaultStartRule(i2);
    let E = N2.visit(), C3 = u2.children.map((te) => te.visit())[0], J = this.source.trimmed();
    return s2.define(i2, o, E, C3, J);
  }, Rule_override(a2, p2, u2, d3) {
    i2 = a2.visit(), o = p2.children.map((C3) => C3.visit())[0] || [];
    let N2 = this.source.trimmed();
    s2.ensureSuperGrammarRuleForOverriding(i2, N2), l2 = true;
    let E = d3.visit();
    return l2 = false, s2.override(i2, o, E, null, N2);
  }, Rule_extend(a2, p2, u2, d3) {
    i2 = a2.visit(), o = p2.children.map((C3) => C3.visit())[0] || [];
    let N2 = d3.visit(), E = this.source.trimmed();
    return s2.extend(i2, o, N2, null, E);
  }, RuleBody(a2, p2) {
    return n2.alt(...p2.visit()).withSource(this.source);
  }, OverrideRuleBody(a2, p2) {
    let u2 = p2.visit(), d3 = u2.indexOf(Be);
    if (d3 >= 0) {
      let N2 = u2.slice(0, d3), E = u2.slice(d3 + 1);
      return E.forEach((C3) => {
        if (C3 === Be) throw et(C3);
      }), new q(s2.superGrammar, i2, N2, E).withSource(this.source);
    } else return n2.alt(...u2).withSource(this.source);
  }, Formals(a2, p2, u2) {
    return p2.visit();
  }, Params(a2, p2, u2) {
    return p2.visit();
  }, Alt(a2) {
    return n2.alt(...a2.visit()).withSource(this.source);
  }, TopLevelTerm_inline(a2, p2) {
    let u2 = i2 + "_" + p2.visit(), d3 = a2.visit(), N2 = this.source.trimmed(), E = !(s2.superGrammar && s2.superGrammar.rules[u2]);
    l2 && !E ? s2.override(u2, o, d3, null, N2) : s2.define(u2, o, d3, null, N2);
    let C3 = o.map((J) => n2.app(J));
    return n2.app(u2, C3).withSource(d3.source);
  }, OverrideTopLevelTerm_superSplice(a2) {
    return Be;
  }, Seq(a2) {
    return n2.seq(...a2.children.map((p2) => p2.visit())).withSource(this.source);
  }, Iter_star(a2, p2) {
    return n2.star(a2.visit()).withSource(this.source);
  }, Iter_plus(a2, p2) {
    return n2.plus(a2.visit()).withSource(this.source);
  }, Iter_opt(a2, p2) {
    return n2.opt(a2.visit()).withSource(this.source);
  }, Pred_not(a2, p2) {
    return n2.not(p2.visit()).withSource(this.source);
  }, Pred_lookahead(a2, p2) {
    return n2.lookahead(p2.visit()).withSource(this.source);
  }, Lex_lex(a2, p2) {
    return n2.lex(p2.visit()).withSource(this.source);
  }, Base_application(a2, p2) {
    let u2 = p2.children.map((d3) => d3.visit())[0] || [];
    return n2.app(a2.visit(), u2).withSource(this.source);
  }, Base_range(a2, p2, u2) {
    return n2.range(a2.visit(), u2.visit()).withSource(this.source);
  }, Base_terminal(a2) {
    return n2.terminal(a2.visit()).withSource(this.source);
  }, Base_paren(a2, p2, u2) {
    return p2.visit();
  }, ruleDescr(a2, p2, u2) {
    return p2.visit();
  }, ruleDescrText(a2) {
    return this.sourceString.trim();
  }, caseName(a2, p2, u2, d3, N2) {
    return u2.visit();
  }, name(a2, p2) {
    return this.sourceString;
  }, nameFirst(a2) {
  }, nameRest(a2) {
  }, terminal(a2, p2, u2) {
    return p2.children.map((d3) => d3.visit()).join("");
  }, oneCharTerminal(a2, p2, u2) {
    return p2.visit();
  }, escapeChar(a2) {
    try {
      return m(this.sourceString);
    } catch (p2) {
      throw p2 instanceof RangeError && p2.message.startsWith("Invalid code point ") ? tt(a2) : p2;
    }
  }, NonemptyListOf(a2, p2, u2) {
    return [a2.visit()].concat(u2.children.map((d3) => d3.visit()));
  }, EmptyListOf() {
    return [];
  }, _terminal() {
    return this.sourceString;
  } })(r8).visit();
}
var xt = Z(["grammar", { source: `OperationsAndAttributes {

  AttributeSignature =
    name

  OperationSignature =
    name Formals?

  Formals
    = "(" ListOf<name, ","> ")"

  name  (a name)
    = nameFirst nameRest*

  nameFirst
    = "_"
    | letter

  nameRest
    = "_"
    | alnum

}` }, "OperationsAndAttributes", null, "AttributeSignature", { AttributeSignature: ["define", { sourceInterval: [29, 58] }, null, [], ["app", { sourceInterval: [54, 58] }, "name", []]], OperationSignature: ["define", { sourceInterval: [62, 100] }, null, [], ["seq", { sourceInterval: [87, 100] }, ["app", { sourceInterval: [87, 91] }, "name", []], ["opt", { sourceInterval: [92, 100] }, ["app", { sourceInterval: [92, 99] }, "Formals", []]]]], Formals: ["define", { sourceInterval: [104, 143] }, null, [], ["seq", { sourceInterval: [118, 143] }, ["terminal", { sourceInterval: [118, 121] }, "("], ["app", { sourceInterval: [122, 139] }, "ListOf", [["app", { sourceInterval: [129, 133] }, "name", []], ["terminal", { sourceInterval: [135, 138] }, ","]]], ["terminal", { sourceInterval: [140, 143] }, ")"]]], name: ["define", { sourceInterval: [147, 187] }, "a name", [], ["seq", { sourceInterval: [168, 187] }, ["app", { sourceInterval: [168, 177] }, "nameFirst", []], ["star", { sourceInterval: [178, 187] }, ["app", { sourceInterval: [178, 186] }, "nameRest", []]]]], nameFirst: ["define", { sourceInterval: [191, 223] }, null, [], ["alt", { sourceInterval: [207, 223] }, ["terminal", { sourceInterval: [207, 210] }, "_"], ["app", { sourceInterval: [217, 223] }, "letter", []]]], nameRest: ["define", { sourceInterval: [227, 257] }, null, [], ["alt", { sourceInterval: [242, 257] }, ["terminal", { sourceInterval: [242, 245] }, "_"], ["app", { sourceInterval: [252, 257] }, "alnum", []]]] }]);
pr(P.BuiltInRules);
lr(xt);
function pr(r8) {
  let e = { empty() {
    return this.iteration();
  }, nonEmpty(t, n2, s2) {
    return this.iteration([t].concat(s2.children));
  }, self(...t) {
    return this;
  } };
  k.BuiltInSemantics = k.createSemantics(r8, null).addOperation("asIteration", { emptyListOf: e.empty, nonemptyListOf: e.nonEmpty, EmptyListOf: e.empty, NonemptyListOf: e.nonEmpty, _iter: e.self });
}
function lr(r8) {
  k.prototypeGrammarSemantics = r8.createSemantics().addOperation("parse", { AttributeSignature(e) {
    return { name: e.parse(), formals: [] };
  }, OperationSignature(e, t) {
    return { name: e.parse(), formals: t.children.map((n2) => n2.parse())[0] || [] };
  }, Formals(e, t, n2) {
    return t.asIteration().children.map((s2) => s2.parse());
  }, name(e, t) {
    return this.sourceString;
  } }), k.prototypeGrammar = r8;
}
function It(r8) {
  let e = 0, t = [0], n2 = () => t[t.length - 1], s2 = {}, i2 = /( *).*(?:$|\r?\n|\r)/g, o;
  for (; (o = i2.exec(r8)) != null; ) {
    let [l2, c2] = o;
    if (l2.length === 0) break;
    let m2 = c2.length, a2 = n2(), p2 = e + m2;
    if (m2 > a2) t.push(m2), s2[p2] = 1;
    else if (m2 < a2) {
      let u2 = t.length;
      for (; n2() !== m2; ) t.pop();
      s2[p2] = -1 * (u2 - t.length);
    }
    e += l2.length;
  }
  return t.length > 1 && (s2[e] = 1 - t.length), s2;
}
var vt = "an indented block";
var St = "a dedent";
var yt = 1114112;
var Ge = class extends z {
  constructor(e) {
    super(e.input), this.state = e;
  }
  _indentationAt(e) {
    return this.state.userData[e] || 0;
  }
  atEnd() {
    return super.atEnd() && this._indentationAt(this.pos) === 0;
  }
  next() {
    if (this._indentationAt(this.pos) !== 0) {
      this.examinedLength = Math.max(this.examinedLength, this.pos);
      return;
    }
    return super.next();
  }
  nextCharCode() {
    return this._indentationAt(this.pos) !== 0 ? (this.examinedLength = Math.max(this.examinedLength, this.pos), yt) : super.nextCharCode();
  }
  nextCodePoint() {
    return this._indentationAt(this.pos) !== 0 ? (this.examinedLength = Math.max(this.examinedLength, this.pos), yt) : super.nextCodePoint();
  }
};
var Le = class extends h3 {
  constructor(e = true) {
    super(), this.isIndent = e;
  }
  allowsSkippingPrecedingSpace() {
    return true;
  }
  eval(e) {
    let { inputStream: t } = e, n2 = e.userData;
    e.doNotMemoize = true;
    let s2 = t.pos, i2 = this.isIndent ? 1 : -1;
    return (n2[s2] || 0) * i2 > 0 ? (e.userData = Object.create(n2), e.userData[s2] -= i2, e.pushBinding(new j(0), s2), true) : (e.processFailure(s2, this), false);
  }
  getArity() {
    return 1;
  }
  _assertAllApplicationsAreValid(e, t) {
  }
  _isNullable(e, t) {
    return false;
  }
  assertChoicesHaveUniformArity(e) {
  }
  assertIteratedExprsAreNotNullable(e) {
  }
  introduceParams(e) {
    return this;
  }
  substituteParams(e) {
    return this;
  }
  toString() {
    return this.isIndent ? "indent" : "dedent";
  }
  toDisplayString() {
    return this.toString();
  }
  toFailure(e) {
    let t = this.isIndent ? vt : St;
    return new T(this, t, "description");
  }
};
var cr = new f2("indent");
var ur = new f2("dedent");
var hr = new q(ce, "any", [cr, ur], []);
var At = new V().newGrammar("IndentationSensitive").withSuperGrammar(ce).define("indent", [], new Le(true), vt, void 0, true).define("dedent", [], new Le(false), St, void 0, true).extend("any", [], hr, "any character", void 0).build();
Object.assign(At, { _matchStateInitializer(r8) {
  r8.userData = It(r8.input), r8.inputStream = new Ge(r8);
}, supportsIncrementalParsing: false });
var mr = "17.2.1";
P.initApplicationParser(ue, je);
var fr = (r8) => !!r8.constructor && typeof r8.constructor.isBuffer == "function" && r8.constructor.isBuffer(r8);
function dr(r8, e) {
  let t = ue.match(r8, "Grammars");
  if (t.failed()) throw Ke(t);
  return je(t, e);
}
function Is(r8, e) {
  let t = gr(r8, e), n2 = Object.keys(t);
  if (n2.length === 0) throw new Error("Missing grammar definition");
  if (n2.length > 1) {
    let i2 = t[n2[1]].source;
    throw new Error(b(i2.sourceString, i2.startIdx) + "Found more than one grammar definition -- use ohm.grammars() instead.");
  }
  return t[n2[0]];
}
function gr(r8, e) {
  let t = Object.create(e || {});
  if (typeof r8 != "string") if (fr(r8)) r8 = r8.toString();
  else throw new TypeError("Expected string as first argument, got " + S(r8));
  return dr(r8, t), t;
}
export {
  At as ExperimentalIndentationSensitive,
  je as _buildGrammar,
  Is as grammar,
  gr as grammars,
  Z as makeRecipe,
  ue as ohmGrammar,
  $ as pexprs,
  mr as version
};
