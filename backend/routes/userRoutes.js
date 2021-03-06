const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');
const messageCtrl = require('../controllers/messageCtrl');
const commentCtrl = require('../controllers/commentCtrl');
const likeCtrl = require('../controllers/likeCtrl');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// users
router.post('/signup/', userCtrl.createUser);
router.post('/login/', userCtrl.login);
router.put('/user/:id', auth, userCtrl.modifyUser);
router.get('/user/:id', auth, userCtrl.getOneUser);
router.get('/users/', auth, userCtrl.getAllUsers);
router.delete('/user/:id', auth, userCtrl.deleteUser);

// messages
router.post('/messages/new', auth, multer, messageCtrl.createMessage);
router.get('/messages/', auth, messageCtrl.findAllMessages);
router.get('/messages/:id/', auth, messageCtrl.findOne);
router.delete('/messages/:id/', auth, multer, messageCtrl.deleteOne);

// comments
router.post('/messages/:id/comments/new', auth, commentCtrl.createComment);
router.put('/comments/:id', auth, commentCtrl.modifyComment);
router.get('/messages/:id/comments', auth, commentCtrl.findAllCommentsOfOneMessage);
router.get('/comments/', auth, commentCtrl.findAllComments);
router.get('/comments/:id', auth, commentCtrl.findOne);
router.delete('/comments/:id', auth, commentCtrl.deleteOne);

// likes
router.post('/messages/:id/like', auth, likeCtrl.likeOneMessage);
router.get('/messages/:id/likes', auth, likeCtrl.findAllLikesOfOneMessage);

module.exports = router;
