const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
	const users = await User.find({}).populate("blogs", {
		title: 1,
		author: 1,
		url: 1,
		id: 1,
	});
	response.json(users);
});

usersRouter.post("/", async (request, response) => {
	const body = request.body;
	const saltRounds = 10;
	if (!(body.username && body.password)) {
		return response.status(400).json({
			error: "no username or password entered",
		});
	}
	if (body.username.length < 3) {
		return response.status(400).json({
			error: "username needs to be more than 3 characters long",
		});
	}

	if (body.password.length < 3) {
		return response.status(400).json({
			error: "password needs to be more than 3 characters long",
		});
	}

	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	});

	const savedUser = await user.save();
	response.json(savedUser);
});

module.exports = usersRouter;
