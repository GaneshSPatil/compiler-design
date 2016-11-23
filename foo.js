var treesWalker = require('./treeWalker.js');
var jsTreesWalker = require('./JSTreeWalker.js');

var Parser = require("jison").Parser;
var fs = require('fs');

var grammar = fs.readFileSync('./exprEvaluator.jison', 'utf8');

var parser = new Parser(grammar);
var trees = parser.parse(process.argv[2]);

var result = treesWalker.walk(trees, 'evaluate');
console.log('------- EVALUATE TREE ----------');
console.log(result[result.length - 1].evaluate());
console.log('--------------------------------');

var result = jsTreesWalker.walk(trees, 'toJS');
console.log('------- JAVASCRIPT CODE --------');
console.log(result.join('\n'));
console.log('--------------------------------');
console.log('------- JS CODE RESULT ---------');
eval(result.join('\n'));
console.log('--------------------------------');
