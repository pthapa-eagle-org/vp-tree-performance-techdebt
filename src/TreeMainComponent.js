import React, { useCallback, useEffect, useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeTree } from "react-vtree";
import TreePresenter from "./TreePresenter";
import GetNodeData from "./GetNodeData";
// import { tree } from "./shortDummyData";
import { tree } from "./dummyData";
import './style.css';

const TreeMainComponent = ({ itemSize }) => {
  const treeDom = useRef(null);
  const [treeData, setTreeData] = React.useState(tree);
  const [expand, setExpand] = React.useState(true);

  const treeWalker = useCallback(
    function* treeWalker(refresh) {
      yield GetNodeData(treeData, 0, itemSize, expand);

      while (true) {
        const parentMeta = yield;
        for (let i = 0; i < parentMeta.node.children.length; i++) {
          yield GetNodeData(
            parentMeta.node.children[i],
            parentMeta.nestingLevel + 1,
            itemSize,
            expand
          );
        }
      }
    },
    [itemSize, expand]
  );

  useEffect(() => {
    treeDom.current?.recomputeTree({
      refreshNodes: true,
      useDefaultHeight: true,
    });
  }, [itemSize]);

  return (
    <React.Fragment>
      <button onClick={() => setExpand((data) => !data)}>{expand ? "Collapse All": "Expand All"}</button>
      {/* <div className="tree"> */}
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
      {/* </div> */}
    </React.Fragment>
  );
};

export default TreeMainComponent;
