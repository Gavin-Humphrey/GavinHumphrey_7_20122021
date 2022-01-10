const db = require('../models');
const Like = db.likes;
const User = db.users;
const auth = require('../middleware/auth');

exports.likeOneMessage = (req, res) => {
  Like.findOne({
    where: { userId: res.locals.user, messageId: req.params.id },
  })
    .then((existingLike) => {
      if (existingLike) {
        existingLike.destroy();
        res.status(200).json({ like: false });
      } else {
        Like.create({ userId: res.locals.user, messageId: req.params.id });
        res.status(201).json({ like: true });
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.findAllLikesOfOneMessage = (req, res) => {
  Like.findAll({
    where: { messageId: req.params.id },
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then(function (likes) {
      if (likes) {
        res.status(200).json(likes);
      } else {
        res.status(404).json({ error: 'No likes found' });
      }
    })
    .catch(function (err) {
      res.status(404).json({ error: 'No message with a like found' });
    });
};
