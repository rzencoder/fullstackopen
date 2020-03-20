import React from "react";
import Statistic from "./Statistic";

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const average = (good + bad * -1) / all;
  const positive = good / all;
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic text="good:" value={good}></Statistic>
          <Statistic text="bad:" value={bad}></Statistic>
          <Statistic text="neutral:" value={neutral}></Statistic>
          <Statistic text="all:" value={all}></Statistic>
          <Statistic text="average:" value={average}></Statistic>
          <Statistic text="positive:" value={positive}></Statistic>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
