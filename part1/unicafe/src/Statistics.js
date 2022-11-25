import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const goodScore = good * 1;
  const neutralScore = neutral * 0;
  const badScore = bad * -1;

  const total = goodScore + neutralScore + badScore;
  const all = good + neutral + bad;

  const average = total / all;
  const positive = good / all;

  const content = (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positive} />
        </tbody>
      </table>
    </>
  );

  return (
    <>
      <h2>Statistics</h2>
      {good || neutral || bad ? content : <p>No Feedback given</p>}
    </>
  );
};

export default Statistics;
