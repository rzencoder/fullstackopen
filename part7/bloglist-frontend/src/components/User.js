import React from "react";
import { Link } from "react-router-dom";

const User = ({ userBlogs }) => {
  if (!userBlogs.length) return null;
  return (
    <div>
      <h2>{userBlogs[0].user.username}</h2>
      <h4>Added Blogs</h4>
      <ul>
        {userBlogs.map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <li>{blog.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default User;
