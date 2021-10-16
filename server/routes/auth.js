const express = require('express');
const passport = require('passport');
const router = express.Router();
const apiController = require('../controllers/apiController');
const authController = require('../controllers/authController');

/* 
  To Do: Decide redirect routes
*/

// Should redirect to client route
const redirects = {
  successRedirect: '/auth/',
  failureRedirect: '/auth/'
};

// // Dev Only && Protected Routes Implementation
router.get('/', authController.protectRoute, (req, res) => {
  res.status(200).json({
    // Created by express-session
    msg: req.session,
    // Created by passport
    // Also populates req.session.passport.user
    user: req.user
  });
});

/* 
  <----- Base passport-local(email) auth ----->
*/
router.get('/verify', authController.verifyAuth, (req, res, next) => {
  return res.status(201).json({isAuth:true, userID: req.user._id});
});
// Don't need final middleware after passport.authenticate("", redirects)
router.post('/login', authController.check, passport.authenticate('local', redirects), (req, res) => {
  console.log('Authenticated');
  res.redirect('/auth/');
});

router.post('/signup', apiController.createUser, passport.authenticate('local', redirects), (req, res) => {
  res.status(201).json({msg: 'Successful signup'});
});

router.get('/logout', (req, res) => {
  req.logout();
  console.log('Logged out');
  res.redirect('/auth/');
});



/* 
  <----- Google Auth ----->
*/
// Start google auth process. Redirects from our server to google's server
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
// URL google server sends user to after auth
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/main');
});

module.exports = router;