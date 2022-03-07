const GetNodeData = (node, nestingLevel, itemSize, expand) => ({
    data: {
      id: node.id.toString(), // mandatory
      defaultHeight: itemSize,
      isLeaf: node.children ? node.children.length === 0 : false,
      isOpenByDefault: true, // mandatory
      title: node.title,
      vpItems: node.children.length === 0 && node.vpItems,
      tree: node,
      nestingLevel
    },
    nestingLevel,
    node
  });

  export default GetNodeData;