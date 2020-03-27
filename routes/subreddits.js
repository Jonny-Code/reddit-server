const express = require("express");
const router = express.Router();
const subredditController = require("../app/api/controllers/subreddits");

router.post("/", subredditController.create);

module.exports = router;
