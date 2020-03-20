import React, { useState } from "react";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVotes = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };

  const bestAnecdote = votes.indexOf(Math.max(...votes));
  const bestTotal = Math.max(...votes);
  console.log(bestTotal);
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <h2>Anecdote with the most votes</h2>
      <div>{anecdotes[bestAnecdote]}</div>
      <div>has {bestTotal} votes</div>
    </div>
  );
};

export default App;
