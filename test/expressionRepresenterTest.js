var expect = require('chai').expect;
var Parser = require("jison").Parser;
var fs = require('fs');
var representExpr = require('../lib/treeToString.js');

var grammar = fs.readFileSync('./exprEvaluator.jison', 'utf8');
var parser = new Parser(grammar);

describe('Represent Tree', function(){
  beforeEach(function(){
    var parser = new Parser(grammar);
  });

  it('should represent simple addition expression', function(){
    var expr = {op:'+', args:[1, 2]};
    var expected = [ 'plus', 1, 2 ];
    expect(representExpr(expr)).to.eql(expected);
  });

  it('should represent a subtraction expression', function(){
    var expr = {op:'-', args:[1, 2]};
    var expected = [ 'minus', 1, 2 ];
    expect(representExpr(expr)).to.eql(expected);
  });

  it('should represent a division expression', function(){
    var expr = {op:'/', args:[1, 2]};
    var expected = [ 'divided by', 1, 2 ];
    expect(representExpr(expr)).to.eql(expected);
  });

  it('should represent a multiplication expression', function(){
    var expr = {op:'*', args:[1, 2]};
    var expected = [ 'times', 1, 2 ];
    expect(representExpr(expr)).to.eql(expected);
  });

  it.skip('should represent a factorial', function(){
  });

  it.skip('should represent a power of', function(){
  });

  it('should represent an assignment operation', function(){
    var expr = {op:'=', args:['a', 2]};
    var expected = [ 'equalTo', 'a', 2 ];
    expect(representExpr(expr)).to.eql(expected);
  });
});
