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

module.exports = treeToString;
