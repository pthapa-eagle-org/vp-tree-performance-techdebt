import './style.css';

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
      className='list'
      style={{
        ...style,
        alignItems: "center",
        display: "flex",
        marginLeft: nestingLevel * 30,
      }}
    >
      <div className='item'>
      {!isLeaf && (
        <div>
          <button type="button" onClick={() => setOpen(!isOpen)} >
            {isOpen ? "-" : "+"}
          </button>
        </div>
      )}
      <div>{title}</div>
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
    </div>
  );
};
export default TreePresenter;
