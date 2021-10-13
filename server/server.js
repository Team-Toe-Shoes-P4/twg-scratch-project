require('dotenv').config();
/* eslint-disable implicit-arrow-linebreak */
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// TODO
// Yelp API ?
// see yelp-notes.txt

const colors = require('colors');
const PORT = process.env.PORT;

// importing and connecting to DB in MongoDB
// Ideally, server should not run until the db is connected
const connectDB = require('./config/db.js');

let server;
connectDB().then(() => {
  server = app.listen(PORT, () =>
    console.log(
      `Server running in node env: ${process.env.NODE_ENV} listening on port: ${PORT}`.brightCyan
        .bold,
    ),
  );
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
