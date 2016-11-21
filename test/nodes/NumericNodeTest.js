var NumericNode = require('../../lib/nodes/NumericNode.js');
var expect = require('chai').expect;

describe('NumericNode', function(){
  it('should have value field containing numeric value', function(){
    var two = new NumericNode(2);
    expect(two.value).to.equal(2);
  });

  it('should not have any arguments', function(){
    var two = new NumericNode(2);
    expect(two.args).to.eql([]);
  });

  it('type should be number', function(){
    var two = new NumericNode(2);
    expect(two.type).to.equal('Number');
  });

  it('should evaluate itself and return the value', function(){
    var two = new NumericNode(2);
    expect(two.evaluate({})).to.equal(2);
  });

  it('should have string representation of the value', function(){
    var two = new NumericNode(2);
    expect(two.represent()).to.equal('two');
  });

  it('should have string representation of big number value', function(){
    var num = new NumericNode(1000000);
    expect(num.represent()).to.equal('one million');
  });
});
