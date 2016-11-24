var toString = require('../toString.js');
var treesWalker = require('../../treeWalker.js');
var JSTreesWalker = require('../../JSTreeWalker.js');
var UndefinedNode = require('./UndefinedNode.js');

var getValue = function(node, variables){
  if(node.type == 'Number' || node.type == 'Boolean'){
    return node;
  }
  return getValue(node.evaluate(variables), variables);
};

var isTrue = function(predicate, variables){
  return !!getValue(predicate, variables).evaluate();
};

module.exports = function(predicate, block){
  this.value = predicate;
  this.args = block;
  this.type = 'Loop';
  this.evaluate = function(variables){
    while(isTrue(this.value, variables)){
      result = treesWalker.walk(block, 'evaluate', variables);
    };
    result = result.length ? result : [new UndefinedNode()];
    return result[result.length - 1];
  };
  this.represent = function(){
    return [];
  };
  this.toJS = function(){
    var js = JSTreesWalker.walk(block, 'toJS').join('\n');
    return 'while (' + this.value.toJS() +') {\n'+ js +'\n};';
  }
}
