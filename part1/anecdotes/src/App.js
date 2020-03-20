import React, { useState } from "react";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <button onClick={handleClick}>next anecdote</button>
    </div>
  );
};

export default App;
