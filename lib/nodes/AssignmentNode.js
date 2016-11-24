var NumberNode = require('./NumericNode.js');
var ArithmeticOperatorNode = require('./ArithmeticOperatorNode.js');
var VariableNode = require('./VariableNode.js');

var checkAndAssignInParentScope = function(variable, value, variables){
  if(variables.list[variable]){
    variables.list[variable] = value;
    return true;
  }
  if(variables == variables.parent){
    return false;
  }
  return checkAndAssignInParentScope(variable, value, variables.parent);
}

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
    var isAssigned = checkAndAssignInParentScope(this.args[0].value, value, variables);
    isAssigned || (variables.list[this.args[0].value] = value);
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
