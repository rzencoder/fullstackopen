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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
