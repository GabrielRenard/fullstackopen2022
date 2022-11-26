import React from "react";

const Filter = ({ filterNameHandler }) => {
  return (
    <div>
      <label htmlFor="filter">Filter</label>
      <input type="text" id="filter" onChange={filterNameHandler} />
    </div>
  );
};

export default Filter;
