var treesWalker = require('./treeWalker.js');

var Parser = require("jison").Parser;
var fs = require('fs');

var grammar = fs.readFileSync('./exprEvaluator.jison', 'utf8');

var parser = new Parser(grammar);
var trees = parser.parse(process.argv[2]);

// var result = treesWalker.walk(trees, 'represent');
// console.log(result);

// var result = treesWalker.walk(trees, 'evaluate');
// console.log(result[result.length - 1].evaluate());

var result = treesWalker.walk(trees, 'toJS');
console.log(result.join('\n'));
