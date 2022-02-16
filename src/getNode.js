export const getNodeData = (node, nestingLevel) => ({
    data: {
      id: node.id.toString(), // mandatory
      isLeaf: node.children ? node.children.length === 0 : false,
      isOpenByDefault: true, // mandatory
      name: node.name,
      nestingLevel
    },
    nestingLevel,
    node
  });