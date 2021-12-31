const db = require("../models"); // models path 
const Comment = db.comment;

// POST/Create a Comment
exports.createComment = (req, res, next) => {
	console.log("createComment");

	const comment = new Comment({
		UserId: req.user,
		MessageId: req.params.id,
		comment: req.body.content,
	});

	console.log(req.body);

	comment
		.save()
		.then(() => res.status(201).json({ message: "Comment posted" }))
		.catch((error) => res.status(400).json({ error }));
};

// GET All comments for a single message
exports.getAllComments = (req, res, next) => {
	console.log("getAllComments");

	Comment.findAll({
		where: {
			MessageId: req.params.id,
		},
		order: [['createdAt' ]] ,
		include: [{
				model: User,
				attributes: [ 'name' ]
		}],
	})
		.then((listComment) => res.status(200).json(listComment))
		.catch((error) => res.status(404).json({ error }));
};

// DELETE a comment
exports.deleteComment = (req, res, next) => {
	console.log("deleteComment");

	console.log(req.user);
	console.log(req.params.id);

	User.findOne({ where: { id: req.user } })
		.then((user) => {
			if (user.isAdmin) {
				// If the request is from admin
				Comment.destroy({ where: { id: req.params.id } })
					.then(() => res.status(200).json({ message: "Comment deleted !" }))
					.catch((error) => res.status(400).json({ error }));
			} else {
				// If not, verify if it's from a user
				Comment.findOne({ where: { id: req.params.id } })
					.then((comment) => {
						if (comment.UserId === req.user) {
							Comment.destroy({ where: { id: req.params.id } })
								.then(() => res.status(200).json({ message: "Comment deleted !" }))
								.catch((error) => res.status(400).json({ error }));
						}
					})
					.catch((error) => res.status(404).json({ error }));
			}
		})
		.catch((error) => res.status(404).json({ error }));
};