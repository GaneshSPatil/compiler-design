var FactorialNode = require('../../lib/nodes/FactorialNode.js');
var NumberNode = require('../../lib/nodes/NumericNode.js');
var VariableNode = require('../../lib/nodes/VariableNode.js');
var AssignmentNode = require('../../lib/nodes/AssignmentNode.js');

var expect = require('chai').expect;

describe('FactorialNode', function(){
  it('should have exclamation operator as value', function(){
    var expr = new FactorialNode('!', new NumberNode(5));
    expect(expr.value).to.equal('!');
  });

  it('should have Factorial as type', function(){
    var expr = new FactorialNode('!', new NumberNode(5));
    expect(expr.type).to.equal('Factorial');
  });

  it('should evaluate the factorial expression', function(){
    var expr = new FactorialNode('!', new NumberNode(5));
    expect(expr.evaluate({}).evaluate()).to.equal(120);
  });

  it('should look up for a variable in variable pool', function(){
    var expr = new FactorialNode('!', new VariableNode('a'));
    expect(expr.evaluate({list:{'a' : new NumberNode(3)}}).evaluate()).to.equal(6);
  });

  it('should throw error when the variable does not exist in variable pool', function(){
    var location = {first_line:1, first_column:0};
    var expr = new FactorialNode('!', new VariableNode('a', location));
    var variables = {list:{}};
    variables.parent = variables;
    expect(function(){expr.evaluate(variables);}).throw('a is not defined. (Location 1:1)');
  });

  it('should represent factorial expressions', function(){
    var expr = new FactorialNode('!', new VariableNode('a'));
    expect(expr.represent()).to.eql(['a', '!']);
  });

  it('should convert to JS code', function(){
    var expr = new FactorialNode('!', new VariableNode('a'));
    expect(expr.toJS()).to.eql('factorial(a)');
  });
});
