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

module.exports = function(condition, block){
  this.value = condition;
  this.args = block;
  this.type = 'Conditional';
  this.evaluate = function(variables){
    if(!isTrue(this.value, variables)){
      return new UndefinedNode();
    };
    var result = treesWalker.walk(this.args, 'evaluate', variables);
    return result[result.length - 1];
  };
  this.represent = function(){
    return [];
  };
  this.toJS = function(){
    var result = JSTreesWalker.walk(this.args, 'toJS');
    return 'if (' + condition.toJS() +'){\n'+ result.join('\n') +'\n};' ;
  }
}
