var IfNode = require('../../lib/nodes/IfNode.js');
var AssignmentNode = require('../../lib/nodes/AssignmentNode.js');
var OperatorNode = require('../../lib/nodes/OperatorNode.js');
var NumberNode = require('../../lib/nodes/NumericNode.js');
var BooleanNode = require('../../lib/nodes/BooleanNode.js');

var expect = require('chai').expect;

describe('IfNode', function(){
  it('should have boolean as value', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var expr = new IfNode(new BooleanNode('true'), [assignment], []);
    expect(expr.value.evaluate()).to.equal(true);
  });

  it('should have Conditional as type', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var expr = new IfNode(new BooleanNode('true'), [assignment], []);
    expect(expr.type).to.equal('Conditional');
  });

  it('should evaluate the block if predicate is true expression', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var expr = new IfNode(new BooleanNode('true'), [assignment], []);
    expect(expr.evaluate({}).evaluate()).to.equal(2);
  });

  it('should evaluate the predicate value', function(){
    var variables = {list:{'a' : new NumberNode(2)}};
    variables.parent = variables;
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var pred = new AssignmentNode('=', ['foo', new BooleanNode('true')]);
    var expr = new IfNode(pred, [assignment], []);
    expect(expr.evaluate(variables).evaluate()).to.equal(2);
  });

  it('should evaluate truthy predicate', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var pred = new OperatorNode('+', [new NumberNode(1), new NumberNode(2)]);
    var expr = new IfNode(pred, [assignment], []);
    expect(expr.evaluate({}).evaluate()).to.equal(2);
  });

  it('should evaluate falsy predicate', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var pred = new OperatorNode('-', [new NumberNode(1), new NumberNode(1)]);
    var expr = new IfNode(pred, [], [assignment]);
    expect(expr.evaluate({}).evaluate()).to.equal(2);
  });

  it('should convert to JS code', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var expr = new IfNode(new BooleanNode('false'), [assignment], []);
    expect(expr.toJS()).to.eql([
      'if (false) {',
      'var a = 2;',
      '};'
    ].join('\n'));
  });

  it('should evaluate else block if the predicate is false', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var pred = new OperatorNode('-', [new NumberNode(1), new NumberNode(1)]);
    var expr = new IfNode(pred, [], [assignment]);
    expect(expr.evaluate({}).evaluate()).to.equal(2);
  });

  it('should convert to if-else block to JS code', function(){
    var assignment1 = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var assignment2 = new AssignmentNode('=', ['b', new NumberNode(5)]);
    var expr = new IfNode(new BooleanNode('false'), [assignment1], [assignment2]);
    expect(expr.toJS()).to.eql([
      'if (false) {',
      'var a = 2;',
      '} else {',
      'var b = 5;',
      '};'
    ].join('\n'));
  });
});
