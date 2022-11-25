import { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodHandler = () => {
    setGood(prevState => prevState + 1);
  };
  const neutralHandler = () => {
    setNeutral(prevState => prevState + 1);
  };
  const badHandler = () => {
    setBad(prevState => prevState + 1);
  };
  return (
    <>
      <h1>Give feedback</h1>
      <Button name="good" onclick={goodHandler} />
      <Button name="neutral" onclick={neutralHandler} />
      <Button name="bad" onclick={badHandler} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
