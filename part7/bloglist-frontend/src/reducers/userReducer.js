import loginService from "../services/login";
import blogService from "../services/blogs";

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_USER":
      return action.user;
    case "LOGOUT_USER":
      return null;
    default:
      return state;
  }
};

export const saveUser = (user) => {
  return (dispatch) => {
    dispatch({ type: "SAVE_USER", user });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: "LOGOUT_USER" });
  };
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(saveUser(user));
  };
};

export default reducer;
