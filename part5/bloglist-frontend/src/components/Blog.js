import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
            <button>Like</button>
          </div>
          <div>{blog.url}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
