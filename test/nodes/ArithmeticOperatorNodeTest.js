var ArithmeticOperatorNode = require('../../lib/nodes/ArithmeticOperatorNode.js');
var NumberNode = require('../../lib/nodes/NumericNode.js');
var VariableNode = require('../../lib/nodes/VariableNode.js');
var FactorialNode = require('../../lib/nodes/FactorialNode.js');
var AssignmentNode = require('../../lib/nodes/AssignmentNode.js');

var expect = require('chai').expect;

describe('ArithmeticOperatorNode', function(){
  it('should have plus operator as value', function(){
    var expr = new ArithmeticOperatorNode('+', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.value).to.equal('+');
  });

  it('should have minus operator as value', function(){
    var expr = new ArithmeticOperatorNode('-', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.value).to.equal('-');
  });

  it('should have multiplication operator as value', function(){
    var expr = new ArithmeticOperatorNode('*', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.value).to.equal('*');
  });

  it('should have division operator as value', function(){
    var expr = new ArithmeticOperatorNode('/', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.value).to.equal('/');
  });

  it('should have carrot operator as value', function(){
    var expr = new ArithmeticOperatorNode('^', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.value).to.equal('^');
  });

  it('should have modulo operator as value', function(){
    var expr = new ArithmeticOperatorNode('%', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.value).to.equal('%');
  });

  it('should have greater than operator as value', function(){
    var expr = new ArithmeticOperatorNode('<', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.value).to.equal('<');
  });

  it('should have less than operator as value', function(){
    var expr = new ArithmeticOperatorNode('>', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.value).to.equal('>');
  });

  it('should have Operation as type', function(){
    var expr = new ArithmeticOperatorNode('+', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.type).to.equal('Operation');
  });

  it('should evaluate the addition expression', function(){
    var expr = new ArithmeticOperatorNode('+', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.evaluate({}).evaluate()).to.eql(3);
  });

  it('should evaluate the subtraction expression', function(){
    var expr = new ArithmeticOperatorNode('-', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.evaluate({}).evaluate()).to.eql(-1);
  });

  it('should evaluate the multiplication expression', function(){
    var expr = new ArithmeticOperatorNode('*', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.evaluate({}).evaluate()).to.eql(2);
  });

  it('should evaluate the modulo expression', function(){
    var expr = new ArithmeticOperatorNode('%', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.evaluate({}).evaluate()).to.eql(1);
  });

  it('should evaluate the greater than expression', function(){
    var expr = new ArithmeticOperatorNode('>', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.evaluate({}).evaluate()).to.eql(false);
  });

  it('should evaluate the less than expression', function(){
    var expr = new ArithmeticOperatorNode('<', [new NumberNode(3), new NumberNode(2)]);
    expect(expr.evaluate({}).evaluate()).to.eql(false);
  });

  it('should evaluate complex multiplication expression', function(){
    var fact = new FactorialNode('!', new NumberNode(5));
    var expr = new ArithmeticOperatorNode('*', [new NumberNode(2), fact]);
    expect(expr.evaluate({}).evaluate()).to.eql(240);
  });

  it('should evaluate the division expression', function(){
    var expr = new ArithmeticOperatorNode('/', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.evaluate({}).evaluate()).to.eql(0.5);
  });

  it('should evaluate the power of expression', function(){
    var expr = new ArithmeticOperatorNode('^', [new NumberNode(2), new NumberNode(3)]);
    expect(expr.evaluate({}).evaluate()).to.eql(8);
  });

  it('should look up for a variable in variable pool', function(){
    var variables = {list:{'a' : new NumberNode(1)}};
    variables.parent = variables;
    var expr = new ArithmeticOperatorNode('+', ['a', new NumberNode(2)]);
    expect(expr.evaluate(variables).evaluate()).to.equal(3);
  });

  it('should throw error when the variable does not exist in variable pool', function(){
    var location = {first_line:1, first_column:0};
    var variables = {list:{}};
    variables.parent = variables;
    var expr = new ArithmeticOperatorNode('+', [new VariableNode('a', location), new NumberNode(2)]);
    expect(function(){expr.evaluate(variables);}).throw('a is not defined. (Location 1:1)');
  });

  it('should evaluate complex expressions', function(){
    var addExpr = new ArithmeticOperatorNode('+', [new NumberNode(2), new NumberNode(2)]);
    var expr = new ArithmeticOperatorNode('/', [addExpr, new NumberNode(2)]);
    expect(expr.evaluate({}).evaluate()).to.eql(2);
  });

  it('should represent simple expressions', function(){
    var expr = new ArithmeticOperatorNode('*', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.represent()).to.eql(['*', 'one', 'two']);
  });

  it('should represent complex assignment expressions', function(){
    var addExpr = new ArithmeticOperatorNode('+', [new NumberNode(2), new NumberNode(3)]);
    var expr = new ArithmeticOperatorNode('*', [new NumberNode('2'), addExpr]);
    expect(expr.represent()).to.eql(['*', 'two', ['+', 'two', 'three']]);
  });

  it('should have JS code representation', function(){
    var expr = new ArithmeticOperatorNode('*', [new NumberNode(1), new NumberNode(2)]);
    expect(expr.toJS()).to.eql('(1 * 2)');
  });

  it('should have JS code representation of complex expressions', function(){
    var addExpr = new ArithmeticOperatorNode('+', [new NumberNode(2), new NumberNode(3)]);
    var expr = new ArithmeticOperatorNode('*', [new NumberNode('2'), addExpr]);
    expect(expr.toJS()).to.eql('(2 * (2 + 3))');
  });
});
