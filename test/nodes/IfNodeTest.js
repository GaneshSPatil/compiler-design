var IfNode = require('../../lib/nodes/IfNode.js');
var AssignmentNode = require('../../lib/nodes/AssignmentNode.js');
var NumberNode = require('../../lib/nodes/NumericNode.js');
var BooleanNode = require('../../lib/nodes/BooleanNode.js');

var expect = require('chai').expect;

describe('IfNode', function(){
  it('should have boolean as value', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var expr = new IfNode('true', [assignment]);
    expect(expr.value).to.equal('true');
  });

  it('should have Conditional as type', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var expr = new IfNode('true', [assignment]);
    expect(expr.type).to.equal('Conditional');
  });

  it('should evaluate the block if predicate is true expression', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var expr = new IfNode('true', [assignment]);
    expect(expr.evaluate({}).evaluate()).to.equal(2);
  });

  it('should not evaluate the block if predicate is false expression', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var expr = new IfNode('false', [assignment]);
    expect(expr.evaluate({}).evaluate()).to.equal(undefined);
  });

  it('should convert to JS code', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var expr = new IfNode(new BooleanNode('false'), [assignment]);
    expect(expr.toJS()).to.eql([
      'if (false){',
      'var a = 2;',
      '};'
    ].join('\n'));
  });
});
