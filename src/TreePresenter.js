/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback } from "react";
const TreePresenter = ({
  data: { isLeaf, title, nestingLevel, vpItems, id },
  height,
  isOpen,
  style,
  resize,
  setOpen,
  treeData: itemSize,
}) => {
  const canOpen = height <= itemSize;
  const childrenSize = (vpItems.length + 1) * itemSize;  

  const toggleNodeSize = useCallback(
    () => resize(canOpen ? height + childrenSize : height - childrenSize, true),
    [height, resize]
  );

  // useEffect(() => {
  //   // Applying resize to root node if it's height is not zero
  //   if (id === "root" && height !== 0) {
  //     resize(0, true);
  //   }
  // }, [height]);

  return (
    <div
      style={{
        ...style,
        alignItems: "center",
        display: `${isLeaf ? "grid" : "flex"}`,
        marginLeft: nestingLevel * 30 + (isLeaf ? 48 : 0),
        fontFamily: "Courier New",
      }}
    >
      {!isLeaf && (
        <div>
          <button
            type="button"
            onClick={() => setOpen(!isOpen)}
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            {isOpen ? "-" : "+"}
          </button>
        </div>
      )}
      <div>
        {title}
        {vpItems && (
          <button
            type="button"
            onClick={toggleNodeSize}
            style={{ backgroundColor: "lightblue", borderRadius: "50px" }}
          >
            {canOpen ? "Accord Open" : "Accord Close"}
          </button>
        )}
      </div>
     <div
        style={{
          marginLeft: nestingLevel * 10,
          display: "grid",
          rowGap: "10px"
        }}
      >
        <ul>
        {!canOpen &&
          vpItems.map((item) => {
            return <li>{item.inspection_type}</li>;
          })}
          </ul>
      </div>
    </div>
  );
};
export default TreePresenter;
