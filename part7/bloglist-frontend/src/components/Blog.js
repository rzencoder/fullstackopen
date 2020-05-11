import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../reducers/blogReducer";
import { TextField, Button } from "@material-ui/core";

const Blog = ({ blog, updateLikes, handleDeleteBlog }) => {
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const increaseLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateLikes(updatedBlog, blog.id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ comment }, blog.id));
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
        <Button id="deleteBlogButton" onClick={() => handleDeleteBlog(blog.id)}>
          Delete
        </Button>
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
        <Button className="like_button" onClick={increaseLikes}>
          Like
        </Button>
      </div>
      <div>Added by {blog.user.username}</div>
      {renderDeleteButton()}
      <h2>Comments</h2>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <div>
        <h4>Add Comment</h4>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div>
            <Button type="submit">Submit Comment</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
};

export default Blog;
