import React from "react";
import { connect } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { messageCreator } from "../reducers/messageReducer";

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.addVote(anecdote);
    const message = `You voted for ${anecdote.content}`;
    props.messageCreator(message, 5000);
  };

  return (
    <div>
      {props.anecdotes
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

const mapStateToProps = (state) => {
  const anecdotes = state.anecdotes.filter((el) =>
    el.content.toLowerCase().includes(state.filter)
  );
  return {
    anecdotes,
  };
};

const mapDispatchToProps = { addVote, messageCreator };

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdotes;
