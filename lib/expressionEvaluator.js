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
  '+' : function(args, variables){
    return args.reduce(function(num1, num2){
      return getValue(num1, variables) + getValue(num2, variables);
    });
  },
  '-' : function(args, variables){
    return args.reduce(function(num1, num2){
      return getValue(num1, variables) - getValue(num2, variables);
    });
  },
  '*' : function(args, variables){
    return args.reduce(function(num1, num2){
      return getValue(num1, variables) * getValue(num2, variables);
    });
  },
  '/' : function(args, variables){
    return args.reduce(function(num1, num2){
      return getValue(num1, variables) / getValue(num2, variables);
    });
  },
  '=' : function(args, variables){
    variables[args[0]] = args[1];
  }
};

var evaluate = function(tree, variables){
  var allArgs = [];
  tree.args.forEach(function(arg){
    if(arg instanceof Object){
      allArgs.push(evaluate(arg));
    }else{
      allArgs.push(arg);
    }
  });

  return operations[tree.op](allArgs, variables);
};

module.exports = evaluate;