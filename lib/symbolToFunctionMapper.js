var NumberNode = require('./Nodes/NumericNode.js');

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
  }
};
