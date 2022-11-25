import React from "react";

const Statistics = ({ good, neutral, bad }) => {
  const goodScore = good * 1;
  const neutralScore = neutral * 0;
  const badScore = bad * -1;
  const total = goodScore + neutralScore + badScore;
  const all = good + neutral + bad;

  return (
    <>
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>Average {total / all}</p>
      <p>Positive {(good / all) * 100} %</p>
    </>
  );
};

export default Statistics;
