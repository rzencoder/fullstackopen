const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
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

	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" });
	}
	const user = await User.findById(decodedToken.id);

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
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" });
	}
	const user = await User.findById(decodedToken.id);
	const blog = await Blog.findById(request.params.id);
	if (blog.user.toString() === user.id.toString()) {
		await blog.remove();
		response.status(204).end();
	} else {
		response.status(403).json({ error: "not authorized to delete this blog" });
	}
});

module.exports = blogsRouter;
