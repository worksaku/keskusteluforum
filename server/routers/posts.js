const express = require('express');
const Post = require('../models/post');
const auth = require('../middleware/auth');
const router = new express.Router();

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/posts', auth, async (req, res) => {
  const post = new Post({ ...req.body, author: req.user });

  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
