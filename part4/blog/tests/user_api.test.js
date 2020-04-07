const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");

describe("when there is initially one user at db", () => {
	beforeEach(async () => {
		await User.deleteMany({});
		const passwordHash = await bcrypt.hash("hashsecret", 10);
		const user = new User({ username: "foobar", passwordHash });
		await user.save();
	});

	test("creation succeeds with a fresh username", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "jez1",
			name: "jeremy",
			password: "123456",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		expect(usernames).toContain(newUser.username);
	});

	test("no user added when username below 3 characters", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "ab",
			name: "abba",
			password: "123456",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});

	test("no user added when password below 3 characters", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "abba",
			name: "abba",
			password: "12",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});
});

test("no user added when username is already taken", async () => {
	const usersAtStart = await helper.usersInDb();

	const newUser = {
		username: "foobar",
		name: "abba",
		password: "123456",
	};

	await api
		.post("/api/users")
		.send(newUser)
		.expect(400)
		.expect("Content-Type", /application\/json/);

	const usersAtEnd = await helper.usersInDb();
	expect(usersAtEnd.length).toBe(usersAtStart.length);
});

afterAll(() => {
	mongoose.connection.close();
});
