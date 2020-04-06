const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("all blogs returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("unique identifier of each blog is called id", async () => {
  const response = await api.get("/api/blogs");
  const blog = response.body[0];
  expect(blog.id).toBeDefined();
});

test("new blog is added to database when post request", async () => {
  const newBlog = {
    title: "planes",
    author: "Megan",
    url: "http://localhost:3002",
    likes: 11,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const titles = response.body.map((blog) => blog.title);
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain(newBlog.title);
});

test("likes property returns 0 if not added to post body", async () => {
  const newBlog = {
    title: "trains",
    author: "Charlie",
    url: "http://localhost:3003",
  };

  await api.post("/api/blogs").send(newBlog);

  const response = await api.get("/api/blogs");
  const blog = response.body.find((val) => val.title === newBlog.title);
  expect(blog.likes).toBe(0);
});

test("return 400 error if title and url are missing", async () => {
  const newBlog = {
    author: "Lydia",
    likes: 2,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
