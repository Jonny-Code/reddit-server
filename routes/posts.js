const express = require("express");
const router = express.Router();
const postController = require("../app/api/controllers/posts");

router.get("/", postController.getAll);
router.post("/", postController.create);
router.get("/:postId", postController.getById);
router.put("/:postId", postController.updateById);
router.delete("/:postId", postController.deleteById);

module.exports = router;
