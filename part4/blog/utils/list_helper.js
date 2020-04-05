const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs.length) return 0;
  if (blogs.length === 1) return blogs[0].likes;
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes;
  }, 0);
};

const favouriteBlog = (blogs) => {
  if (!blogs.length) return "no blogs submitted";
  if (blogs.title) return blogs;
  const favBlog = blogs.reduce((acc, val) => {
    return acc.likes > val.likes ? acc : val;
  });
  return favBlog;
};

const mostBlogs = (blogs) => {
  const totalMap = blogs.reduce((acc, x) => {
    if (!acc[x.author]) {
      acc[x.author] = 1;
      return acc;
    }
    acc[x.author] += 1;
    return acc;
  }, {});

  const keys = Object.keys(totalMap);
  const values = keys.map((x) => totalMap[x]);
  const results = keys.filter((x) => totalMap[x] === Math.max(...values));
  return { author: results[0], blogs: Math.max(...values) };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
};
