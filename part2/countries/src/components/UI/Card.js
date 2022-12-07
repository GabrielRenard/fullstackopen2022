import React from "react";

const Card = props => {
  return (
    <div
      className={`${props.className} break-words overflow-auto self-center items-center w-11/12 rounded-xl glass-card p-5 text-slate-900 sm:w-6/12 md:w:5/12 lg:w-4/12`}
    >
      {props.children}
    </div>
  );
};

export default Card;
