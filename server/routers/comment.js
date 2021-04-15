const express = require('express');
const Post = require('../models/post');
const auth = require('../middleware/auth');
const router = new express.Router();

router.put('/comment', auth, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.body.id,
    });
    post.comments.push({
      body: req.body.body,
      author: req.user.toJSON(),
    });
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
