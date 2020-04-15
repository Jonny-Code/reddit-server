const commentModel = require("../models/comments");

function nestComments(comments) {
  let temp1 = [];
  let temp2 = [];

  comments.forEach((c) => {
    if (!c.isReply) {
      temp2.push(c);
    }
  });

  comments.forEach((c) => {
    for (let i = 0; i < comments.length; i++) {
      if (
        comments[i].repliesTo[comments[i].repliesTo.length - 1] !== undefined &&
        c._id.toString() ===
          comments[i].repliesTo[comments[i].repliesTo.length - 1].toString()
      ) {
        c.replies.push(comments[i]);
        temp1.push(c);
      }
    }
  });

  return temp2;
}

function createComment(comment, res, next) {
  if (!comment.isReply) {
    commentModel.create(comment, (err, result) => {
      if (err) next(err);
      res.json({
        data: result,
      });
    });
  } else {
    commentModel.findOne(
      { _id: comment.repliesTo[comment.repliesTo.length - 1] },
      (err, result) => {
        if (err) next(err);
        commentModel.create(comment);
      }
    );
  }
}

module.exports = {
  create: (req, res, next) => {
    console.log(req.body);
    createComment(req.body, res, next);
  },

  getAll: (req, res, next) => {
    commentModel.find({ post: req.params.postId }, (err, comments) => {
      if (err) next(err);
      else {
        // console.log(comments);
        if (comments.length) {
          let c = nestComments(comments);
          res.json({
            status: "success",
            message: "found the comments",
            data: { comments: c },
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
