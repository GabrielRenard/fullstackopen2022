import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

function App() {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const totalNumExercises = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercise1={exercises1}
        exercise2={exercises2}
        exercise3={exercises3}
      />
      <Total totalExercises={totalNumExercises} />
    </div>
  );
}

export default App;
