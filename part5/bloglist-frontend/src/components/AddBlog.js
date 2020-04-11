import React from "react";

const AddBlog = ({
  handleAddBlog,
  author,
  title,
  url,
  setAuthor,
  setTitle,
  setUrl,
}) => {
  return (
    <div>
      <div>Add New Blog</div>
      <form onSubmit={handleAddBlog}>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
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
