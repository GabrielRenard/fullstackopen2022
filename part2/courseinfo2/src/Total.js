import React from "react";

const Total = ({ total }) => {
  const sumOfExercises = total.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <div>
      <p>
        <b>{`Total of ${sumOfExercises} exercises`}</b>
      </p>
    </div>
  );
};

export default Total;
