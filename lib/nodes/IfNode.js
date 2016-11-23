var toString = require('../toString.js');
var treesWalker = require('../../JSTreeWalker.js');
var UndefinedNode = require('./UndefinedNode.js');

module.exports = function(condition, block){
  this.value = condition;
  this.args = block;
  this.type = 'Conditional';
  this.evaluate = function(variables){
    if(this.value == 'false'){
      return new UndefinedNode();
    }
    var result = treesWalker.walk(this.args, 'evaluate');
    return result[result.length - 1];
  };
  this.represent = function(){
    return [];
  };
  this.toJS = function(){
    var result = treesWalker.walk(this.args, 'toJS');
    return 'if (' + condition.toJS() +'){\n'+ result.join('\n') +'\n};' ;
  }
}
