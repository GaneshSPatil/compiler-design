var symbolToFunctionMapper = require('../symbolToFunctionMapper.js');
var NumberNode = require('./NumericNode.js');
var VariableNode = require('./VariableNode.js');

var getNumeric = function(node, variables){
  if(node.type == 'Number'){
    return node;
  }
  return getNumeric(node.evaluate(variables));
}

var PowerOfNode = function(operator, args){
  var reducer = symbolToFunctionMapper[operator];

  this.value = operator;

  this.args = (args || []).map(function(arg){
    if(arg.type){
      return arg;
    }
    return new VariableNode(arg);
  });

  this.type = 'PowerOf';

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
  };

  this.toJS = function(){
    var args = this.args.map(function(arg){
      return arg.toJS();
    });
    return 'Math.pow('+args[0]+', '+ args[1]+')';
  };
};

module.exports = PowerOfNode;
