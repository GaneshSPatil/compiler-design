var toString = require('../toString.js');
var NumberNode = require('./NumericNode.js');

var getNumeric = function(node, variables){
  if(node.type == 'Number'){
    return node;
  }
  return getNumeric(node.evaluate(variables));
};

var factorial = function(num){
  if(num == 1){
    return num;
  }
  return num * factorial(num - 1);
};

module.exports = function(operator, value){
  this.value = operator;
  this.args = [value];
  this.type = 'Factorial';
  this.evaluate = function(variables){
    var fact = factorial(getNumeric(this.args[0], variables).evaluate());
    return new NumberNode(fact);
  };
  this.represent = function(){
    return [value.represent(), this.value];
  };
}
