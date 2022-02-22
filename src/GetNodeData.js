const GetNodeData = (node, nestingLevel, itemSize, treeDom) => ({
    data: {
      id: node.id.toString(), // mandatory
      defaultHeight: itemSize,
      isLeaf: node.children ? node.children.length === 0 : false,
      isOpenByDefault: false, // mandatory
      title: node.title,
      vpItems: node.children.length === 0 && node.vpItems,
      nestingLevel
    },
    nestingLevel,
    node
  });

  export default GetNodeData;