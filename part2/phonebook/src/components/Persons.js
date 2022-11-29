import React from "react";

const Persons = ({ phoneBookList }) => {
  return (
    <ul>
      {phoneBookList && phoneBookList}
      {phoneBookList.length === 0 && <p>Not in contacts</p>}
    </ul>
  );
};

export default Persons;
