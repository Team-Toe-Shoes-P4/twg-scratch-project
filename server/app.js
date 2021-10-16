const express = require('express');
const passport = require('passport');
const session = require('express-session');
// Used to store user sessions in db
const MongoStore = require('connect-mongo');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');

const AppError = require('./utils/appError');
const router = require('./routes/index');
require('./auth/passportLocal.js');
require('./auth/passportGoogle.js');

const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// initializing bodyParser
app.use(express.json({ extended: true }));
app.use(express.json());

app.use(cors());

/* 
    __Express-session config__
- Cookies/sessions are used to maintain state across requests
*/
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // Defaults to "sessions" collection. Delete every 20 mins
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE,
    autoRemoveInterval: 20,
  }),
  cookie: {
    // maxAge Unit: Time in milliseconds: 2 hours
    maxAge: 1000 * 60 * 60 * 2, 
    // secure: true,
    // sameSite : 'none,
  }
}));

/* 
    __Passport.js init__
*/
app.use(passport.initialize()); 
app.use(passport.session());

// // Example session use. Can delete later
// app.use((req, res, next) => {
//   if(req.session.views) req.session.views++
//   else req.session.views = 1;
//   console.log(req.session, '\nUser: \n', req.user,)
//   next();
// })

// ROUTES
app.use('/auth', router.auth);
app.use('/api', router.api);


// IMPORTANT: Make sure to write all route handling BEFORE this one.
// Handle 'page not found' error
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use((err, req, res, next) => {
  // TODO: Implement version for production (ie. less detailed error response)
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
});

module.exports = app;
