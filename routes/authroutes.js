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
    const user = await User.findById(req.session.userId).populate('products');
    const items = await Item.find({});

    return res.render('dashboard', {user: user, items: items});
  } catch (error) {}
});
router.get('/seller', async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId).populate('products');

    return res.render('dashboard', {user: user});
  } catch (error) {}
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

router.get('/img:id', async (req, res) => {
  console.log(req.params.id);
  debugger;
  let img = await Item.findById(req.params.id);
  img = img.image.toString('base64');
  img = Buffer.from(img, 'base64');

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length,
  });
  res.end(img);
});

router.get('/item:id', async (req, res) => {
  const item = await (await Item.findById(req.params.id))
    .populate('customers')
    .execPopulate();
  const user = await User.findById(req.session.userId);
  return res.render('item', {item: item, user: user});
});

router.post(
  '/seller/addp',
  multer({dest: 'uploads/'}).single('img'),
  async (req, res, next) => {
    const img = fs.readFileSync(req.file.path);
    const encodeImage = img.toString('base64');
    const image = Buffer.from(encodeImage, 'base64');
    const item = await Item.create({
      name: req.body.itemname,
      description: req.body.desc,
      price: req.body.price,
      image: image,
      quantity: req.body.stock,
      seller: req.session.userId,
    });
    const user = await User.findByIdAndUpdate(req.session.userId, {
      $push: {products: item},
    });

    return res.redirect('/seller');
  }
);
router.get('/a2c:id', async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  const user = await User.findById(req.session.userId);
  user.products.push(item);
  user.save();

  res.redirect('buyer');
});
router.post('/purchase:id', async (req, res, next) => {
  const user = await User.findById(req.session.userId);
  const item = await Item.findById(req.params.id);
  item.quantity -= 1;
  item.customers.push(user);
  item.save();
  user.history.push({pro: req.body.items, stype: 'item'});
  user.save();
  const seller = await User.findById(item.seller);
  seller.history.push({pro: user, stype: 'user'});
  seller.save();

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
  await Item.findByIdAndUpdate(req.params.id, req.body);
  return res.redirect('/item' + req.params.id);
});
router.get('/profile', async (req, res, next) => {
  const user = await User.findById(req.session.userId);
  const history = user.history;

  let promises;
  console.log(user);
  if (user.usertype == 'seller') {
    console.log('seller');
    promises = history.map(async (his) => {
      return User.findById(his.pro);
    });
  } else {
    console.log('buyer');
    promises = history.map(async (his) => {
      return Item.findById(his.pro);
    });
  }
  let datearr = [];
  history.forEach((his) => {
    datearr.push(his.date);
  });
  let his = await Promise.all(promises);

  res.render('profile', {user: user, his: his, datearr});
});
router.post('/search', async (req, res, next) => {
  let sterm = String(req.body.sterm);
  let user = await User.findById(req.session.userId);
  console.log(sterm);
  try {
    console.log(item);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.get('/checkout', async (req, res, next) => {
  const user = await User.findById(req.session.userId).populate('products');
  for (let i = 0; i < user.products.length; i++) {
    const element = user.products[i]._id;
    const item = await Item.findById(element);
    item.quantity -= 1;
    item.customers.push(user);
    item.save();
    user.history.push({pro: req.body.items, stype: 'item'});
    user.save();
    const seller = await User.findById(item.seller);
    seller.history.push({pro: user, stype: 'user'});
    seller.save();
  }
  console.log('chec');
  await User.findByIdAndUpdate(req.session.userId, {$set: {products: []}});
  res.json('success');
});
router.get('/clear', async (req, res, next) => {
  await User.findByIdAndUpdate(req.session.userId, {$set: {products: []}});
});
module.exports = router;
