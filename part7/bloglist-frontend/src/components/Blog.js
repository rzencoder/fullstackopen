import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Blog = ({ blog, updateLikes, handleDeleteBlog }) => {
  const user = useSelector((state) => state.user);

  const increaseLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateLikes(updatedBlog, blog.id);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
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

  if (!blog) return null;
  return (
    <div className="blog_container" style={blogStyle}>
      <div style={{ display: "flex" }}>
        <h2 className="blog_title">
          {blog.title} - {blog.author}
        </h2>
      </div>
      <div className="blog_url">{blog.url}</div>
      <div style={{ display: "flex" }}>
        <div id="blogLikes">{blog.likes} likes</div>
        <button className="like_button" onClick={increaseLikes}>
          Like
        </button>
      </div>
      <div>Added by {blog.user.username}</div>
      {renderDeleteButton()}
      <h3>Comments</h3>
      <ul>
        {blog.comments.length &&
          blog.comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
      </ul>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
};

export default Blog;
