var getValue = function(variable, variables){
  if(!Number.isNaN(+variable)){
    return +variable;
  }
  if(!Number.isNaN(+variables[variable])){
    return +variables[variable];
  }
  if(variables[variable] === undefined){
    throw new Error(variable + ' is not defined');
  }
  return getValue(variables[variable], variables);
};

var operations = {
  '+' : function(num1, num2, variables){
    return getValue(num1, variables) + getValue(num2, variables);
  },
  '-' : function(num1, num2, variables){
    return getValue(num1, variables) - getValue(num2, variables);
  },
  '*' : function(num1, num2, variables){
    return getValue(num1, variables) * getValue(num2, variables);
  },
  '/' : function(num1, num2, variables){
    return getValue(num1, variables) / getValue(num2, variables);
  },
  '=' : function(variable, value, variables){
    variables[variable] = value;
  }
};

var evaluate = function(tree, variables){
  var current = tree;
  if(typeof tree.left == 'object'){
    tree.left = evaluate(tree.left, variables);
    return evaluate(tree, variables);
  };
  if(typeof tree.right == 'object'){
    tree.right = evaluate(tree.right, variables);
    return evaluate(tree, variables);
  };
  return operations[tree.op](tree.left, tree.right, variables);
};


var evaluateExpr = function(trees){
  var result;
  var variables = {};
  trees.forEach(function(tree){
    result = evaluate(tree, variables);
  });
  return result;
};

module.exports = evaluateExpr;
