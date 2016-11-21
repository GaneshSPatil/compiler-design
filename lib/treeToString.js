var operators = {
  '*' : 'times',
  '+' : 'plus',
  '-' : 'minus',
  '/' : 'divided by',
  '=' : 'equalTo'
}
var toString = require('./toString.js').toString;

var treeToString = function(tree){
  if(typeof tree.left == 'object'){
    tree.left = treeToString(tree.left);
    return treeToString(tree);
  };
  if(typeof tree.right == 'object'){
    tree.right = treeToString(tree.right);
    return treeToString(tree);
  };
  var left = tree.left;
  var right = tree.right;
  if(typeof left == 'number'){
    left = toString(left).trim();
  }
  if(typeof right == 'number'){
    right = toString(right).trim();
  }

  var exp = '(' + left+ ' ' + operators[tree.op] + ' ' + right + ')';
  return exp;
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
