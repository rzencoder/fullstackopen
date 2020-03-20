import React, { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleBad = () => setBad(bad + 1);
  const handleNeutral = () => setNeutral(neutral + 1);

  const all = good + bad + neutral;
  const average = (good + bad * -1) / all;
  const positive = good / all;

  return (
    <div>
      <h2>Give Feedback</h2>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
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

export default App;
