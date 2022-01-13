const db = require('../models');
const Message = db.messages;
const User = db.users;
const auth = require('../middleware/auth');
const fs = require('fs');

const CONTENT_LIMIT = 4;

exports.createMessage = (req, res) => {
  var content = req.body.content;

  if (content == null) {
    return res.status(400).json({ error: 'Empty message' });
  }

  if (content.length <= CONTENT_LIMIT) {
    return res.status(400).json({ error: 'Length must be more than 4' });
  }

  let imageMessage = '';
  if (req.file) {
    imageMessage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }

  const message = {
    content: req.body.content,
    imageUrl: imageMessage,
    userId: res.locals.user,
  };
  Message.create(message)
    .then(() => res.status(201).json({ message: 'Message created' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.findAllMessages = (req, res) => {
  Message.findAll({
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then(function (messages) {
      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ error: 'No messages found' });
      }
    })
    .catch(function (err) {
      res.status(404).json({ error: 'No user found' });
    });
};

exports.findOne = (req, res) => {
  Message.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then(function (messages) {
      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ error: 'No messages found' });
      }
    })
    .catch(function (err) {
      res.status(404).json({ error: 'No user found' });
    });
};

//added
exports.modifyMessage = (req, res) => {
  var content = req.body.content;

  if (content == null) {
    return res.status(400).json({ error: 'missing parameters' });
  }

  if (content.length <= CONTENT_LIMIT) {
    return res.status(400).json({ error: 'invalid parameters' });
  }
  let imageMessage = '';
  if (req.file) {
    imageMessage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }

  Message.findOne({
    where: { id: req.params.id },
  })
    .then((message) => {
      if (res.locals.user === message.userId || res.locals.user === 1) {
        message
          .update(req.body)
          .then(() => res.status(200).json({ message: 'Message updated !' }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(401).json({ error: 'You do not have the required authorization !' });
      }
    })
    .catch((error) => res.status(400).json({ error: 'No message found' }));
};
//stopped


exports.deleteOne = (req, res) => {
  Message.findOne({
    where: { id: req.params.id },
  })
    .then((message) => {
      if (message.userId === res.locals.user || res.locals.user === 1) {
        const filename = message.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          message
            .destroy({
              where: { id: req.params.id },
            })
            .then(() => res.status(200).json({ message: 'Message deleted !' }))
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        res.status(400).json({ error: 'You can only delete your messages !' });
      }
    })
    .catch((error) => res.status(404).json({ error: 'No messages found' }));
};
