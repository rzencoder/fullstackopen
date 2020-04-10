const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

const testUsername = "testuser";
const testPassword = "testpassword";
let testToken;

beforeAll(async () => {
	testToken = await helper.getAuthToken(testUsername, testPassword);
});

const authApi = (request, token) => {
	token = token || testToken;
	return request.set("Authorization", "Bearer " + token);
};

beforeEach(async () => {
	await Blog.deleteMany({});
	const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObjects.map((blog) => blog.save());
	await Promise.all(promiseArray);
});

describe("fetching blogs from database", () => {
	test("all blogs returned", async () => {
		const response = await api.get("/api/blogs");
		expect(response.body).toHaveLength(helper.initialBlogs.length);
	});

	test("unique identifier of each blog is called id", async () => {
		const response = await api.get("/api/blogs");
		const blog = response.body[0];
		expect(blog.id).toBeDefined();
	});
});

describe("adding a new blog", () => {
	test("new blog is added to database when post request", async () => {
		const newBlog = {
			title: "planes",
			author: "Megan",
			url: "http://localhost:3002",
			likes: 11,
		};

		await authApi(api.post("/api/blogs"))
			.send(newBlog)
			.expect(200)
			.expect("Content-Type", /application\/json/);
		const response = await api.get("/api/blogs");
		const titles = response.body.map((blog) => blog.title);
		expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
		expect(titles).toContain(newBlog.title);
	});

	test("not permitted to add blog without valid token", async () => {
		const newBlog = {
			title: "planes",
			author: "Megan",
			url: "http://localhost:3002",
			likes: 11,
		};

		await helper
			.setInvalidToken(api.post("/api/blogs"))
			.send(newBlog)
			.expect(401);
	});

	test("likes property returns 0 if not added to post body", async () => {
		const newBlog = {
			title: "trains",
			author: "Charlie",
			url: "http://localhost:3003",
		};

		await authApi(api.post("/api/blogs")).send(newBlog);

		const response = await api.get("/api/blogs");
		const blog = response.body.find((val) => val.title === newBlog.title);
		expect(blog.likes).toBe(0);
	});

	test("return 400 error if title and url are missing from post", async () => {
		const newBlog = {
			author: "Lydia",
			likes: 2,
		};

		await authApi(api.post("/api/blogs")).send(newBlog).expect(400);
	});
});

describe("deletion of blog", () => {
	test("deleted blog is removed from database", async () => {
		const newBlog = {
			author: "Lydia",
			title: "motorbikes",
			likes: 2,
			url: "http://localhost:3005",
		};

		const response = await authApi(api.post("/api/blogs")).send(newBlog);
		const blogsBeforeDeletion = await api.get("/api/blogs");
		await authApi(api.delete(`/api/blogs/${response.body.id}`)).expect(204);
		const blogsAfterDeletion = await api.get("/api/blogs");
		expect(blogsBeforeDeletion.body.length).toBe(
			blogsAfterDeletion.body.length + 1
		);
	});
});

describe("update of blog", () => {
	test("updated blog is saved to the database", async () => {
		const update = { likes: 20 };
		const blogsBeforeUpdate = await api.get("/api/blogs");
		const blogToUpdate = blogsBeforeUpdate.body[0];
		await api.put(`/api/blogs/${blogToUpdate.id}`).send(update).expect(204);
		const blogsAfterUpdate = await api.get("/api/blogs");
		const updatedBlog = blogsAfterUpdate.body.filter(
			(blog) => blog.id === blogToUpdate.id
		);
		expect(updatedBlog[0].likes).toBe(update.likes);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
