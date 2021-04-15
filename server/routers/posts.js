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

router.put('/posts', auth, async (req, res) => {
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

router.post('/post', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.body.id },
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        new: true,
      }
    );

    await post.save();
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send(e);
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

router.delete('/post', auth, async (req, res) => {
  try {
    const { deletedCount } = await Post.deleteOne({
      _id: req.body.id,
    });
    if (deletedCount > 0) {
      res.status(204).send();
    }
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
