const DropDown = ({ header, list }) => {
  return (
    <div className="dropdown">
      <div className="dropdown-btn !py-1">{header}</div>

      <ul className="dropdown-list opacity-0 invisible">
        {list.length > 0 &&
          list.map((item, i) => {
            return <li key={i} className="dropdown-item">{item}</li>;
          })}
      </ul>
    </div>
  );
};

export default DropDown;
