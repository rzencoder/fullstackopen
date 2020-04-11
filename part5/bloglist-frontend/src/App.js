import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import AddBlog from "./components/AddBlog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const renderMessage = (status, content) => {
    setMessage({ status, content });
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

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
      renderMessage("error", "Wrong credentials");
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
    renderMessage("ok", "Logout successful");
  };

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);
      const newBlogs = blogs.concat(newBlog);
      setBlogs(newBlogs);
      renderMessage("ok", "Blog added");
    } catch (error) {
      renderMessage("error", "Unable to add blog");
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
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

  return (
    <div>
      {message && <div>{message.content}</div>}
      {user === null ? loginForm() : renderLogout()}
      {user && (
        <Togglable buttonLabel="Add Blog">
          <AddBlog createBlog={createBlog} />
        </Togglable>
      )}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
