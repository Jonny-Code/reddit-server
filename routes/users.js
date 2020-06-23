const express = require("express");
const router = express.Router();
const userController = require("../app/api/controllers/users");

router.post("/register", userController.create);
router.post("/authenticate", userController.authenticate);
router.post("/upvote", userController.upvote);
router.delete("/removeUpvote", userController.removeUpvote);
router.post("/downvote", userController.downvote);
router.delete("/removeDownvote", userController.removeDownvote);

module.exports = router;
