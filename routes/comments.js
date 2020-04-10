const express = require("express");
const router = express.Router();
const commentController = require("../app/api/controllers/comments");

router.get("/:postId", commentController.getAll);
router.post("/:postId", commentController.create);

module.exports = router;
