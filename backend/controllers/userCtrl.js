const db = require('../models');
const User = db.users;
const Message = db.messages;
const Comment = db.comments;
const Like = db.likes;
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const fs = require('fs');

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

exports.createUser = (req, res) => {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;

  if (email == null || username == null || password == null) {
    return res.status(400).json({ error: 'Paramètres manquants' });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Email est invalide' });
  }

  if (username.length >= 13 || username.length <= 4) {
    return res
      .status(400)
      .json({ error: 'Mauvais username (entre 5 et 12 caractères nécessaire)' });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res
      .status(400)
      .json({ error: 'Mot de passe invalide (entre 4 et 8 caractères et avoir 1 nombre)' });
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        email: req.body.email,
        username: req.body.username,
        password: hash,
      };
      User.create(user)
        .then((data) => {
          res.send(data);
        })
        .catch((error) => {
          res.status(400).send({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  if (email == null || password == null) {
    return res.status(400).json({ error: 'missing parameters' });
  }
  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Wrong password !' });
          }

          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, `${config.JWT_TOKEN}`, { expiresIn: '24h' }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneUser = (req, res) => {
  User.findOne({
    attributes: ['id', 'email', 'username'],
    where: { id: req.params.id },
  })
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(404).json({ error }));
};
exports.getAllUsers = (req, res) => {
  User.findAll({
    attributes: ['id', 'email', 'username'],
  })
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(404).json({ error }));
};

exports.modifyUser = (req, res) => {
  var username = req.body.username;

  if (username.length >= 13 || username.length <= 2) {
    return res.status(400).json({ error: 'wrong username (must be length 3 - 12)' });
  }
  User.findOne({
    attributes: ['id', 'email', 'username'],
    where: { id: req.params.id },
  })
    .then((user) => {
      if (user.id === res.locals.user || res.locals.user === 1) {
        user
          .update({ username: req.body.username })
          .then(() => res.status(200).json({ message: 'User updated !' }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(401).json({ error: 'You do not have such authorization !' });
      }
    })
    .catch((error) => res.status(404).json({ error: 'No user found' }));
};

exports.deleteUser = (req, res) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (user.id === res.locals.user || res.locals.user === 1) {
        Message.destroy({ where: { userId: req.params.id } });
        Comment.destroy({ where: { userId: req.params.id } });
        Like.destroy({ where: { userId: req.params.id } });
        user
          .destroy({
            where: { id: req.params.id },
          })
          .then(() => res.status(200).json({ message: 'User deleted !' }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(401).json({ error: 'You cannot delete other users.' });
      }
    })
    .catch((error) => res.status(404).json({ error: 'No user found' }));
};
