import React from "react";

const Button = props => {
  return <button onClick={props.onclick}>{props.name}</button>;
};

export default Button;
