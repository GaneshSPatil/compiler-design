var BooleanNode = require('../../lib/nodes/BooleanNode.js');
var expect = require('chai').expect;

describe('BooleanNode', function(){
  it('should have value field containing boolean value', function(){
    var trueValue = new BooleanNode('true');
    expect(trueValue.value).to.equal('true');
  });

  it('should not have any arguments', function(){
    var trueValue = new BooleanNode('true');
    expect(trueValue.args).to.eql([]);
  });

  it('type should be Boolean', function(){
    var trueValue = new BooleanNode('true');
    expect(trueValue.type).to.equal('Boolean');
  });

  it('should evaluate itself and return the value', function(){
    var trueValue = new BooleanNode('true');
    expect(trueValue.evaluate({})).to.equal('true');
  });

  it('should have string representation of the value', function(){
    var trueValue = new BooleanNode('true');
    expect(trueValue.represent()).to.equal('true');
  });

  it('should have JS code representation', function(){
    var trueValue = new BooleanNode('true');
    expect(trueValue.toJS()).to.equal('true');
  })
});
