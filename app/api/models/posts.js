const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema({
  subreddit: { type: Schema.Types.ObjectId, ref: "Subreddit" },
  votes: Schema.Types.Number,
  postedBy: Schema.Types.String,
  postedAt: Schema.Types.String,
  title: Schema.Types.String,
  imgSrc: Schema.Types.String,
  body: Schema.Types.String,
  comments: Schema.Types.Number,
  upvoted: Schema.Types.Boolean,
  downvoted: Schema.Types.Boolean,
});

module.exports = mongoose.model("Post", postSchema);
