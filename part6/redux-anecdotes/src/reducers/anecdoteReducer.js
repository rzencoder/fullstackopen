import anecdoteService from "../services/anecdotes";

export const getId = () => (100000 * Math.random()).toFixed(0);

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
