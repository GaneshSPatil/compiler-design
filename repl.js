var treesWalker = require('./treeWalker.js');
var Parser = require("jison").Parser;
var fs = require('fs');
var grammar = fs.readFileSync('./exprEvaluator.jison', 'utf8');
var parser = new Parser(grammar);

//---------------------

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var onAnswer = function(ans){
  var trees = undefined;
  try{
    trees = parser.parse(ans);
    result = treesWalker.walk(trees, 'evaluate');
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

askQue(rl);
