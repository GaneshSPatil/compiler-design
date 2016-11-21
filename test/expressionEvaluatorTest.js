var expect = require('chai').expect;
var Parser = require("jison").Parser;
var fs = require('fs');
var evaluateExpr = require('../lib/evaluate.js');

var grammar = fs.readFileSync('./exprEvaluator.jison', 'utf8');
var parser = new Parser(grammar);

describe('Build Tree', function(){
  beforeEach(function(){
    var parser = new Parser(grammar);
  });

  it('should evaluate an addition expression', function(){
    var expr = {op:'+', args:[1, 2]};
    expect(evaluateExpr(expr, {})).to.equal(3);
  });

  it('should evaluate a subtraction expression', function(){
    var expr = {op:'-', args:[1, 2]};
    expect(evaluateExpr(expr, {})).to.equal(-1);
  });

  it('should evaluate a division expression', function(){
    var expr = {op:'/', args:[1, 2]};
    expect(evaluateExpr(expr, {})).to.equal(0.5);
  });

  it.skip('should evaluate a factorial', function(){
  });

  it.skip('should evaluate a power of', function(){
  });

  it('should evaluate an assignment operation', function(){
    var expr = {op:'=', args:['a', 2]};
    var variables = {};
    expect(variables.a).to.equal(undefined);
    expect(evaluateExpr(expr, variables)).to.equal(undefined);
    expect(variables.a).to.equal(2);
  });

  it('should use variable value from the provided variable pool', function(){
    var expr = {op:'+', args:['a', 2]};
    var variables = {a:2};
    expect(evaluateExpr(expr, variables)).to.equal(4);
  });

  it('should throw error if the variable is not present in the variable pool', function(){
    var expr = {op:'+', args:['b', 2]};
    var variables = {a:2};
    expect(function(){evaluateExpr(expr, variables)}).to.throw('b is not defined');
  });
});
