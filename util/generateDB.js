const mongoose = require("mongoose");
const pModel = require("../app/api/models/posts");
const sModel = require("../app/api/models/subreddit");
const db = require("./db");

module.exports = {
  generatesubreddit: handlesubreddit,
  generatePosts: handlePosts
};

function handlePosts() {
  db.posts.forEach(post => {
    sModel.findOne({ name: post.name }, (err, doc) => {
      if (err) next(err);
      else {
        pModel.create(
          {
            subreddit: doc._id,
            votes: post.votes,
            postedBy: post.postedBy,
            postedAt: post.postedAt,
            title: post.title,
            imgSrc: post.imgSrc,
            body: post.body,
            comments: post.comments
          },
          (err, result) => {
            if (err) next(err);
            else {
              sModel.findById(doc._id, (err, subInfo) => {
                if (err) next(err);
                else {
                  subInfo.posts.push(result);
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
  });
}

function handlesubreddit() {
  db.subreddit.forEach(sub => {
    sub._id = mongoose.Types.ObjectId();
    sModel.create(sub, (err, res) => {
      if (err) console.error(err);
      else console.log(res);
    });
  });
}
