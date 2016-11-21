module.exports = function(value){
  this.value = +value;
  this.args = [];
  this.type = 'Number';
  this.evaluate = function(variables){
    return this.value;
  };
  this.represent = function(){
    return value.toString();
  };
}
