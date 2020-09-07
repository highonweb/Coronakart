const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../model/item.js');
const User = require('../model/user.js');
router.post('/signin', async (req, res, next) => {});

router.get('/seller', async (req, res, next) => {
  try {
    return res.render('seller');
  } catch (error) {
    console.log(error);
  }
});
router.get('/buyer', async (req, res, next) => {
  try {
    const user = User.findById(req.session.userId);
    return res.render('buyer', {user: user});
  } catch (error) {
    console.log(error);
  }
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
