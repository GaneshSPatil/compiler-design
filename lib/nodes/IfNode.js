var toString = require('../toString.js');
var treesWalker = require('../../treeWalker.js');
var JSTreesWalker = require('../../JSTreeWalker.js');

var getValue = function(node, variables){
  if(node.type == 'Number' || node.type == 'Boolean'){
    return node;
  }
  return getValue(node.evaluate(variables), variables);
};

var isTrue = function(predicate, variables){
  return !!getValue(predicate, variables).evaluate();
};

var getElseBlock = function(elseString){
  if(elseString){
    return ' else {\n' + elseString + '\n};'
  };
  return ';';
}

module.exports = function(condition, ifBlock, elseBlock){
  this.value = condition;
  this.args = [];
  this.type = 'Conditional';
  this.evaluate = function(variables){
    if(isTrue(this.value, variables)){
      var result = treesWalker.walk(ifBlock, 'evaluate', variables);
      return result[result.length - 1];
    }else{
      var result = treesWalker.walk(elseBlock, 'evaluate', variables);
      return result[result.length - 1];
    }
  };
  this.represent = function(){
    return [];
  };
  this.toJS = function(){
    var ifBlockJS = JSTreesWalker.walk(ifBlock, 'toJS').join('\n');
    var elseBlockJS = JSTreesWalker.walk(elseBlock, 'toJS').join('\n');
    return 'if (' + condition.toJS() +') {\n'+ ifBlockJS +'\n}' + getElseBlock(elseBlockJS);
  }
}
