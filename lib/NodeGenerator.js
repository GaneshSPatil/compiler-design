var NumberNode = require('./Nodes/NumericNode.js');
var VariableNode = require('./Nodes/VariableNode.js');
var OperatorNode = require('./Nodes/OperatorNode.js');
var symbolToFunctionMapper = require('./symbolToFunctionMapper.js');
var AssignmentNode = require('./Nodes/AssignmentNode.js');

exports.nodeGenerators = {
  NumberNode : NumberNode,
  OperatorNode: OperatorNode,
  AssignmentNode: AssignmentNode
};
