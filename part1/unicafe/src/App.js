import { useState } from "react";
import Button from "./Button";

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

      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  );
}

export default App;
