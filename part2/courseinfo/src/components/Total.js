import React from "react";

const Total = props => {
  const exercises = props.parts.reduce((curr, val) => {
    return curr + val.exercises;
  }, 0);
  return <p>total of {exercises} exercises</p>;
};

export default Total;
