/* eslint-disable indent */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../model/item.js');
const User = require('../model/user.js');
const fs = require('fs');
const multer = require('multer');
const {findByIdAndDelete} = require('../model/user.js');
router.post('/signin', async (req, res, next) => {});

router.get('/buyer', async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    const items = await Item.find({});
    console.log(user);
    return res.render('dashboard', {user: user, items: items});
  } catch (error) {
    console.log(error);
  }
});
router.get('/seller', async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId).populate('products');
    console.log(user);
    return res.render('dashboard', {user: user});
  } catch (error) {
    console.log(error);
  }
});

router.get('/logout', async (req, res, next) => {
  // delete session object
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    } else {
      return res.redirect('/');
    }
  });
});

router.get('/item:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  const user = await User.findById(req.session.userId);
  res.render('item', {item: item, user: user});
});

router.post(
  '/seller/addp',
  multer({dest: 'uploads/'}).single('img'),
  async (req, res, next) => {
    console.log(req.body);
    const img = fs.readFileSync(req.file.path);
    const encodeImage = img.toString('base64');
    const image = Buffer.from(encodeImage, 'base64');
    const item = await Item.create({
      name: req.body.itemname,
      description: req.body.desc,
      price: req.body.price,
      image: image,
      quantity: req.body.stock,
    });
    const user = await User.findByIdAndUpdate(req.session.userId, {
      $push: {products: item},
    });
    console.log(item);
    return res.redirect('/seller');
  }
);
router.get('/a2c:id', async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  const user = await User.findById(req.session.userId);
  user.products.push(item);
  user.save();

  console.log(user);
  res.redirect('buyer');
});
router.post('/purchase', async (req, res, next) => {
  console.log(req.body);
  const item = await Item.findById(req.params.id);
  const user = await User.findById(req.session.userId);
  user.history.push(req.body.items);
  user.save();

  console.log(user);
  res.json('success');
});
router.get('/remove:id', async (req, res, next) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  const user = await User.findById(req.session.userId);
  user.products.pull(item);
  user.save();
  res.redirect('/seller');
});
router.get('/update:id', async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  res.render('update', {item: item});
});
router.post('/seller/updp:id', async (req, res, next) => {
  console.log(req.body);
  const item = await Item.findByIdAndUpdate(req.params.id, req.body);
  return res.redirect('/item' + req.params.id);
});
router.get('/profile', async (req, res, next) => {
  const user = await User.findById(req.session.userId);
  res.render('profile', {user: user});
});
router.post('/edit', async (req, res, next) => {});
router.post('/find', async (req, res, next) => {});
module.exports = router;
