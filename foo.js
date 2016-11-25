var treesWalker = require('./treeWalker.js');
var jsTreesWalker = require('./JSTreeWalker.js');

var Parser = require("jison").Parser;
var fs = require('fs');

var grammar = fs.readFileSync('./exprEvaluator.jison', 'utf8');

var parser = new Parser(grammar);
var trees = parser.parse(fs.readFileSync(process.argv[2], 'utf8'));


var variables = {};
variables.list = {};
variables.allFunctions = {};
variables.parent = variables;

var result = treesWalker.walk(trees, 'evaluate', variables);

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
