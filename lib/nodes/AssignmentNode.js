var NumberNode = require('./NumericNode.js');
var OperatorNode = require('./OperatorNode.js');
var VariableNode = require('./VariableNode.js');

var getNumeric = function(node, variables){
  if(node instanceof NumberNode){
    return node;
  }
  return getNumeric(node.evaluate(variables));
};

module.exports = function(operator, args){
  this.value = operator;
  this.args = args.map(function(arg){
    if(arg instanceof NumberNode || arg instanceof OperatorNode){
      return arg;
    }
    return new VariableNode(arg);
  });
  this.type = 'Assignment';
  this.evaluate = function(variables){
    var value = getNumeric(this.args[1], variables);
    variables[this.args[0].value] = value;
    return value;
  };
  this.represent = function(){
    return [this.value].concat(this.args);
  }
};
