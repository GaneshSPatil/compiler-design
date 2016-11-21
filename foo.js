var evaluateTree = require('./lib/expressionEvaluator.js');
var representTree = require('./lib/expressionRepresenter.js');
var treesWalker = require('./treeWalker.js');

var Parser = require("jison").Parser;
var fs = require('fs');

var grammar = fs.readFileSync('./exprEvaluator.jison', 'utf8');

var parser = new Parser(grammar);
var trees = parser.parse(process.argv[2]);

console.log(treesWalker.walk(trees, evaluateTree));
