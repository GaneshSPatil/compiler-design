var findTillTop = function(value, variables){
  if(variables === variables.parent){
    return variables.list[value];
  };
  return variables.list[value] || findTillTop(value, variables.parent);
};

module.exports = function(value, loc){
  this.value = value;
  this.loc = loc;
  this.args = [];
  this.type = 'Variable';
  this.evaluate = function(variables){
    var result = findTillTop(this.value, variables);
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
