import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { showMessage, removeMessage } from "../reducers/messageReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterString = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(addVote(anecdote));
    const message = `You voted for ${anecdote.content}`;
    dispatch(showMessage(message));
    setTimeout(() => {
      dispatch(removeMessage());
    }, 5000);
  };

  return (
    <div>
      {anecdotes
        .filter((el) => el.content.toLowerCase().includes(filterString))
        .sort((a, b) => (a.votes < b.votes ? 1 : -1))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
