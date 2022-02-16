import React from "react";
import { FixedSizeTree as Tree } from "react-vtree";
// import { tree } from "./dummyData";
import {useStyles } from "./style.js";



const tree = {
  name: "Root",
  id: "root",
  children: [
    {
      children: [
        { id: "child-1a", name: "Child #1a", children: [
              { id: "child-1aa", name: "Child #1aa", children: []}
        ] },

        { id: "child-1b", name: "Child #1b", children: [
          { id: "child-1bb", name: "Child #1bb", children: [
            { id: "child-1bbb", name: "Child #1bbb", children: []}
          ]}
        ]}
      ],
      id: "child-1",
      name: "Child #1"
    },
    {
      children: [{ id: "child-2a", name: "Child #2a", children: [] }],
      id: "child-2",
      name: "Child #2"
    }
  ]
};

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
    const { children, id, name } = node;

    // Here we are sending the information about the node to the Tree component
    // and receive an information about the openness state from it. The
    // `refresh` parameter tells us if the full update of the tree is requested;
    // basing on it we decide to return the full node data or only the node
    // id to update the nodes order.
    const isOpened = yield refresh
      ? {
          id,
          isLeaf: children.length === 0,
          isOpenByDefault: false,
          name,
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
    name,
    margin,    
  } = data;

  const classes = useStyles();
  return (
    <div
      className={classes.item}
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
      <div>{name}</div>
    </div>
  );
};

export default function App() {
  return (
  <Tree treeWalker={treeWalker} itemSize={30} height={250} width={600}>
  {Node}
  </Tree>
 );
}
