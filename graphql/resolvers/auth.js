const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { events } = require("./merge");

module.exports = {
	users: () => {
		return User.find()
			.then((users) => {
				return users.map((user) => {
					return {
						...user._doc,
						createdEvents: events.bind(this, user._doc.createdEvents),
					};
				});
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	},
	createUser: (args) => {
		return User.findOne({ email: args.userInput.email }).then((user) => {
			if (user) {
				throw new Error("User exists already");
			}

			return bcrypt
				.hash(args.userInput.password, 12)
				.then((hashedPassword) => {
					const user = new User({
						email: args.userInput.email,
						password: hashedPassword,
					});
					return user.save();
				})
				.then((result) => {
					return { ...result._doc, password: "hidden" };
				})
				.catch((err) => {
					throw err;
				});
		});
	},
	login: async ({ email, password }) => {
		try {
			const user = await User.findOne({ email: email });

			if (!user) {
				throw new Error("user does not exist");
			}

			const isValid = await bcrypt.compare(password, user.password);

			if (!isValid) {
				throw new Error("user does not exist");
			}

			const token = jwt.sign(
				{
					userId: user.id,
					email: user.email,
				},
				"superscretekey",
				{
					expiresIn: "1h",
				}
			);

			return {
				userId: user.id,
				token: token,
				tokenExp: 1,
			};
		} catch (err) {
			throw err;
		}
	},
};
