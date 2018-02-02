
const express = require("express");
const hbs = require("hbs");
const passport = require("passport");
const bodyParser = require('body-parser');
var cookieSession = require('cookie-session')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./server/config/keys');

const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);

hbs.registerPartials('./server/views/partials');
const app = express();
app.set('views', __dirname+'/server/views');
app.set('view engine', hbs);
app.use(express.static(__dirname+'/server/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({
    name: 'session',
    keys: ['wdsdwqd2dd2d2d2d222d22d'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());

require('./server/service/passport');
require('./server/route/passport')(app);
require('./server/route/users')(app);

const port = process.env.PORT || 5000;
app.listen(port,() => {
  console.log('----------server--------');
});