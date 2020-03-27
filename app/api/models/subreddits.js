const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subredditSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: Schema.Types.String,
  heading: Schema.Types.String,
  joined: Schema.Types.Boolean,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
});

module.exports = mongoose.model("Subreddit", subredditSchema);
