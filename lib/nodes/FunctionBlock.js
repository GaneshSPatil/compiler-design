var toString = require('../toString.js');
var treesWalker = require('../../treeWalker.js');
var JSTreesWalker = require('../../JSTreeWalker.js');
var UndefinedNode = require('./UndefinedNode.js');

var getGlobalVariablePool = function(variables){
  if(variables == variables.parent){
    return variables;
  }
  return getGlobalVariablePool(variables.parent);
}

module.exports = function(name, args, block){
  this.value = block;
  this.args = args;
  this.type = 'Function';
  this.evaluate = function(variables){
    var globalPool = getGlobalVariablePool(variables);
    globalPool.addFunction(globalPool,name.toJS(), args, block);
    return new UndefinedNode();
  };
  this.represent = function(){
    return [];
  };
  this.toJS = function(){
    var argsJS = args.map(function(arg){ return arg.toJS();}).join(', ');
    var jsBlock = JSTreesWalker.walk(block, 'toJS').join('\n');
    return 'function '+name.toJS() + '('+ argsJS +'){' + jsBlock + '};';
  }
}
