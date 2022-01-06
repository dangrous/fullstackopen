/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

function Header(props) {
  return <h1>{props.name}</h1>;
}

function Content(props) {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  );
}

function Part(props) {
  return (
    <p>
      {props.part.name}
      {' '}
      {props.part.exercises}
    </p>
  );
}

function Total(props) {
  return (
    <p>
      Number of exercises
      {' '}
      {props.parts[0].exercises + 
      props.parts[1].exercises +
      props.parts[2].exercises}
    </p>
  );
}

export default App;
