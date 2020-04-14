const reducer = (state = "", action) => {
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

export const showMessage = (message) => {
  return {
    type: "SHOW_MESSAGE",
    message,
  };
};

export const removeMessage = () => {
  return {
    type: "REMOVE_MESSAGE",
  };
};

export default reducer;
