import React from "react";

const Card = props => {
  return (
    <div className={`${props.className} self-center text-gray-900 `}>
      {props.children}
    </div>
  );
};

export default Card;
