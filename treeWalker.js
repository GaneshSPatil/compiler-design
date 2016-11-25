var addFunction = function(pool, name, args, block){
  var fnPool = pool.functions || {};
  fnPool[name] = {
    'args': args,
    'block': block
  };
};

var walk = function(trees, key, parent){
  parent.addFunction = addFunction;
  var variables = parent;
  var result = trees.reduce(function(resultHolder, tree){
    var value = tree[key](variables);
    resultHolder.push(value);
    return resultHolder;
  }, []);
  return result;
};

exports.walk = walk;
