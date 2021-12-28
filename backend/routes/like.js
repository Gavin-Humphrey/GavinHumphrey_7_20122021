const express = require('express');

const router = express.Router();
const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

// Routes
router.get('/', likeCtrl.findAllLikes);
router.post('/:messageId',auth, likeCtrl.createLike);

module.exports = router;
