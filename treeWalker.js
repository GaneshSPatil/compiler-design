var walk = function(trees, key){
  var variables = {};
  var result = trees.reduce(function(resultHolder, tree){
    var value = tree[key](variables);
    if(tree.type == 'Factorial'){
      var factFn = 'var factorial = function(num){ if(num == 1){ return num;} return num*factorial(num-1);};'
      resultHolder.unshift(factFn);
    }
    if(tree.type != 'Assignment'){
      value = 'console.log('+value+');'
    }
    resultHolder.push(value);
    return resultHolder;
  }, []);
  return result;
};

exports.walk = walk;
