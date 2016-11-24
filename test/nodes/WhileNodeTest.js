var WhileNode = require('../../lib/nodes/WhileNode.js');
var AssignmentNode = require('../../lib/nodes/AssignmentNode.js');
var ArithmeticOperatorNode = require('../../lib/nodes/ArithmeticOperatorNode.js');
var NumberNode = require('../../lib/nodes/NumericNode.js');
var VariableNode = require('../../lib/nodes/VariableNode.js');
var BooleanNode = require('../../lib/nodes/BooleanNode.js');

var expect = require('chai').expect;

describe('WhileNode', function(){
  it('should have boolean as value', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var expr = new WhileNode(new BooleanNode('true'), [assignment], []);
    expect(expr.value.evaluate()).to.equal(true);
  });

  it('should have Loop as type', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var expr = new WhileNode(new BooleanNode('true'), [assignment], []);
    expect(expr.type).to.equal('Loop');
  });

  it('should convert to JS code', function(){
    var assignment = new AssignmentNode('=', ['a', new NumberNode(2)]);
    var expr = new WhileNode(new BooleanNode('false'), [assignment], []);
    expect(expr.toJS()).to.eql([
      'while (false) {',
      'var a = 2;',
      '};'
    ].join('\n'));
  });
});
