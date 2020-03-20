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

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
    </div>
  );
};

export default App;
