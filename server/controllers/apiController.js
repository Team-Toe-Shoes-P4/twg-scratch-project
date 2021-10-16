const db = require('../config/db');
const User = require('../models/Models');
const mongoose = require('mongoose');
const passwordUtils = require('../utils/passwordUtils.js');

const apiController = {};

apiController.createUser = async (req, res, next) => {
  const {name, email, password} = req.body;
  try {
    // Check if existing user
    // const existingUser = await User.find({email: email});
    // if(existingUser){
    //     console.log("User already exists")
    //     return res.redirect('/login')
    // }

    // Hash Password
    const hash = await passwordUtils.hashPassword(password);
    // Create user with hashed password value
    const newUser = await new User({name:name, email:email, password:hash});
    // Save document
    await newUser.save();
    return next();
  }
  catch (err) {
    return next(err);
  }
};

apiController.findUser = async (req, res, next) => {
  try {
    const {email} = req.params;
    const user = await User.findOne({email});
    res.locals.user = user;
    return next();
  }
  catch (err) {
    return next(err);
  }
};

apiController.getTrips = async (req, res, next) => {
  try {
    const {id} = req.params;
    const trips = await User.findById(mongoose.Types.ObjectId(id)).select('trips').sort({startDate: 1});
    const todayDate = new Date();
    const pastTrips = [];
    const upcomingTrips = [];
    for (let i = 0; i < trips.trips.length; i++) {
      const startDate = new Date(trips.trips[i].startDate);
      if (todayDate > startDate) {pastTrips.push(trips.trips[i]);}
      else {upcomingTrips.push(trips.trips[i]);}

    }
    req.body.trips = {id: trips._id.toString(), pastTrips, upcomingTrips};
    return next();
  }
  catch (err) {
    next(err);
  }
};

apiController.addTrip = async (req, res, next) => {
  console.log('req.body: $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
  console.log(req.body);
  try {
    const {id} = req.params;
    const trip = req.body; 
    console.log('trip', trip);
    //const user = await User.findOne({_id: mongoose.Types.ObjectId(id)});
    //await user.trips.push(trip);
    //await user.save();
    await User.updateOne({_id: mongoose.Types.ObjectId(id)}, {'$push': {
      'trips' : {
        '$each' : [trip],
        '$sort' : {'startDate' : 1}
      }
    }});
    return next();
  }
  catch (err) {
    return next(err);
  }
};

apiController.deleteTrip = async (req, res, next) => {
  try {
    console.log('delete trip req.body', req.body);
    const {id} = req.params;
    const {trip_id} = req.body;
    await User.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {$pull: { trips : {_id: mongoose.Types.ObjectId(trip_id)}}} );
    return next();
  }
  catch (err) {
    return next(err);
  }
};

module.exports = apiController;