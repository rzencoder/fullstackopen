const initialState = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER":
      return action.string;
    default:
      return state;
  }
};

// Actions Creators
export const filterAnecdotes = (string) => {
  return {
    type: "FILTER",
    string,
  };
};

export default reducer;
