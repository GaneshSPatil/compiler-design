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
    var variables = {list:{'a' : new NumericNode(2)}};
    variables.parent = variables;
    expect(varA.evaluate(variables).evaluate()).to.equal(2);
  });

  it('should throw error when its not present in the variables pool', function(){
    var location = {first_line:1, first_column:0};
    var varA = new VariableNode('a', location);
    var variables = {list:{}};
    variables.parent = variables;
    expect(function(){varA.evaluate(variables);}).throw('a is not defined. (Location 1:1)');
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
