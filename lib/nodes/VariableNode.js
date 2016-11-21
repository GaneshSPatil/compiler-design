module.exports = function(value){
  this.value = value;
  this.args = [];
  this.type = 'Variable';
  this.evaluate = function(variables){
    var result = variables[this.value];
    if(result == undefined){
      throw new Error(this.value + ' is not defined');
    }
    return result;
  };
  this.represent = function(){
    return value;
  };
}
