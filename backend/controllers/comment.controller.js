const db = require('../models');
const Comment = db.comments;
const User = db.users;
const auth = require('../middleware/auth');

const CONTENT_LIMIT = 2;

exports.createComment = (req, res) => {
  var content = req.body.content;

  if (content == null) {
    return res.status(400).json({ error: 'missing parameters' });
  }

  if (content.length <= CONTENT_LIMIT) {
    return res.status(400).json({ error: 'invalid parameters' });
  }

  const comment = {
    content: req.body.content,
    messageId: req.params.id,
    userId: res.locals.user,
  };
  console.log(comment);
  Comment.create(comment)
    .then(() => res.status(201).json({ message: 'Comment created' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.findAllCommentsOfOneMessage = (req, res) => {
  Comment.findAll({
    where: { messageId: req.params.id },
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then(function (comments) {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ error: 'No comments found' });
      }
    })
    .catch(function (err) {
      res.status(500).json({ error: 'No message with a comment found' });
    });
};

exports.findAllComments = (req, res) => {
  Comment.findAll({
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then(function (comments) {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ error: 'No comments found' });
      }
    })
    .catch(function (err) {
      res.status(500).json({ error: 'No message with a comment found' });
    });
};

exports.findOne = (req, res) => {
  Comment.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then(function (comment) {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ error: 'No comments found' });
      }
    })
    .catch(function (err) {
      res.status(404).json({ error: 'No message found' });
    });
};

exports.modifyComment = (req, res) => {
  var content = req.body.content;

  if (content == null) {
    return res.status(400).json({ error: 'missing parameters' });
  }

  if (content.length <= CONTENT_LIMIT) {
    return res.status(400).json({ error: 'invalid parameters' });
  }
  Comment.findOne({
    where: { id: req.params.id },
  })
    .then((comment) => {
      if (res.locals.user === comment.userId || res.locals.user === 1) {
        comment
          .update(req.body)
          .then(() => res.status(200).json({ message: 'Comment updated !' }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(401).json({ error: 'You do not have the required authorization !' });
      }
    })
    .catch((error) => res.status(400).json({ error: 'No comment found' }));
};

exports.deleteOne = (req, res) => {
  Comment.findOne({
    where: { id: req.params.id },
  })
    .then((comment) => {
      if (res.locals.user === comment.userId || res.locals.user === 1) {
        comment
          .destroy({
            where: { id: req.params.id },
          })
          .then(() => res.status(200).json({ message: 'Comment deleted !' }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(400).json({ error: 'You can only delete your comment' });
      }
    })
    .catch((error) => res.status(404).json({ error: 'No comment found' }));
};
