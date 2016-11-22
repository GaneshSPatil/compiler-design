module.exports = function(value, loc){
  this.value = value;
  this.loc = loc;
  this.args = [];
  this.type = 'Variable';
  this.evaluate = function(variables){
    var result = variables[this.value];
    if(result == undefined){
      var loc = '(Location ' + this.loc.first_line + ':' + (this.loc.first_column + 1) + ')';
      throw new Error(this.value + ' is not defined. ' + loc);
    };
    return result;
  };
  this.represent = function(){
    return this.value;
  };

  this.toJS = function(){
    return this.value;
  };
}
