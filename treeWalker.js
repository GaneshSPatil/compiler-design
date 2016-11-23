var walk = function(trees, key, parent){
  var variables = {};
  variables.list = {};
  variables.parent = parent || variables;
  var result = trees.reduce(function(resultHolder, tree){
    var value = tree[key](variables);
    resultHolder.push(value);
    return resultHolder;
  }, []);
  return result;
};

exports.walk = walk;
