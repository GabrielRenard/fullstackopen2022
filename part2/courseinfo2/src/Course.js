import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ header, content, total }) => {
  return (
    <>
      <Header header={header} />
      <Content content={content} />
      <Total total={total} />
    </>
  );
};

export default Course;
