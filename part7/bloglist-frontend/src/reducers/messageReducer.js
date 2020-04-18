const initialState = { status: "", content: "", timeOut: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MESSAGE":
      if (state.timeOut) {
        clearInterval(state.timeOut);
      }
      return {
        status: action.status,
        content: action.content,
        timeOut: action.timeOut,
      };
    case "REMOVE_MESSAGE":
      return { status: "", content: "", timeOut: null };
    default:
      return state;
  }
};

export const messageCreator = (status, content, delay = 5000) => {
  return (dispatch) => {
    const timeOut = setTimeout(() => {
      dispatch({ type: "REMOVE_MESSAGE" });
    }, delay);
    dispatch({ type: "SHOW_MESSAGE", status, content, timeOut });
  };
};

export default reducer;
