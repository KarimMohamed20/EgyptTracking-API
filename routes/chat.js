const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const chat = require('../controllers/chat/chat')




router.post("/single", auth, chat.getSingleChat);

router.post("/student/get", auth, chat.getMyChats);

module.exports = router;
