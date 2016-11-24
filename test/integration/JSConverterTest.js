var expect = require('chai').expect;
var treesWalker = require('../../JSTreeWalker.js');
var Parser = require("jison").Parser;
var fs = require('fs');
var grammar = fs.readFileSync('./exprEvaluator.jison', 'utf8');
var parser = new Parser(grammar);

describe('JS Code Converter', function(){
  beforeEach(function(){
    var parser = new Parser(grammar);
  });

  it('should evaluate simple assignment expression', function(){
    var expr = 'a=1+2;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'toJS').join('\n');
    expect(result).to.equal('var a = (1 + 2);');
  });

  it('should evaluate simple boolean value assignment expression', function(){
    var expr = 'a=true;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'toJS').join('\n');
    expect(result).to.equal('var a = true;');
  });

  it('should evaluate complex assignment expression', function(){
    var expr = 'a=1+2*3!;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'toJS').join('\n');
    expect(result).to.equal([
      'var factorial = function(num){ if(num == 1){ return num;} return num*factorial(num-1);};',
      'var a = (1 + (2 * factorial(3)));'
    ].join('\n'));
  });

  it('should print evaluation expressions', function(){
    var expr = '1+2;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'toJS').join('\n');
    expect(result).to.equal('console.log((1 + 2));');
  });

  it('should print powerOf expressions', function(){
    var expr = 'a=2^2;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'toJS').join('\n');
    expect(result).to.equal('var a = Math.pow(2, 2);');
  });

  it('should conevrt if expressions', function(){
    var expr = 'a=true;if true { a=5;};'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'toJS').join('\n');
    expect(result).to.equal([
      'var a = true;',
      'if (true) {',
      'var a = 5;',
      '};'
    ].join('\n'));
  });

  it('should conevrt if-else expressions', function(){
    var expr = 'a=2>3; if a { a=5;} else {a=10;};'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'toJS').join('\n');
    expect(result).to.equal([
      'var a = (2 > 3);',
      'if (a) {',
      'var a = 5;',
      '} else {',
      'var a = 10;',
      '};'
    ].join('\n'));
  });

  it('should conevrt if-elsif-else expressions', function(){
    var expr = 'a=true; if a { a=5;} elsif true {a=100;} else {a=10;};'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'toJS').join('\n');
    expect(result).to.equal([
      'var a = true;',
      'if (a) {',
          'var a = 5;',
      '} else {',
          'if (true) {',
              'var a = 100;',
          '} else {',
              'var a = 10;',
          '};',
      '};'
    ].join('\n'));
  });

  it('should conevrt multiple elsif expressions', function(){
    var expr = 'a=true; if a { a=5;} elsif true {a=100;} elsif false {a=6;} else {a=10;};'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'toJS').join('\n');
    expect(result).to.equal([
      'var a = true;',
      'if (a) {',
          'var a = 5;',
      '} else {',
          'if (true) {',
              'var a = 100;',
          '} else {',
              'if (false) {',
                  'var a = 6;',
              '} else {',
                  'var a = 10;',
              '};',
          '};',
      '};'
    ].join('\n'));
  });

  it('should convert multiple expressions to js code', function(){
    var expr = '1+2;1+3;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'toJS').join('\n');
    expect(result).to.equal([
      'console.log((1 + 2));',
      'console.log((1 + 3));'
    ].join('\n'));
  });

  it('should print variables', function(){
    var expr = 'a=1+2;a;'
    var trees = parser.parse(expr);
    var result = treesWalker.walk(trees, 'toJS').join('\n');
    expect(result).to.equal([
      'var a = (1 + 2);',
      'console.log(a);'
    ].join('\n'));
  });

});
