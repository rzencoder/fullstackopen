import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import AddBlog from "./components/AddBlog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { messageCreator } from "./reducers/messageReducer";
import { getBlogs, newBlog } from "./reducers/blogReducer";
import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(messageCreator("error", "Wrong credentials", false));
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(messageCreator("ok", "Logout successful"));
  };

  const createBlog = async (blog) => {
    try {
      dispatch(newBlog(blog));
      dispatch(messageCreator("ok", "Blog added"));
    } catch (error) {
      dispatch(messageCreator("error", "Unable to add blog"));
    }
  };

  const updateLikes = async (blog, id) => {
    try {
      const updatedBlog = await blogService.update(blog, id);
      const newBlogs = [...blogs];
      const index = newBlogs.findIndex((val) => val.id === blog.id);
      newBlogs[index] = updatedBlog;
      // setBlogs(newBlogs);
    } catch (error) {
      dispatch(messageCreator("error", "Unable to add like"));
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await blogService.deleteBlog(id);
        const newBlogs = [...blogs];
        const index = newBlogs.findIndex((val) => val.id === id);
        newBlogs.splice(index, 1);
        // setBlogs(newBlogs);
      } catch (error) {
        dispatch(messageCreator("error", "Unable to add like"));
      }
    }
  };

  const loginForm = () => (
    <form id="loginForm" onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id="loginUsername"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          id="loginPassword"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const renderLogout = () => (
    <div>
      <button name="Logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );

  const renderBlogs = () => {
    const sortedBlogs = [...blogs].sort((a, b) => (a.likes < b.likes ? 1 : -1));
    return sortedBlogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        updateLikes={updateLikes}
        user={user}
        handleDeleteBlog={handleDeleteBlog}
      />
    ));
  };

  return (
    <div>
      {message && <div className={message.status}>{message.content}</div>}
      {user === null ? loginForm() : renderLogout()}
      {user && (
        <div>
          <div>Logged in as {user.username}</div>
          <Togglable buttonLabel="Add Blog">
            <AddBlog createBlog={createBlog} />
          </Togglable>
        </div>
      )}
      <h2>blogs</h2>
      {renderBlogs()}
    </div>
  );
};

export default App;
