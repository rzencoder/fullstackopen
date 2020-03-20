import React from "react";

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const average = (good + bad * -1) / all;
  const positive = good / all;
  return (
    <div>
      <h2>Statistics</h2>
      <p>good: {good}</p>
      <p>bad: {bad}</p>
      <p>neutral: {neutral}</p>
      <p>all: {all}</p>
      <p>average: {average}</p>
      <p>positive: {positive}%</p>
    </div>
  );
};

export default Statistics;
