const express = require("express");
const router = express.Router();
const subredditController = require("../app/api/controllers/subreddit");

router.get("/:subName", subredditController.getAll);
router.post("/", subredditController.create);

module.exports = router;
