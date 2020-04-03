const mongoose = require("mongoose");
const subredditModel = require("../models/subreddits");
const postModel = require("../models/posts");

// subredditModel.create(
//   {
//     _id: new mongoose.Types.ObjectId(),
//     name: "gaming",
//     heading: "r/gaming",
//     title: "gaming",
//     bannerImgSrc:
//       "https://styles.redditmedia.com/t5_2qh03/styles/bannerBackgroundImage_36bsu8h3urx11.png",
//     logoImgSrc:
//       "https://b.thumbs.redditmedia.com/0PgZl68jAxA6T1BH6uvUQ5Bz1F1GrrJLCL8oi2Gz0Ak.png",
//     joined: false
//   },
//   (err, result) => {
//     if (err) next(err);
//   }
// );

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
        let temp = subreddits.filter(i => i.name === req.params.subName);

        const posts = await postModel
          .find()
          .where("_id")
          .in(temp[0].posts)
          .exec();

        res.json({
          status: "success",
          message: "found the subreddits",
          data: { subreddits, posts }
        });
      }
    });
  }
};
