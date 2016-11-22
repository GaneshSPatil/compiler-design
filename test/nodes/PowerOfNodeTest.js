var PowerOfNode = require('../../lib/nodes/PowerOfNode.js');
var NumberNode = require('../../lib/nodes/NumericNode.js');
var VariableNode = require('../../lib/nodes/VariableNode.js');
var AssignmentNode = require('../../lib/nodes/AssignmentNode.js');

var expect = require('chai').expect;

describe('PowerOfNode', function(){
  it('should have carrot operator as value', function(){
    var expr = new PowerOfNode('^', [new NumberNode(5), new NumberNode(2)]);
    expect(expr.value).to.equal('^');
  });

  it('should have PowerOf as type', function(){
    var expr = new PowerOfNode('^', [new NumberNode(5), new NumberNode(2)]);
    expect(expr.type).to.equal('PowerOf');
  });

  it('should evaluate the PowerOf expression', function(){
    var expr = new PowerOfNode('^', [new NumberNode(5), new NumberNode(2)]);
    expect(expr.evaluate({}).evaluate()).to.equal(25);
  });

  it('should look up for a variable in variable pool', function(){
    var expr = new PowerOfNode('^', [new VariableNode('a'), new NumberNode(2)]);
    expect(expr.evaluate({'a' : new NumberNode(3)}).evaluate()).to.equal(9);
  });

  it('should throw error when the variable does not exist in variable pool', function(){
    var expr = new PowerOfNode('^', [new VariableNode('a'), new NumberNode(2)]);
    expect(function(){expr.evaluate({});}).throw('a is not defined');
  });

  it('should represent powerOf expressions', function(){
    var expr = new PowerOfNode('^', [new NumberNode(5), new NumberNode(2)]);
    expect(expr.represent()).to.eql(['^', 'five', 'two']);
  });

  it('should convert to JS code', function(){
    var expr = new PowerOfNode('^', [new NumberNode(5), new NumberNode(2)]);
    expect(expr.toJS()).to.eql('Math.pow(5, 2)');
  });
});
