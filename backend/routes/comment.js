const express = require("express");
const router = express.Router();
const comment = require("../controllers/commentsCtrl");
const auth = require('../middleware/auth');


router.get("/:Messageid", auth, commentCtrl.findAllComment);
router.post("/", auth, commentCtrl.createComment);
router.delete("/", auth, commentCtrl.deleteComment);

module.exports = router;