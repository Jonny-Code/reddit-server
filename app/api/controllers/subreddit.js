const mongoose = require("mongoose");
const subredditModel = require("../models/subreddit");
const postModel = require("../models/posts");

// subredditModel.create(
//   {
//     _id: new mongoose.Types.ObjectId(),
//     name: "Ubuntu",
//     heading: "Ubuntu: Linux for Human Beings",
//     joined: false,
//     title: "Ubuntu",
//     bannerImgSrc:
//       "https://styles.redditmedia.com/t5_2qh62/styles/bannerBackgroundImage_6jdz5i1fbdi01.png",
//     logoImgSrc:
//       "https://b.thumbs.redditmedia.com/LRf44Bj9FVFeFj5k2UPxRAewlcJ6z53b2Gr096IQovU.png",
//     memberCount: 139_000,
//     membersOnline: 349,
//     createdAt: "April 24th 2020, 12:46:35 pm",
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
        joined: req.body.joined,
        title: req.body.title,
        bannerImgSrc: req.body.bannerImgSrc,
        logoImgSrc: req.body.logoImgSrc,
        memberCount: req.body.memberCount,
        membersOnline: req.body.membersOnline,
        createdAt: req.body.createdAt,
      },
      (err, result) => {
        if (err) next(err);
        else {
          res.json({
            status: "success",
            message: "subreddit has been added",
            data: result,
          });
        }
      }
    );
  },
  getAll: (req, res, next) => {
    subredditModel.find(
      { name: req.params.subName },
      async (err, subreddit) => {
        if (err) next(err);
        else {
          let [temp] = subreddit;

          const posts = await postModel
            .find()
            .where("_id")
            .in(temp.posts)
            .exec();

          res.json({
            status: "success",
            message: "found the subreddit",
            data: { subreddit: temp, posts },
          });
        }
      }
    );
  },
};
