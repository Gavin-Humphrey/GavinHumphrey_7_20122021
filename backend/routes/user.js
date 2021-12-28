const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const messageCtrl = require('../controllers/message');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', userCtrl.findAllUsers);
router.get('/:id', userCtrl.findOneUser);
router.get('/:id/message',  messageCtrl.findMessagesByUserId);
router.put('/:id', multer, userCtrl.modifyUser);
router.delete('/:id',auth, userCtrl.deleteUser);

module.exports = router;
