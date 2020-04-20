import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./App.css";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import AddBlog from "./components/AddBlog";
import blogService from "./services/blogs";
import { messageCreator } from "./reducers/messageReducer";
import { saveUser, loginUser, logoutUser } from "./reducers/userReducer";
import {
  getBlogs,
  newBlog,
  addBlogLikes,
  deleteBlog,
} from "./reducers/blogReducer";
import Users from "./components/Users";
import User from "./components/User";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const match = useRouteMatch("/users/:id");
  const userMatch = match
    ? blogs.filter((blog) => blog.user.id === match.params.id)
    : null;
  console.log(userMatch);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      blogService.setToken(loggedUser.token);
      dispatch(saveUser(loggedUser));
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(
        loginUser({
          username,
          password,
        })
      );
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(messageCreator("error", "Wrong credentials", false));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
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
      dispatch(addBlogLikes(blog, id));
    } catch (error) {
      dispatch(messageCreator("error", "Unable to add like"));
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        dispatch(deleteBlog(id));
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
        handleDeleteBlog={handleDeleteBlog}
      />
    ));
  };

  return (
    <div>
      <h2>Blogs</h2>
      {message && <div className={message.status}>{message.content}</div>}

      {user !== null ? (
        <div>
          <div>Logged in as {user.username}</div> <div>{renderLogout()}</div>
        </div>
      ) : (
        loginForm()
      )}

      <Switch>
        <Route path="/users/:id">
          {match && <User userBlogs={userMatch} />}
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          {user && (
            <Togglable buttonLabel="Add Blog">
              <AddBlog createBlog={createBlog} />
            </Togglable>
          )}
          {renderBlogs()}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
