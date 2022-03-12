import React, { useCallback, useEffect, useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeTree } from "react-vtree";
import TreePresenter from "./TreePresenter";
import GetNodeData from "./GetNodeData";
// import { tree } from "./shortDummyData";
import { tree } from "./dummyData";

const TreeMainComponent = ({ itemSize, appendVpCondition }) => {
  const treeDom = useRef(null);
  
  const treeWalker = useCallback(
    function* treeWalker(refresh) {
      yield GetNodeData(tree, 0, itemSize);

      while (true) {
        const parentMeta = yield;
        for (let i = 0; i < parentMeta.node.children.length; i++) {
          yield GetNodeData(
            parentMeta.node.children[i],
            parentMeta.nestingLevel + 1,
            itemSize           
          );
        }
      }
    },
    [itemSize]
  );

  useEffect(() => {
    treeDom.current?.recomputeTree({
      refreshNodes: true,
      useDefaultHeight: true,
    });
  }, [itemSize]);


  return (
    <AutoSizer disableWidth>
      {({ height }) => (
        <VariableSizeTree
          ref={treeDom}
          itemData={itemSize}
          treeWalker={treeWalker}
          height={height}
          width="100%"
        
        >
          {TreePresenter}
        </VariableSizeTree>
      )}
    </AutoSizer>
  );
};

export default TreeMainComponent;
