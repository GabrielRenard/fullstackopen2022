import React from "react";

const Button = props => {
  return (
    <button
      className={`${props.className} ml-4 glass-card rounded-full px-2`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
