var NumberNode = require('./NumericNode.js');
var OperatorNode = require('./OperatorNode.js');
var VariableNode = require('./VariableNode.js');

var getValue = function(node, variables){
  if(node.type == 'Number' || node.type == 'Boolean'){
    return node;
  }
  return getValue(node.evaluate(variables), variables);
};

module.exports = function(operator, args){
  this.value = operator;

  this.args = args.map(function(arg){
    if(arg.type){
      return arg;
    }
    return new VariableNode(arg);
  });

  this.type = 'Assignment';

  this.evaluate = function(variables){
    var value = getValue(this.args[1], variables);
    variables.list[this.args[0].value] = value;
    return value;
  };

  this.represent = function(){
    var argsInString = this.args.map(function(arg){
      return arg.represent();
    });
    return [this.value].concat(argsInString);
  };

  this.toJS = function(){
    return 'var ' + this.args[0].toJS() + ' = ' + this.args[1].toJS() + ';';
  }
};
