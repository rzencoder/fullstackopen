import React, { useState } from "react";

const AddBlog = ({ createBlog }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBlog = async (event) => {
    event.preventDefault();
    createBlog({
      author,
      title,
      url,
    });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <div>Add New Blog</div>
      <form onSubmit={handleAddBlog}>
        <div>
          Author
          <input
            type="text"
            id="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Title
          <input
            type="text"
            id="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            id="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Submit Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
