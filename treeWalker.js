var walk = function(trees, reducer){
  var variables = {};
  var result = trees.reduce(function(resultHolder, tree){
    resultHolder.push(reducer(tree, variables));
    return resultHolder;
  }, []);
  return result;
};

exports.walk = walk;
