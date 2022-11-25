import React from "react";

const Total = ({ course }) => {
  const sumOfExercises =
    course.parts[0].exercises +
    course.parts[1].exercises +
    course.parts[2].exercises;

  return (
    <div>
      <p>
        <b>{`Total of ${sumOfExercises} exercises`}</b>
      </p>
    </div>
  );
};

export default Total;
