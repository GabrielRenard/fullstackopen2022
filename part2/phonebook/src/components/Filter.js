import React from "react";
import Input from "./UI/Input";

const Filter = ({ filterNameHandler }) => {
  return (
    <>
      <Input
        label="Filter"
        onChange={filterNameHandler}
        type="text"
        placeholder="Filter contacts"
      />
    </>
  );
};

export default Filter;
