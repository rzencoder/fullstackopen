import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateLikes, user, handleDeleteBlog }) => {
  const [showAll, setShowAll] = useState(false);

  const increaseLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateLikes(updatedBlog, blog.id);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const renderDeleteButton = () => {
    return (
      user.username === blog.user.username && (
        <button onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
      )
    );
  };

  return (
    <div style={blogStyle}>
      <div style={{ display: "flex" }}>
        <div>{blog.title}</div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Hide" : "Show"}
        </button>
      </div>
      {showAll && (
        <>
          <div>{blog.author}</div>
          <div style={{ display: "flex" }}>
            <div>{blog.likes}</div>
            <button onClick={increaseLikes}>Like</button>
          </div>
          <div>{blog.url}</div>
          {renderDeleteButton()}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
};

export default Blog;
