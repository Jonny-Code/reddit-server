const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subredditSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: Schema.Types.String,
  heading: Schema.Types.String,
  title: Schema.Types.String,
  bannerImgSrc: Schema.Types.String,
  logoImgSrc: Schema.Types.String,
  joined: Schema.Types.Boolean,
  memberCount: Schema.Types.Number,
  membersOnline: Schema.Types.Number,
  rules: [{ title: Schema.Types.String, body: Schema.Types.String }],
  moderators: [],
  createdAt: Schema.Types.String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = mongoose.model("Subreddit", subredditSchema);
