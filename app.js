const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv').config();
const bcrypt = require('bcryptjs');
const MongoStore = require('connect-mongo')(session);
const mongoDB =
  'mongodb+srv://dbuser:dbkey@myclouddb.arw5e.mongodb.net/corona?retryWrites=true&w=majority';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('we are connected to DB');
});

app.use(
  session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
  })
);
// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
// serve static files
app.use(express.static('public'));
const routes = require('./routes/router');
app.use('/', routes);
app.use(function (req, res, next) {
  if (req.session.userId == undefined) {
    return res.redirect('/');
  }
  next();
});
const authroutes = require('./routes/authroutes');
app.use('/', authroutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
