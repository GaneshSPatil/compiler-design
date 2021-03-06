var NumberNode = require('./nodes/NumericNode.js');
var BooleanNode = require('./nodes/BooleanNode.js');

var factorial = function(num){
  if(num == 1){
    return num;
  };
  return num* factorial(num-1);
};

module.exports = {
  '+' : function(num1, num2, variables){
    return new NumberNode(num1.evaluate(variables) + num2.evaluate(variables));
  },
  '-' : function(num1, num2, variables){
    return new NumberNode(num1.evaluate(variables) - num2.evaluate(variables));
  },
  '*' : function(num1, num2, variables){
    return new NumberNode(num1.evaluate(variables) * num2.evaluate(variables));
  },
  '/' : function(num1, num2, variables){
    return new NumberNode(num1.evaluate(variables) / num2.evaluate(variables));
  },
  '%' : function(num1, num2, variables){
    return new NumberNode(num1.evaluate(variables) % num2.evaluate(variables));
  },
  '^' : function(num1, num2, variables){
    return new NumberNode(Math.pow(num1.evaluate(variables), num2.evaluate(variables)));
  },
  '>' : function(num1, num2, variables){
    return new BooleanNode(num1.evaluate(variables) > num2.evaluate(variables));
  },
  '<' : function(num1, num2, variables){
    return new BooleanNode(num1.evaluate(variables) < num2.evaluate(variables));
  }
};
