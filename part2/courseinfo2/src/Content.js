import React from "react";
import Part from "./Part";

const Content = ({ content }) => {
  return (
    <>
      {content.map(item => (
        <Part name={item.name} exercises={item.exercises} key={item.id} />
      ))}
    </>
  );
};

export default Content;
