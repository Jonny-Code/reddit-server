const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = Schema({
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  points: Schema.Types.Number,
  postedBy: Schema.Types.String,
  postedAt: Schema.Types.String,
  body: Schema.Types.String,
  isReply: Schema.Types.Boolean,
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Comment", commentsSchema);
