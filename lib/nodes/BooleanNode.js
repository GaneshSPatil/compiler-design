var toString = require('../toString.js');

module.exports = function(value){
  this.value = value;
  this.args = [];
  this.type = 'Boolean';

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
