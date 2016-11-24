var toString = require('../toString.js');

module.exports = function(){
  this.value = undefined;
  this.args = [];
  this.type = 'Undefined';
  this.evaluate = function(variables){
    return this.value;
  };
  this.represent = function(){
    return this.value;
  };
  this.toJS = function(){
    return this.value;
  }
}
