const postModel = require("../models/posts");
const subredditModel = require("../models/subreddit");

// Empty the posts array
// subredditModel.findOneAndUpdate(
//   { name: "Ubuntu" },
//   { $set: { posts: [] } },
//   { new: true },
//   (err, doc) => {
//     if (err) {
//       console.log("Something wrong when updating data!");
//     }

//     console.log(doc);
//   }
// );

// subredditModel.findOne({ name: req.body.name }, (err, doc) => {
//   if (err) next(err);
//   else {
//     postModel.create(
//       {
//         subreddit: doc._id,
//         votes: req.body.votes,
//         postedBy: req.body.postedBy,
//         postedAt: req.body.postedAt,
//         title: req.body.title,
//         imgSrc: req.body.imgSrc,
//         body: req.body.body,
//         comments: req.body.comments
//       },
//       (err, result) => {
//         if (err) next(err);
//         else {
//           subredditModel.findById(doc._id, (err, subInfo) => {
//             if (err) next(err);
//             else {
//               subInfo.posts.push(result);
//               subInfo.save(err => {
//                 if (err) console.error(err);
//               });
//             }
//           });
//           res.json({
//             status: "success",
//             message: "posts has been added",
//             data: result
//           });
//         }
//       }
//     );
//   }
// });

module.exports = {
  create: (req, res, next) => {
    subredditModel.findOne(req.subreddit, (err, doc) => {
      if (err) next(err);
      else {
        postModel.create(
          {
            subreddit: doc._id,
            votes: req.body.votes,
            postedBy: req.body.postedBy,
            postedAt: req.body.postedAt,
            title: req.body.title,
            imgSrc: req.body.imgSrc,
            body: req.body.body,
            comments: req.body.comments,
            upvoted: req.body.upvoted,
            downvoted: req.body.downvoted,
          },
          (err, result) => {
            if (err) next(err);
            else {
              subredditModel.findById(doc._id, (err, subInfo) => {
                if (err) next(err);
                else {
                  subInfo.posts.push(result);
                  subInfo.save((err) => {
                    if (err) console.error(err);
                  });
                }
              });
              res.json({
                status: "success",
                message: "posts has been added",
                data: result,
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
          data: { posts: postInfo },
        });
    });
  },
  getAll: (req, res, next) => {
    postModel.find({}, (err, posts) => {
      if (err) next(err);
      else {
        res.json({
          status: "success",
          message: "found the posts",
          data: { posts },
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
            data: null,
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
          data: postInfo,
        });
      }
    });
  },
};
