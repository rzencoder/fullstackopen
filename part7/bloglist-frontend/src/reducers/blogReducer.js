import blogService from "../services/blogs";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BLOGS":
      return action.data;
    case "NEW_BLOG":
      return [...state, action.data];
    case "ADD_LIKE":
      return state.map((blog) =>
        blog.id === action.data.id ? (blog = action.data) : blog
      );
    case "ADD_COMMENT":
      return state.map((blog) =>
        blog.id === action.data.id ? (blog = action.data) : blog
      );
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.id);
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

export const addBlogLikes = (blog, id) => {
  return async (dispatch) => {
    const data = await blogService.update(blog, id);
    dispatch({
      type: "ADD_LIKE",
      data,
    });
  };
};

export const addComment = (comment, id) => {
  return async (dispatch) => {
    const data = await blogService.addComment(comment, id);
    dispatch({
      type: "ADD_COMMENT",
      data,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch({ type: "DELETE_BLOG", id });
  };
};

export default reducer;
