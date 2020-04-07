const User = require("../models/user");

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

module.exports = {
	initialBlogs,
	usersInDb,
};
