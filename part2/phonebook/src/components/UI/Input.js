import React from "react";

const Input = props => {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.label}>{props.label}</label>
      <input
        id={props.label}
        onChange={props.onChange}
        value={props.value}
        type={props.type}
        className={`${props.className} w-full text-gray-900 rounded-sm outline-none bg-purple-200 pl-2 md:py-1`}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
