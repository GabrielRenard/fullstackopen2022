import React from "react";

const Total = ({ course }) => {
  const sumOfExercises = course.parts.reduce(
    (acc, curr) => acc + curr.exercises,
    0
  );

  console.log(sumOfExercises);

  return (
    <div>
      <p>
        <b>{`Total of ${sumOfExercises} exercises`}</b>
      </p>
    </div>
  );
};

export default Total;
