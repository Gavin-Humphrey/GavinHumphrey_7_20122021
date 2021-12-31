const db = require("../models"); // models path 
const Message = db.message;

// POST/Create a Message
exports.createMessage = (req, res, next) => {
	console.log("createMessage");

	console.log(req.user);
	console.log(req.body.content);

	let picture = "";
	if (req.file) {
		picture = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
	}
	const message = new Message({
		UserId: req.user,
		message: req.body.content,
		imageUrl: picture,
	});

	message
		.save()
		.then(() => res.status(201).json({ message: "Message posted" }))
		.catch((error) => res.status(400).json({ error }));
};

// GET all messages
exports.getAllMessages = (req, res, next) => {
	console.log("getAllMessages");

	Message.findAll({
		order: [['createdAt', 'DESC' ]] ,
		include: [{
				model: User,
				attributes: [ 'name' ]
		}],

	})
		.then((results) => {
			res.status(200).json({ results });
		})
		.catch((error) => res.status(400).json({ error }));
};

// GET a single message
exports.getMessage = (req, res, next) => {
	console.log("getMessage");

	Message.findOne({ where: { id: req.params.id } })
		.then((message) => {
			res.status(200).json(message);
		})
		.catch((error) => res.status(404).json({ error }));
};

// GET all messages for one user
exports.getAllMessagesForOne = (req, res, next) => {
	console.log("getAllMessagesForOne");

	Message.findAll({ where: { UserId: req.params.id } })
		.then((messages) => {
			res.status(200).json({ messages });
		})
		.catch((error) => res.status(404).json({ error }));
};

// DELete a message
exports.deleteMessage = (req, res, next) => {
	console.log("deleteMessage");

	const paramId = parseInt(req.params.id);
	console.log(req.user);
	console.log(paramId);

	Message.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.status(200).json({ message: "Message deleted" });
		})
		.catch((error) => res.status(400).json({ error }));
};