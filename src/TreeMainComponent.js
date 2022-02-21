import React, { useCallback, useEffect, useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeTree } from "react-vtree";
import TreePresenter from "./TreePresenter";
// import { tree } from "./shortDummyData";
import { tree } from "./dummyData";

const TreeMainComponent = ({ itemSize }) => {
  const treeDom = useRef(null);

  const treeWalker = useCallback(
    function* treeWalker(refresh) {
      const stack = [];

      stack.push({
        nestingLevel: 0,
        node: tree,
      });

      while (stack.length !== 0) {
        const { node, nestingLevel } = stack.pop();
        const { id, title, children } = node;
        const isLeaf = children.length === 0;

        const isOpened = yield refresh
          ? {
              defaultHeight: itemSize,
              id: id.toString(),
              isLeaf,
              isOpenByDefault: true,
              title: title,
              vpItems: children.length === 0 && node.vpItems,
              nestingLevel,
            }
          : id;
        if (!isLeaf && isOpened) {
          for (let i = children.length - 1; i >= 0; i--) {
            stack.push({
              nestingLevel: nestingLevel + 1,
              node: node.children[i],
            });
          }
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
