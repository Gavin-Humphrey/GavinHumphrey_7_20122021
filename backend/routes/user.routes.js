const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controller');
const messageCtrl = require('../controllers/message.controller');
const commentCtrl = require('../controllers/comment.controller');
const likeCtrl = require('../controllers/like.controller');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes pour les users
router.post('/signup/', userCtrl.createUser);
router.post('/login/', userCtrl.login);
router.put('/user/:id', auth, userCtrl.modifyUser);
router.get('/user/:id', auth, userCtrl.getOneUser);
router.get('/users/', auth, userCtrl.getAllUsers);
router.delete('/user/:id', auth, userCtrl.deleteUser);

// Routes pour les messages
router.post('/messages/new', auth, multer, messageCtrl.createMessage);
router.get('/messages/', auth, messageCtrl.findAllMessages);
router.get('/messages/:id/', auth, messageCtrl.findOne);
router.delete('/messages/:id/', auth, multer, messageCtrl.deleteOne);

// Routes pour les comments
router.post('/messages/:id/comments/new', auth, commentCtrl.createComment);
router.put('/comments/:id', auth, commentCtrl.modifyComment);
router.get('/messages/:id/comments', auth, commentCtrl.findAllCommentsOfOneMessage);
router.get('/comments/', auth, commentCtrl.findAllComments);
router.get('/comments/:id', auth, commentCtrl.findOne);
router.delete('/comments/:id', auth, commentCtrl.deleteOne);

// Routes pour les likes
router.post('/messages/:id/like', auth, likeCtrl.likeOneMessage);
router.get('/messages/:id/likes', auth, likeCtrl.findAllLikesOfOneMessage);

module.exports = router;

