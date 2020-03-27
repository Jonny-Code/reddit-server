const postModel = require("../models/posts");
const subredditModel = require("../models/subreddits");

module.exports = {
  create: (req, res, next) => {
    subredditModel.findOne({ name: req.body.name }, (err, doc) => {
      if (err) next(err);
      else {
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
              subredditModel.findById(doc._id, (err, subInfo) => {
                if (err) next(err);
                else {
                  subInfo.posts.push(result);
                  console.log(subInfo);
                  subInfo.save(err => {
                    if (err) console.error(err);
                  });
                }
              });
            }
          }
        );
      }
    });
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
            subreddit: post.subreddit,
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
          message: "found the posts",
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
