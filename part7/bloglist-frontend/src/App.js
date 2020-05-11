import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
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
import {
  Container,
  TextField,
  Button,
  AppBar,
  Toolbar,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableHead,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const userMatch = useRouteMatch("/users/:id");
  const userMatchArray = userMatch
    ? blogs.filter((blog) => blog.user.id === userMatch.params.id)
    : null;

  const blogMatch = useRouteMatch("/blogs/:id");
  const blogMatchObject = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

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
        <TextField
          type="text"
          id="loginUsername"
          label="Username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          type="password"
          value={password}
          id="loginPassword"
          name="Password"
          label="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <div>
          <Button type="submit">Login</Button>
        </div>
      </div>
    </form>
  );

  const navStyle = {
    background: "#dddddd",
    display: "flex",
    padding: "5px",
    marginBottom: "10px",
  };
  const renderBlogs = () => {
    const sortedBlogs = [...blogs].sort((a, b) => (a.likes < b.likes ? 1 : -1));
    return sortedBlogs.map((blog) => (
      <TableRow key={blog.id}>
        <TableCell>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </TableCell>
        <TableCell>{blog.author}</TableCell>
      </TableRow>
    ));
  };

  return (
    <Container>
      <AppBar style={navStyle} position="static">
        <Toolbar>
          <Button to="/" color="inherit" component={Link}>
            <div>Blogs</div>
          </Button>
          <Button to="/users" color="inherit" component={Link}>
            <div>Users</div>
          </Button>
          {user !== null && (
            <Button name="Logout" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {message.content.length ? (
        <Alert className={message.status}>{message.content}</Alert>
      ) : (
        ""
      )}
      {!user && loginForm()}

      <Switch>
        <Route path="/blogs/:id">
          {blogMatch && (
            <Blog
              blog={blogMatchObject}
              updateLikes={updateLikes}
              handleDeleteBlog={handleDeleteBlog}
            />
          )}
        </Route>
        <Route path="/users/:id">
          {userMatch && <User userBlogs={userMatchArray} />}
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <h2>Blogs</h2>
          {user && (
            <Togglable buttonLabel="Add Blog">
              <AddBlog createBlog={createBlog} />
            </Togglable>
          )}
          <TableContainer>
            <Table component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderBlogs()}</TableBody>
            </Table>
          </TableContainer>
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
