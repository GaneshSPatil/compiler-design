var VariableNode = require('../../lib/nodes/VariableNode.js');
var NumericNode = require('../../lib/nodes/NumericNode.js');

var expect = require('chai').expect;

describe('VariableNode', function(){
  it('should have value field containing variable name', function(){
    var varA = new VariableNode('a');
    expect(varA.value).to.equal('a');
  });

  it('should not have any arguments', function(){
    var varA = new VariableNode('a');
    expect(varA.args).to.eql([]);
  });

  it('type should be Variable', function(){
    var varA = new VariableNode('a');
    expect(varA.type).to.equal('Variable');
  });

  it('should evaluate and return the value of itself from variables pool', function(){
    var varA = new VariableNode('a');
    expect(varA.evaluate({'a' : new NumericNode(2)}).evaluate()).to.equal(2);
  });

  it('should throw error when its not present in the variables pool', function(){
    var varA = new VariableNode('a');
    expect(function(){varA.evaluate({})}).throw('a is not defined');
  });

  it('should have string representation of the variable name', function(){
    var varA = new VariableNode('a');
    expect(varA.represent()).to.equal('a');
  });

  it('should have JS code representation of the variable name', function(){
    var varA = new VariableNode('a');
    expect(varA.toJS()).to.equal('a');
  });
});
