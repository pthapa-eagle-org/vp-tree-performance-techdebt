const TreePresenter = ({
  data: { isLeaf, title, nestingLevel, vpItems },
  isOpen,
  style,
  toggle,
}) => {
  const accordHandler = () => {
    alert("Clicked on accordian!");
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
          <button type="button" onClick={toggle} style={{ marginLeft: 10 }}>
            {isOpen ? "-" : "+"}
          </button>
        </div>
      )}
      <div style={{ fontFamily: "Courier New" }}>{title}</div>
      {vpItems && (
        <div>
          <button
            type="button"
            onClick={accordHandler}
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
