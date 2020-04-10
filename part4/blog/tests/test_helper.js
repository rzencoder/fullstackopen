const User = require("../models/user");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const initialBlogs = [
	{
		title: "cars",
		author: "Katie",
		url: "http://localhost:3000",
		likes: 3,
	},
	{
		title: "phones",
		author: "Gary",
		url: "http://localhost:3001",
		likes: 7,
	},
];

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

const getAuthToken = async (username, password) => {
	try {
		await User.insertMany([
			{
				username,
				name: "Testname",
				passwordHash: await bcrypt.hash(password, 10),
			},
		]);
	} catch (error) {}
	const response = await api
		.post("/api/login")
		.send({ username, password })
		.expect(200);

	return response.body.token;
};

const setInvalidToken = (request, token) => {
	token = "InvalidToken";
	return request.set("Authorization", "Bearer " + token);
};

module.exports = {
	initialBlogs,
	usersInDb,
	getAuthToken,
	setInvalidToken,
};
