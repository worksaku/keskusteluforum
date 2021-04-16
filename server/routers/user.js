const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.cookie('forum', token, {
      maxAge: 900000,
      httpOnly: true,
    });
    res.json({
      user,
      token,
    });
  } catch (e) {
    res.status(500).send();
  }
});

router.put('/user', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(401).send();
  }
});

router.post('/user/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.clearCookie('forum');
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
