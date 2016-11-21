var operators = {
  '*' : 'times',
  '+' : 'plus',
  '-' : 'minus',
  '/' : 'divided by',
  '=' : 'equalTo'
}

var toString = require('./toString.js').toString;

var treeToString = function(tree){
  var allArgs = [operators[tree.op]];
  tree.args.forEach(function(arg){
    if(arg instanceof Object){
      allArgs.push(treeToString(arg));
    }else{
      allArgs.push(arg);
    }
  });
  return allArgs;
};

var evaluateExpr = function(trees){
  var result = [];
  var variables = {};
  trees.forEach(function(tree){
    result.push(treeToString(tree));
  });
  return result;
};

module.exports = evaluateExpr;
