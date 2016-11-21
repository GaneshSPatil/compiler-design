var OperatorNode = require('../lib/nodes/OperatorNode.js');
var NumberNode = require('../lib/nodes/NumericNode.js');
var VariableNode = require('../lib/nodes/VariableNode.js');
var AssignmentNode = require('../lib/nodes/AssignmentNode.js');

var expect = require('chai').expect;
var Parser = require("jison").Parser;
var fs = require('fs');

var grammar = fs.readFileSync('./exprEvaluator.jison', 'utf8');
var parser = new Parser(grammar);

var compare = function(actualTrees, expectedTrees){
  expect(expectedTrees.length).to.equal(actualTrees.length);
  expectedTrees.forEach(function(tree, i){
    expect(tree.represent()).to.eql(actualTrees[i].represent());
  });
};

describe('Build Tree', function(){
  beforeEach(function(){
    var parser = new Parser(grammar);
  });

  it('should build a tree for simple expression', function(){
    var expr = '1+2;';
    var actualTree = parser.parse(expr);

    var op1 = new NumberNode(1);
    var op2 = new NumberNode(2);
    var expectedTree = [ new OperatorNode('+', [ op1, op2]) ];
    compare(actualTree, expectedTree);
  });

  it('should build a tree for assignment expression', function(){
    var expr = 'a=2;';
    var actualTree = parser.parse(expr);
    var expectedTree = [ new AssignmentNode('=', ['a', new NumberNode(2)]) ];
    compare(actualTree, expectedTree);
  });

  it('should build a tree for complex expression', function(){
    var expr = '5+(2+3*4);';
    var actualTree = parser.parse(expr);

    var two = new NumberNode(2);
    var four = new NumberNode(4);
    var five = new NumberNode(5);
    var three = new NumberNode(3);
    var multiply = new OperatorNode('*', [three, four]);
    var add = new OperatorNode('+', [two, multiply]);

    var expectedTree = [ new OperatorNode('+', [five, add]) ];
    compare(actualTree, expectedTree);
  });

  it('should build different trees for different expressions', function(){
    var expr = '1+2;b=2;';
    var actualTree = parser.parse(expr);
    var expectedTree = [
      new OperatorNode('+', [new NumberNode(1), new NumberNode(2)]),
      new AssignmentNode('=', ['b', new NumberNode(2)])
    ];
    compare(actualTree, expectedTree);
  });
});
