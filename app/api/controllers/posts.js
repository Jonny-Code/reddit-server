const postModel = require("../models/posts");

module.exports = {
  create: (req, res, next) => {
    postModel.create(
      {
        votes: req.body.votes,
        postedBy: req.body.postedBy,
        postedAt: req.body.postedAt,
        title: req.body.title,
        imgSrc: req.body.imgSrc,
        body: req.body.body,
        comments: req.body.comments
      },
      (err, result) => {
        if (err) next(err);
        else {
          res.json({
            status: "success",
            message: "posts has been added",
            data: result
          });
        }
      }
    );
  },
  getById: (req, res, next) => {
    postModel.findById(req.params.postId, (err, postInfo) => {
      if (err) next(err);
      else
        res.json({
          status: "success",
          message: "Found the post",
          data: { posts: postInfo }
        });
    });
  },
  getAll: (req, res, next) => {
    let postsList = [];

    postModel.find({}, (err, posts) => {
      if (err) next(err);
      else {
        for (const post of posts) {
          postsList.push({
            _id: post._id,
            votes: post.votes,
            postedBy: post.postedBy,
            postedAt: post.postedAt,
            title: post.title,
            imgSrc: post.imgSrc,
            body: post.body,
            comments: post.comments
          });
        }
        res.json({
          status: "success",
          message: "found the postlist",
          data: { posts: postsList }
        });
      }
    });
  },
  updateById: (req, res, next) => {
    postModel.findByIdAndUpdate(
      req.params.postId,
      { votes: req.body.votes },
      (err, postInfo) => {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "post updated",
            data: null
          });
      }
    );
  },
  deleteById: (req, res, next) => {
    postModel.findByIdAndRemove(req.params.postId, (err, postInfo) => {
      if (err) next(err);
      else {
        res.json({
          status: "success",
          message: "post was removed",
          data: postInfo
        });
      }
    });
  }
};
