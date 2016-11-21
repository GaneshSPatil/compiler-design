var expect = require('chai').expect;
var Parser = require("jison").Parser;
var fs = require('fs');

var grammar = fs.readFileSync('./exprEvaluator.jison', 'utf8');
var parser = new Parser(grammar);

describe('Build Tree', function(){
  beforeEach(function(){
    var parser = new Parser(grammar);
  });

  it('should build a tree for simple expression', function(){
    var expr = '1+2;';
    var actualTree = parser.parse(expr);
    var expectedTree = [ { op: '+', args: [ 1, 2 ] } ];
    expect(actualTree).to.eql(expectedTree);
  });

  it('should build a tree for assignment expression', function(){
    var expr = 'a=2;';
    var actualTree = parser.parse(expr);
    var expectedTree = [ { op: '=', args: [ 'a', 2 ] } ];
    expect(actualTree).to.eql(expectedTree);
  });

  it('should build a tree for complex expression', function(){
    var expr = '2+(5+3*4);';
    var actualTree = parser.parse(expr);
    var expectedTree = [{op:'+', args:[2, {op:'+', args: [5, { op: '*', args: [ 3, 4 ] }]}]}];
    expect(actualTree).to.eql(expectedTree);
  });

  it('should build different trees for different expressions', function(){
    var expr = '1+2;b=2;';
    var actualTree = parser.parse(expr);
    var expectedTree = [ { op: '+', args: [ 1, 2 ] }, {op:'=', args: ['b', 2]} ];
    expect(actualTree).to.eql(expectedTree);
  });
});
