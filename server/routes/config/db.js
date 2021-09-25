const mongoose = require("mongoose");
// const config = require("config");
const colors = require("colors");

//console.log(process.env.DATABASE, "ENV".bgMagenta);

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
  });
  try {
    console.log("Database is connected in server.js".yellow);
  } catch (e) {
    console.log(e.message, `error`.bgCyan);
    process.exit(1);
  }
};

module.exports = connectDB;
