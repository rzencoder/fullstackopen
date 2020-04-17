const initialState = { message: "", timeOut: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MESSAGE":
      if (state.timeOut) {
        clearInterval(state.timeOut);
      }
      return { message: action.message, timeOut: action.timeOut };
    case "REMOVE_MESSAGE":
      return { message: "", timeOut: null };
    default:
      return state;
  }
};

// Actions Creators
export const messageCreator = (message, delay) => {
  return (dispatch) => {
    const timeOut = setTimeout(() => {
      dispatch({ type: "REMOVE_MESSAGE" });
    }, delay);
    dispatch({ type: "SHOW_MESSAGE", message, timeOut });
  };
};

export default reducer;
