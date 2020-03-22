const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  votes: {
    type: Number,
    required: true
  },
  postedBy: {
    type: String,
    trim: true,
    required: true
  },
  postedAt: {
    type: String,
    trim: true,
    required: true
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  imgSrc: {
    type: String,
    trim: true
  },
  body: {
    type: String,
    trim: true
  },
  comments: {
    type: Array,
    trim: true
  }
});

module.exports = mongoose.model("Post", PostSchema);
