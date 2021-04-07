const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

// router.post('/user/login', async (req, res) => {
//   try {
//     const user = await User.findByCredentials(
//       req.body.username,
//       req.body.password
//     );
//     const token = await user.generateAuthToken();
//     res.cookie('forum', token, {
//       maxAge: 900000,
//       httpOnly: true,
//     });
//     res.json({
//       user,
//       token,
//     });
//   } catch (e) {
//     res.status(400).send();
//   }
// });

// Only for testing purposes
// router.post('/user', async (req, res) => {
//   const user = new User(req.body);
//   try {
//     await user.save();
//     const token = await user.generateAuthToken();
//     res.status(201).send({ user, token });
//   } catch (e) {
//     console.log(e);
//     res.status(400).send(e);
//   }
// });

// router.post('/user/logout', auth, async (req, res) => {
//   try {
//     req.user.tokens = req.user.tokens.filter((token) => {
//       return token.token !== req.token;
//     });
//     await req.user.save();

//     res.json({});
//   } catch (e) {
//     res.status(500).send();
//   }
// });

module.exports = router;
