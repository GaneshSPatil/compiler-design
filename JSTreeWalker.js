var isFactorial = function(node){
  if(node.type == 'Factorial'){
    return true;
  }
  if(node.args.length == 0){
    return false;
  }
  return node.args.some(function(n){
    return isFactorial(n);
  });
};

var walk = function(trees, key, parent){
  var variables = {};
  variables.list = {};
  variables.parent = parent || variables;

  var result = trees.reduce(function(resultHolder, tree){
    var value = tree[key](variables);
    if(isFactorial(tree)){
      var factFn = 'var factorial = function(num){ if(num == 1){ return num;} return num*factorial(num-1);};'
      if(resultHolder[0] != factFn){
        resultHolder.unshift(factFn);
      }
    }
    if(tree.type != 'Conditional' && tree.type != 'Assignment'
    && tree.type != 'Loop' && tree.type != 'Function'){
      value = 'console.log('+value+');'
    }
    resultHolder.push(value);
    return resultHolder;
  }, []);
  return result;
};

exports.walk = walk;
