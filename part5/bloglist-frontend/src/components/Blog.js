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
    if (!user) return;
    return (
      user.username === blog.user.username && (
        <button id="deleteBlogButton" onClick={() => handleDeleteBlog(blog.id)}>
          Delete
        </button>
      )
    );
  };

  return (
    <div className="blog_container" style={blogStyle}>
      <div style={{ display: "flex" }}>
        <div className="blog_title">{blog.title}</div>
        <button
          className="show_all_button"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Hide" : "Show"}
        </button>
      </div>
      <div className="blog_author">{blog.author}</div>
      {showAll && (
        <>
          <div style={{ display: "flex" }}>
            <div id="blogLikes">{blog.likes}</div>
            <button className="like_button" onClick={increaseLikes}>
              Like
            </button>
          </div>
          <div className="blog_url">{blog.url}</div>
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
