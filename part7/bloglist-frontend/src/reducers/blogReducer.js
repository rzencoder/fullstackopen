import blogService from "../services/blogs";

const initialState = [];

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "GET_BLOGS":
      return action.data;
    case "NEW_BLOG":
      return [...state, action.data];
    default:
      return state;
  }
};

export const newBlog = (content) => {
  return async (dispatch) => {
    const data = await blogService.create(content);
    dispatch({ type: "NEW_BLOG", data });
  };
};

export const getBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll();
    dispatch({
      type: "GET_BLOGS",
      data,
    });
  };
};

export default reducer;
