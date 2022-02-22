const TreePresenter = ({
  data: { isLeaf, title, nestingLevel, vpItems, id, treeDom },
  height,
  isOpen,
  style,
  toggle,
  setOpen
}) => {
  const accordHandler = (accordData) => {
    alert(`${accordData}, was clicked!`);
  };
  return (
    <div
      style={{
        ...style,
        alignItems: "center",
        display: "flex",
        marginLeft: nestingLevel * 30 + (isLeaf ? 48 : 0),
      }}
    >
      {!isLeaf && (
        <div>
          <button type="button" onClick={() => setOpen(!isOpen)} style={{ marginLeft: 10 }}>
            {isOpen ? "-" : "+"}
          </button>
        </div>
      )}
      <div style={{ fontFamily: "Courier New" }}>{title}</div>
      {vpItems && (
        <div>
          <button
            type="button"
            onClick={() => accordHandler(id)}
            style={{ backgroundColor: "lightblue", borderRadius: "50px" }}
          >
            Accord
          </button>
        </div>
      )}
    </div>
  );
};
export default TreePresenter;
