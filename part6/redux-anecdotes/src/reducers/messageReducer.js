const initialState = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MESSAGE":
      return action.message;
    case "REMOVE_MESSAGE":
      return "";
    default:
      return state;
  }
};

// Actions Creators
export const messageCreator = (message, delay) => {
  return (dispatch) => {
    dispatch({ type: "SHOW_MESSAGE", message });
    setTimeout(() => {
      dispatch({ type: "REMOVE_MESSAGE" });
    }, delay);
  };
};

export default reducer;
