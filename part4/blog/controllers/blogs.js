const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
	if (!request.body.title && !request.body.url) {
		return response.status(400).end();
	}
	const users = await User.find({});
	const user = users[0];
	const blog = new Blog({ ...request.body, user: user.id });
	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();
	response.json(savedBlog.toJSON());
});

blogsRouter.put("/:id", async (request, response) => {
	const a = await Blog.findByIdAndUpdate(request.params.id, request.body);
	response.status(204).end();
});

blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

module.exports = blogsRouter;
