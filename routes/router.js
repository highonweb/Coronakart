const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../model/Item.js');
router.post('/signin', async (req, res, next) => {});
router.post('/buyer', async (req, res, next) => {});

router.post('/buyer', async (req, res, next) => {});

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

router.post('/remove', async (req, res, next) => {});
router.post('/edit', async (req, res, next) => {});
router.post('/find', async (req, res, next) => {});
module.exports = router;
