var walk = function(trees, key, parent){
  var variables = parent;
  var result = trees.reduce(function(resultHolder, tree){
    var value = tree[key](variables);
    resultHolder.push(value);
    return resultHolder;
  }, []);
  return result;
};

exports.walk = walk;
