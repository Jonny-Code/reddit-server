const mongoose = require("mongoose");
const subredditModel = require("../models/subreddits");

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
  }
};
