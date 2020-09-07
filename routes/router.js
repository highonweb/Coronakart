const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../model/item.js');
const User = require('../model/user.js');
router.post('/signin', async (req, res, next) => {});
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

  return res.render('buyer', {user: user});
});

router.get('/', async (req, res, next) => {
  return res.render('index');
});
router.get('/seller', async (req, res, next) => {
  try {
    return res.render('seller');
  } catch (error) {
    console.log(error);
  }
});
router.get('/buyer', async (req, res, next) => {
  try {
    return res.render('buyer');
  } catch (error) {
    console.log(error);
  }
});

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

router.get('/logout', async (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

router.post('/remove', async (req, res, next) => {});
router.post('/edit', async (req, res, next) => {});
router.post('/find', async (req, res, next) => {});
module.exports = router;
