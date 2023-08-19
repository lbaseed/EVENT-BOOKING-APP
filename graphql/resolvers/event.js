const Event = require("../../models/event");
const { transformEvent } = require("./merge");
const User = require("../../models/user");

module.exports = {
	events: async () => {
		try {
			const events = await Event.find();
			return events.map((event) => {
				return transformEvent(event);
			});
		} catch (err) {
			throw err;
		}
	},
	createEvent: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthenticated");
		}
		try {
			const event = new Event({
				title: args.eventInput.title,
				description: args.eventInput.description,
				price: +args.eventInput.price,
				date: new Date(args.eventInput.date),
				creator: req.userId,
			});

			let createdEvent;
			const result = await event.save();

			createdEvent = transformEvent(result);

			const user = await User.findById(req.userId);

			if (!user) {
				throw new Error("User not found");
			}

			user.createdEvents.push(createdEvent);
			await user.save();

			return createdEvent;
		} catch (err) {
			throw err;
		}
	},
};
