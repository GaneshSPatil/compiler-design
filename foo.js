var evaluateExpr = require('./lib/evaluate.js');
var buildTree = require('./lib/treeToString.js');

var Parser = require("jison").Parser;
var fs = require('fs');

var grammar = fs.readFileSync('./exprEvaluator.jison', 'utf8');

var parser = new Parser(grammar);
var trees = parser.parse('1+2;');

// console.log(evaluateExpr(trees));
console.log(buildTree(trees));
