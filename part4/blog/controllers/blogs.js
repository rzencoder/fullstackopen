const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
	if (!request.body.title && !request.body.url) {
		return response.status(400).end();
	}
	const blog = new Blog(request.body);
	const result = await blog.save();
	response.status(200).json(result);
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
