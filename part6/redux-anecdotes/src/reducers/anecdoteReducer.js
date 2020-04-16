import anecdoteService from "../services/anecdotes";

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

export const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_VOTE":
      const anecdoteIndex = state.findIndex((el) => el.id === action.id);
      const newState = [...state];
      newState[anecdoteIndex].votes += 1;
      return newState;

    case "NEW_ANECDOTE":
      return state.concat(action.data);

    case "INIT_ANECDOTES":
      return action.data;

    default:
      return state;
  }
};

// Action Creators
export const addVote = (anecdote) => {
  return async (dispatch) => {
    const data = await anecdoteService.addVote(anecdote);
    dispatch({ type: "ADD_VOTE", id: data.id });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.createNew(content);
    dispatch({ type: "NEW_ANECDOTE", data });
  };
};

export const initializeAnecdotes = (data) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default reducer;
