var expect = require('chai').expect;
var treesWalker = require('../../treeWalker.js');
var Parser = require("jison").Parser;
var fs = require('fs');
var grammar = fs.readFileSync('./exprEvaluator.jison', 'utf8');
var parser = new Parser(grammar);

describe('Evaluate Tree', function(){
  beforeEach(function(){
    var parser = new Parser(grammar);
  });

  it('should evaluate simple evaluation expression', function(){
    var expr = '1+2;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'evaluate').pop().evaluate();
    expect(result).to.equal(3);
  });

  it('should evaluate complex evaluation expression', function(){
    var expr = '1+2^2*3!;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'evaluate').pop().evaluate();
    expect(result).to.equal(25);
  });

  it('should evaluate assignment expression', function(){
    var expr = 'a=2;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'evaluate').pop().evaluate();
    expect(result).to.equal(2);
  });

  it('should evaluate recursive assignment expression', function(){
    var expr = 'a=2;b=a;c=b;d=c;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'evaluate').pop().evaluate();
    expect(result).to.equal(2);
  });

  it('should evaluate assignment expression having values as evaluation expression', function(){
    var expr = 'a=2;b=a+2;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'evaluate').pop().evaluate();
    expect(result).to.equal(4);
  });

  it('should evaluate recursive assignment expression', function(){
    var expr = 'a=2;b=10;c=a*b;c+2;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'evaluate').pop().evaluate();
    expect(result).to.equal(22);
  });

  it.skip('should return last evaluated value', function(){
    var expr = '2;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'evaluate').pop().evaluate();
    expect(result).to.equal(2);
  });

  it('should return last evaluated value of the expression', function(){
    var expr = '5!;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'evaluate').pop().evaluate();
    expect(result).to.equal(120);
  });

  it('should allow reassigning values of the variables', function(){
    var expr = 'a=2;a=10;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'evaluate').pop().evaluate();
    expect(result).to.equal(10);
  });
});
