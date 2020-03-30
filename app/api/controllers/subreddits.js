const mongoose = require("mongoose");
const subredditModel = require("../models/subreddits");
const postModel = require("../models/posts");

module.exports = {
  create: (req, res, next) => {
    subredditModel.create(
      {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        heading: req.body.heading,
        joined: req.body.joined
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
  getAll: (req, res, next) => {
    subredditModel.find({}, async (err, subreddits) => {
      if (err) next(err);
      else {
        console.log("subreddit model find all " + subreddits[0]);

        const posts = await postModel
          .find()
          .where("_id")
          .in(subreddits[0].posts)
          .exec();

        console.log("\n\n" + posts);

        res.json({
          status: "success",
          message: "found the subreddits",
          data: { subreddits, posts }
        });
      }
    });
  }
};
