const mongoose = require('mongoose');
const User = require('../model/user.js');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
router.get('/signin', async (req, res, next) => {
  try {
    return res.render('login', {action: 'buyerlog'});
  } catch (error) {}
});
router.get('/signinseller', async (req, res, next) => {
  try {
    return res.render('login', {action: 'sellerlog'});
  } catch (error) {}
});
router.get('/signup', async (req, res, next) => {
  try {
    return res.render('signup', {action: 'buyer'});
  } catch (error) {}
});
router.get('/signupseller', async (req, res, next) => {
  try {
    return res.render('signup', {action: 'seller'});
  } catch (error) {}
});
router.post('/buyerlog', async (req, res, next) => {
  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      console.log(error);
      return res.send('Wrong username or password.');
    } else {
      req.session.userId = user._id;
      return res.redirect('/buyer');
    }
  });
});
router.post('/sellerlog', async (req, res, next) => {
  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      console.log(error);
      return res.send('Wrong username or password.');
    } else {
      req.session.userId = user._id;
      return res.redirect('/seller');
    }
  });
});

router.post('/buyer', async (req, res, next) => {
  const userdata = {
    name: req.body.name,
    email: req.body.email,
    usertype: 'buyer',
    password: req.body.password,
  };
  const a = await User.exists({email: req.body.email});
  if (a) {
    return res.send('user name is already taken');
  }
  console.log(userdata);
  userdata.password = await bcrypt.hash(userdata.password, 10);
  console.log(userdata);
  const user = await User.create(userdata);
  console.log(user);
  req.session.userId = user.id;
  return res.redirect('buyer');
});
router.get('/', async (req, res, next) => {
  return res.render('index');
});
router.post('/seller', async (req, res, next) => {
  const userdata = {
    name: req.body.name,
    email: req.body.email,
    usertype: 'seller',
    password: req.body.password,
  };
  const a = await User.exists({email: req.body.email});
  if (a) {
    return res.send('user name is already taken');
  }
  userdata.password = await bcrypt.hash(userdata.password, 10);
  const user = await User.create(userdata);
  console.log(user);
  req.session.userId = user.id;
  return res.redirect('seller');
});
module.exports = router;
