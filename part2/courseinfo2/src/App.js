import Course from "./Course";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  //   console.log(courses[0].parts);
  //   console.log(courses[1].parts);

  return (
    <>
      <h1>Web development curriculum</h1>
      <Course
        header={courses[0].name}
        content={courses[0].parts}
        total={courses[0].parts}
      />
      <Course
        header={courses[1].name}
        content={courses[1].parts}
        total={courses[1].parts}
      />
    </>
  );
};

export default App;
