const mongoose = require("mongoose");
const subredditModel = require("../models/subreddit");
const postModel = require("../models/posts");
const commentModel = require("../models/comments");

module.exports = {
  create: (req, res, next) => {
    commentModel.create(
      {
        post: req.params.postId,
        points: req.body.points,
        postedBy: req.body.postedBy,
        postedAt: req.body.postedAt,
        body: req.body.body,
        isReply: req.body.isReply,
      },
      (err, result) => {
        if (err) next(err);
        else {
          res.json({ data: result });
        }
      }
    );
  },
  getAll: (req, res, next) => {
    commentModel.find({ post: req.params.postId }, (err, comments) => {
      if (err) next(err);
      else {
        if (comments.length) {
          res.json({
            status: "success",
            message: "found the comments",
            data: { comments },
          });
        } else {
          res.json({
            status: "error",
            message: "there are no comments",
            data: null,
          });
        }
      }
    });
  },
};
