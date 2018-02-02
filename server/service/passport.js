

const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const { Users } = require('../models/user');

passport.serializeUser(function(user,done){
    if(user){
        done(null, user.id)
    }
});

passport.deserializeUser(function(id, done){
    Users.findById(id).then(function(existingIser){
        done(null, existingIser)
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: "/auth/google/callback"
  },
    async function(accessToken, refreshToken, profile, done) {
        var existingUser = await Users.findOne({googleId: profile.id});
        if(existingUser){
            done(null, existingUser);
        }else{
            var user = new Users({
                googleId: profile.id,
                name:profile.displayName
            });
            var newUser = await user.save();
            if(newUser)
                done(null, newUser);
        }
    }
    
));
