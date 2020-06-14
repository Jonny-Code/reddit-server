const commentModel = require("../models/comments");
const postModel = require("../models/posts");

function nestComments(comments) {
  let temp = [];

  comments.forEach((c) => {
    if (!c.isReply) {
      temp.push(c);
    }
  });

  comments.forEach((c) => {
    for (let i = 0; i < comments.length; i++) {
      if (
        typeof comments[i].repliesTo[comments[i].repliesTo.length - 1] !==
          "undefined" &&
        c._id.toString() ===
          comments[i].repliesTo[comments[i].repliesTo.length - 1].toString()
      ) {
        c.replies.push(comments[i]);
      }
    }
  });

  return temp;
}

function createComment(comment, res, next) {
  if (!comment.isReply) {
    commentModel.create(comment, (err, result) => {
      if (err) next(err);
      else {
        postModel.findOneAndUpdate(
          { _id: comment.post },
          { $inc: { comments: 1 } },
          { new: true },
          (err, doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
            }
            console.log("updated post");
            console.log(doc);
          }
        );
        res.json({
          data: result,
        });
      }
    });
  } else {
    commentModel.findOne(
      { _id: comment.repliesTo[comment.repliesTo.length - 1] },
      (err, result) => {
        if (err) next(err);
        else {
          commentModel.create(comment);
          postModel.findOneAndUpdate(
            { _id: comment.post },
            { $inc: { comments: 1 } },
            { new: true },
            (err, doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
              }
            }
          );
        }
      }
    );
  }
}

module.exports = {
  create: (req, res, next) => {
    createComment(req.body, res, next);
  },

  getAll: (req, res, next) => {
    commentModel.find({ post: req.params.postId }, (err, comments) => {
      if (err) next(err);
      else {
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
