import React from "react";
import { FixedSizeTree as Tree } from "react-vtree";
import AutoSizer from "react-virtualized-auto-sizer";
//import { tree } from "./dummyData";
import { tree } from "./shortDummyData";
import {useStyles } from "./style.js";


function* treeWalker(refresh) {
  const stack = [];

  // Remember all the necessary data of the first node in the stack.
  stack.push({
    nestingLevel: 0,
    node: tree
  });

  // Walk through the tree until we have no nodes available.
  while (stack.length !== 0) {
    const { node, nestingLevel } = stack.pop();
    const { children, id, title } = node;
   

    // Here we are sending the information about the node to the Tree component
    // and receive an information about the openness state from it. The
    // `refresh` parameter tells us if the full update of the tree is requested;
    // basing on it we decide to return the full node data or only the node
    // id to update the nodes order.
   
    const isOpened = yield refresh
      ? {
          id,
          isLeaf: children.length === 0,
          isOpenByDefault: true,
          title,
          vpItems: children.length === 0 && node.vpItems,
          nestingLevel,
          margin: nestingLevel * 20
        }
      : id;

    // Basing on the node openness state we are deciding if we need to render
    // the child nodes (if they exist).
    if (node.children.length !== 0 && isOpened) {
      // Since it is a stack structure, we need to put nodes we want to render
      // first to the end of the stack.
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({
          nestingLevel: nestingLevel + 1,
          node: node.children[i]
        });
      }
    }
  }
}

const Node = props => {
  const { data, isOpen, style, toggle } = props;
  const {
    isLeaf,
    title,
    margin,  
    vpItems  
  } = data;

  const classes = useStyles();
  const accordHandler = () => {
    alert('Clicked on accordian!')
  }
  return (
    <div
      classtitle={classes.item}
      style={{
        ...style,
        alignItems: 'center',
        marginLeft: margin,
        display: 'flex',
      }}
    >
      {!isLeaf && (
        <button type="button" onClick={toggle}>
          {isOpen ? "-" : "+"}
        </button>
      )}
      <div>{title}</div>
       { vpItems && <div>
        <button type="button"  onClick={accordHandler} style={{"backgroundColor": "lightblue", "borderRadius": "50px" }}>
          Accord
        </button>
      </div>}
    </div>
  );
};

export default function App() {
  return (
   // <AutoSizer disableWidth >
  <Tree treeWalker={treeWalker} itemSize={50} height={250} width={600}>
     {Node}
  </Tree>
 // </AutoSizer>
 );
}
