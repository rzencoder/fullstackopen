import React from "react";
import { useSelector } from "react-redux";

const User = ({ userBlogs }) => {
  if (!userBlogs.length) return null;
  return (
    <div>
      <h2>{userBlogs[0].user.username}</h2>
      <h4>Added Blogs</h4>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
