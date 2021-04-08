const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    comments: [
      {
        body: {
          type: String,
          required: true,
        },
        author: mongoose.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
