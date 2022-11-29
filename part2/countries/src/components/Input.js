import React from "react";

const Input = ({ onChange, value }) => {
  return (
    <div>
      <label htmlFor="country">Enter a country</label>
      <input type="text" id="country" onChange={onChange} />
    </div>
  );
};

export default Input;
