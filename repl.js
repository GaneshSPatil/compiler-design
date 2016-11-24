var treesWalker = require('./treeWalker.js');
var Parser = require("jison").Parser;
var fs = require('fs');
var grammar = fs.readFileSync('./exprEvaluator.jison', 'utf8');

//---------------------

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var variables = {};
variables.list = {};
variables.parent = variables;

var onAnswer = function(ans){
  try{
    var trees = new Parser(grammar).parse(ans);
    var result = treesWalker.walk(trees, 'evaluate', variables);
    console.log(result[result.length - 1].evaluate());
  }catch(e){
    (trees != undefined) && trees.pop();
    console.error(e.stack || e.message);
  }
  askQue();
}

var askQue = function(){
  rl.question('> ', onAnswer);
}

askQue();
