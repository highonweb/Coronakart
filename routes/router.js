const User = require('../model/user.js');
const express = require('express');
const router = express.Router();
router.get('/signin', async (req, res, next) => {
  try {
    return res.render('login');
  } catch (error) {}
});
router.get('/signup', async (req, res, next) => {
  try {
    return res.render('signup');
  } catch (error) {}
});
router.post('/buyerlog', async (req, res, next) => {
  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      console.log(error);
      return res.send('Wrong username or password.');
    } else {
      req.session.userId = user._id;
    }
  });
});

router.post('/buyer', async (req, res, next) => {
  let userdata = {
    name: req.body.name,
    email: req.body.email,
    usertype: 'buyer',
    password: req.body.password,
  };
  console.log(userdata);
  const user = await User.create(userdata);
  console.log(user);
  req.session.userId = user.id;
  return res.render('buyer', {user: user});
});
router.get('/', async (req, res, next) => {
  return res.render('index');
});
module.exports = router;
