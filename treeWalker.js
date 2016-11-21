var walk = function(trees, key){
  var variables = {};
  var result = trees.reduce(function(resultHolder, tree){
    resultHolder.push(tree[key](variables));
    return resultHolder;
  }, []);
  return result;
};

exports.walk = walk;
