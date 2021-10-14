const mongoose = require('mongoose');
const TripSchema = new mongoose.Schema(
  {
    locationName: String, 
    coordinates: {latitude: Number, longitude:Number},
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    description: String, 
  }
);

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    googleId: {
      type: String,
      require: false,
    },
    trips: [{type: TripSchema, required: false}]
  }
);



module.exports = mongoose.model('user', UserSchema);
