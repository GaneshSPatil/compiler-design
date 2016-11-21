var AssignmentNode = require('../../lib/nodes/AssignmentNode.js');
var NumberNode = require('../../lib/nodes/NumericNode.js');
var VariableNode = require('../../lib/nodes/VariableNode.js');
var OperatorNode = require('../../lib/nodes/OperatorNode.js');

var expect = require('chai').expect;

describe('AssignmentNode', function(){
  it('should have assignment operator as value', function(){
    var expr = new AssignmentNode('=', ['a', new NumberNode(2)]);
    expect(expr.value).to.equal('=');
  });

  it('should convert variable into VariableNode', function(){
    var expr = new AssignmentNode('=', ['a', new NumberNode(2)]);
    expect(expr.args[0] instanceof VariableNode).to.equal(true);
  });

  it('should evaluate the assignment and return the result', function(){
    var value = new NumberNode(2);
    var expr = new AssignmentNode('=', ['a', value]);
    expect(expr.evaluate({})).to.eql(value);
  });

  it('should populate the variables collection with newly assigned variable', function(){
    var variables = {};
    var value = new NumberNode(2);
    expect(variables.a).to.equal(undefined);
    var expr = new AssignmentNode('=', ['a', value]);
    expr.evaluate(variables);
    expect(variables.a).to.equal(value);
  });

  it('should evaluate assignment operations with values as complex expressions', function(){
    var addExpr = new OperatorNode('+', [new NumberNode(2), new NumberNode(3)]);
    var expr = new AssignmentNode('=', ['a', addExpr]);
    expect(expr.evaluate({}).evaluate()).to.eql(5);
  });

  it('should represent simple assignment expressions', function(){
    var value = new NumberNode(2);
    var expr = new AssignmentNode('=', ['a', value]);
    expect(expr.represent()).to.eql(['=', 'a', 'two']);
  });

  it('should represent complex assignment expressions', function(){
    var addExpr = new OperatorNode('+', [new NumberNode(2), new NumberNode(3)]);
    var expr = new AssignmentNode('=', ['a', addExpr]);
    expect(expr.represent()).to.eql(['=', 'a', ['+', 'two', 'three']]);
  });
});
