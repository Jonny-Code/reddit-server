const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = Schema({
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  points: Schema.Types.Number,
  postedBy: Schema.Types.String,
  postedAt: Schema.Types.String,
  body: Schema.Types.String,
  isReply: Schema.Types.Boolean,
  hideComment: { type: Schema.Types.Boolean, default: false },
  repliesTo: [{ type: Schema.Types.ObjectId, ref: "Comment", default: null }],
  replies: [],
});

module.exports = mongoose.model("Comment", commentsSchema);
