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

module.exports = function(fnName, args){
  this.value = fnName;
  this.args = args;
  this.type = 'FunctionCall';
  this.evaluate = function(variables){
    var globalPool = getGlobalVariablePool(variables);
    var fn = globalPool.allFunctions[fnName.value];
    if(!fn){
      throw new Error('Undefined method '+fnName.value);
    };
    var fnArgs = {};
    fnArgs.list = fn.args.reduce(function(first, arg, i){
      first[arg.value] = args[i]
      return first;
    }, {});
    fnArgs.parent = variables;
    var result = treesWalker.walk(fn.block, 'evaluate', fnArgs);
    return result[result.length - 1];
  };
  this.represent = function(){
    return toString(this.value);
  };
  this.toJS = function(){
    var argsJS = args.map(function(arg){ return arg.toJS();}).join(', ');
    return fnName.value + '('+argsJS +')';
  }
}
