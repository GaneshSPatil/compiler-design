var symbolToFunctionMapper = require('../symbolToFunctionMapper.js');
var NumberNode = require('./NumericNode.js');
var VariableNode = require('./VariableNode.js');

var getNumeric = function(node, variables){
  if(node.type == 'Number'){
    return node;
  }
  return getNumeric(node.evaluate(variables));
}

var OperatorNode = function(operator, args){
  var reducer = symbolToFunctionMapper[operator];

  this.value = operator;

  this.args = (args || []).map(function(arg){
    if(arg.type == 'Number' || arg.type == 'Operation'
    || arg.type == 'Factorial' || arg.type == 'Variable'){
      return arg;
    }
    return new VariableNode(arg);
  });

  this.type = 'Operation';

  this.evaluate = function(variables){
    var result = this.args.reduce(function(op1, op2){
      return reducer(getNumeric(op1, variables), getNumeric(op2, variables), variables);
    });
    return result;
  };

  this.represent = function(){
    var argsInString = this.args.map(function(arg){
      return arg.represent();
    });

    return [this.value].concat(argsInString);
  }
};

module.exports = OperatorNode;
