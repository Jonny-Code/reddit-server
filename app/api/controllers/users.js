const userModel = require("../models/users");
const postModel = require("../models/posts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  create: (req, res, next) => {
    userModel.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
      (err, result) => {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "added new user",
            data: null,
          });
      }
    );
  },
  authenticate: (req, res, next) => {
    console.log(req.body);
    userModel.findOne({ email: req.body.email }, (err, userInfo) => {
      if (err) next(err);
      else if (!userInfo) {
        res.status(401).json({
          status: "error",
          message: "wrong email",
          data: null,
        });
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            req.app.get("secretKey"),
            { expiresIn: "1h" }
          );
          res.json({
            status: "success",
            message: "user was found",
            data: { user: userInfo, token: token },
          });
        } else {
          res.status(401).json({
            status: "error",
            message: "wrong password",
            data: null,
          });
        }
      }
    });
  },
  upvote: (req, res, next) => {
    // Empty the upvoted array

    // userModel.findOneAndUpdate(
    //   { _id: req.body.userId },
    //   { $set: { upvoted: [] } },
    //   { new: true },
    //   (err, doc) => {
    //     if (err) {
    //       console.log("Something wrong when updating data!");
    //     }
    //     res.json({
    //       status: "success",
    //       message: "user was updated",
    //       data: null,
    //     });
    //     console.log(doc);
    //   }
    // );

    userModel.findByIdAndUpdate(
      { _id: req.body.userId },
      { $push: { upvoted: req.body.postId } },
      { new: true },
      (err, userInfo) => {
        if (err) next(err);
        else {
          console.log(userInfo);

          postModel.findByIdAndUpdate(
            { _id: req.body.postId },
            { $inc: { votes: 1 } },
            { new: true },
            (err, doc) => {
              if (err) {
                console.log("something went wrong incrementing post votes");
              }
              console.log(doc);
            }
          );

          res.json({
            status: "success",
            message: "user was updated",
            data: null,
          });
        }
      }
    );
  },
  removeUpvote: (req, res, next) => {
    console.log("running removeUpvote");
    userModel.findByIdAndUpdate(
      { _id: req.body.userId },
      { $pullAll: { upvoted: [req.body.postId] } },
      { new: true },
      (err, data) => {
        if (err) next(err);

        postModel.findByIdAndUpdate(
          { _id: req.body.postId },
          { $inc: { votes: -1 } },
          { new: true },
          (err, doc) => {
            if (err) {
              console.log("something went wrong decrementing post votes");
            }
            console.log(doc);
            res.json({
              status: "success",
              message: "user was updated",
              data: doc,
            });
          }
        );
      }
    );
  },
  downvote: (req, res, next) => {
    // Empty the downvoted array

    // userModel.findOneAndUpdate(
    //   { _id: req.body.userId },
    //   { $set: { downvoted: [] } },
    //   { new: true },
    //   (err, doc) => {
    //     if (err) {
    //       console.log("Something wrong when updating data!");
    //     }
    //     res.json({
    //       status: "success",
    //       message: "user was updated",
    //       data: null,
    //     });
    //     console.log(doc);
    //   }
    // );

    userModel.findByIdAndUpdate(
      { _id: req.body.userId },
      { $push: { downvoted: req.body.postId } },
      { new: true },
      (err, userInfo) => {
        if (err) next(err);
        else {
          console.log(userInfo);

          postModel.findByIdAndUpdate(
            { _id: req.body.postId },
            { $inc: { votes: -1 } },
            { new: true },
            (err, doc) => {
              if (err) {
                console.log("something went wrong decrementing post votes");
              }
              console.log(doc);
            }
          );

          res.json({
            status: "success",
            message: "user was updated",
            data: null,
          });
        }
      }
    );
  },
  removeDownvote: (req, res, next) => {
    console.log("running removeDownvote");
    userModel.findByIdAndUpdate(
      { _id: req.body.userId },
      { $pullAll: { downvoted: [req.body.postId] } },
      { new: true },
      (err, data) => {
        if (err) next(err);

        postModel.findByIdAndUpdate(
          { _id: req.body.postId },
          { $inc: { votes: 1 } },
          { new: true },
          (err, doc) => {
            if (err) {
              console.log("something went wrong incrementing post votes");
            }
            console.log(doc);
          }
        );

        res.json({
          status: "success",
          message: "user was updated",
          data,
        });
      }
    );
  },
};
