const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Models');
const passwordUtils = require('../utils/passwordUtils.js');
/* 
    <---- PASSPORT DEMO ----->
    -- Here we tell passport which authentication-strategy middleware we want to use. 
    -- The purpose of the "verify-callback" we provide to our auth-strategy
    is to:
     1. Query user credentials with hash in DB
     2. If found, provide a verified user to passport.

    -- inputFields: determine which req.body properties map to the arguments for the 
       verifyCallback

    -- done: callback with parameters (error, user)
*/
const inputFields = {
  usernameField: 'email',
  passwordField: 'password'
};
const verifyCallback =  async (username, password, done) => {
  try {
    const user = await User.findOne({email:username});
    if(!user) return done(null, false);
    if(!(await passwordUtils.verifyPassword(password, user.password))) return done(null, false);
    return done(null, user);
  }
  catch(error) {
    done(error);
  }
};
passport.use(new LocalStrategy(inputFields, verifyCallback));

/* 
    -- Serializing a user determines which data of the user object
       should be stored in the session.
    -- serializeUser() sets a property on the client cookie
    -- deserializeUser() uses the cookie id to db look up the user 
       and retrieve the user object on subsequent HTTP requests
*/
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done)=>{
  try {
    const user = await User.findById(id).catch(error=>{
      console.log('Error deserializing. \n');
      done(error);
    });
    if(!user) return done(null, false);
    done(null, user);
  }
  catch(err) {
    done(err);
  }
});