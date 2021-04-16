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

router.post('/comment', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { 'comments._id': req.body.id, 'comments.author._id': req.user._id },
      {
        $set: {
          'comments.$.body': req.body.body,
        },
      },
      {
        new: true,
      }
    );

    await post.save();
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
