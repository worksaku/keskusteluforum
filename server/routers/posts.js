const express = require('express');
const Post = require('../models/post');
const auth = require('../middleware/auth');
const router = new express.Router();

router.get('/posts', async (_, res) => {
  try {
    const posts = await Post.find({}).sort({ updatedAt: -1 });
    res.status(200).send(posts);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post('/posts', auth, async (req, res) => {
  const post = new Post({
    ...req.body,
    author: req.user.toJSON(),
  });

  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/post', async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.query.id,
    });
    res.status(200).send(post);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
