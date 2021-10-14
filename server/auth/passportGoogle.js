const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/Models');
const passwordUtils = require('../utils/passwordUtils.js');

// Serialization occurs in passportLocal.js

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/redirect',
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  const defaultUser = {
    name: profile.displayName,
    email: profile.emails[0].value,
    googleId: profile
  };
  try {
    console.log(profile);
    // Look up user to see if they're already registered
    const user = await User.findOne({googleId: profile.id});
    if(user) return done(null, user);
    // If not registered, create a new user in DB
    else {
      const newUser = await new User({
        ...defaultUser, 
        password: await passwordUtils.hashPassword('what password do I give them on Google sign up? it\'s required in the schema')
      });
      await newUser.save();
      done(null, newUser);
    }
  } catch(error) {
    return done(error);
  }
}));