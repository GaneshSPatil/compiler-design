var AssignmentNode = require('../../lib/nodes/AssignmentNode.js');
var NumberNode = require('../../lib/nodes/NumericNode.js');
var VariableNode = require('../../lib/nodes/VariableNode.js');
var ArithmeticOperatorNode = require('../../lib/nodes/ArithmeticOperatorNode.js');
var BooleanNode = require('../../lib/nodes/BooleanNode.js');

var expect = require('chai').expect;

describe('AssignmentNode', function(){
  it('should have assignment operator as value', function(){
    var expr = new AssignmentNode('=', ['a', new NumberNode(2)]);
    expect(expr.value).to.equal('=');
  });

  it('should have Assignment as type', function(){
    var expr = new AssignmentNode('=', ['a', new NumberNode(2)]);
    expect(expr.type).to.equal('Assignment');
  });

  it('should convert variable into VariableNode', function(){
    var expr = new AssignmentNode('=', ['a', new NumberNode(2)]);
    expect(expr.args[0] instanceof VariableNode).to.equal(true);
  });

  it('should evaluate the assignment and return the result', function(){
    var variables = {list:{}};
    variables.parent = variables;
    var value = new NumberNode(2);
    var expr = new AssignmentNode('=', ['a', value]);
    expect(expr.evaluate(variables)).to.eql(value);
  });

  it('should evaluate the assignment of boolean and return the result', function(){
    var variables = {list:{}};
    variables.parent = variables;
    var value = new BooleanNode('true');
    var expr = new AssignmentNode('=', ['a', value]);
    expect(expr.evaluate(variables)).to.eql(value);
  });

  it('should populate the variables collection with newly assigned variable', function(){
    var variables = {list:{}};
    variables.parent = variables;
    var value = new NumberNode(2);
    expect(variables.list.a).to.equal(undefined);
    var expr = new AssignmentNode('=', ['a', value]);
    expr.evaluate(variables);
    expect(variables.list.a).to.equal(value);
  });

  it('should evaluate assignment operations with values as complex expressions', function(){
    var variables = {list:{}};
    variables.parent = variables;
    var addExpr = new ArithmeticOperatorNode('+', [new NumberNode(2), new NumberNode(3)]);
    var expr = new AssignmentNode('=', ['a', addExpr]);
    expect(expr.evaluate(variables).evaluate()).to.eql(5);
  });

  it('should represent simple assignment expressions', function(){
    var value = new NumberNode(2);
    var expr = new AssignmentNode('=', ['a', value]);
    expect(expr.represent()).to.eql(['=', 'a', 'two']);
  });

  it('should represent complex assignment expressions', function(){
    var addExpr = new ArithmeticOperatorNode('+', [new NumberNode(2), new NumberNode(3)]);
    var expr = new AssignmentNode('=', ['a', addExpr]);
    expect(expr.represent()).to.eql(['=', 'a', ['+', 'two', 'three']]);
  });

  it('should have javascript code representation', function(){
    var value = new NumberNode(2);
    var expr = new AssignmentNode('=', ['a', value]);
    expect(expr.toJS()).to.eql('var a = 2;');
  });

  it('should have javascript code representation of variable assignment to another variable', function(){
    var value = new VariableNode('b');
    var expr = new AssignmentNode('=', ['a', 'b']);
    expect(expr.toJS()).to.eql('var a = b;');
  });
});
