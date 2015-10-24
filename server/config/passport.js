var db = require('./database');
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User = require('../models/user');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user ? user.get('facebook_id') : false);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    db.model('User').fetchById({ facebook_id: id })
    .then(function(user) {
      done(null, user);
    });
  });

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  passport.use(new FacebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    passReqToCallback: true,
    enableProof: false,
    callbackURL: configAuth.facebookAuth.callbackURL
  },

  // facebook will send back the token and profile
  function(token, refreshToken, profile, done) {
    // asynchronous
    process.nextTick(function() {

      // find the user in the database based on their facebook id
      db.model('User').fetchById({'facebook_id': profile.id})
      .then(function(user) {
        if (!user) {
        // if user does not exist in our database
          return db.model('User').newUser({
            facebook_id: profile.id,
            token: token,
            name: profile.name.givenName + ' ' + profile.name.familyName,
            email: profile.emails[0].value
          }).save();
        } else {
          console.log('found user: ', user);
          // if user exists in our database
          return user;
        }
      })
      .then(function(user) {
        console.log("this is user profile:", profile);
        return user;
      })
      .then(function(user) {
        return done(null, user);
      })
      .catch(function(err) {
        console.err(err);
        return done(err, false);
      });
    });
  }
  ));
};
