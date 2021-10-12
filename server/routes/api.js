const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/getuser/:email', apiController.findUser, (req, res, next) => {
  const user = res.locals.user;
  res.status(200).json({user});
})

router.get('/gettrips/:id', apiController.getTrips, (req, res, next) =>  {
const trips = req.body.trips;
   res.status(200).json(trips);
})

router.put('/addtrip/:id', apiController.addTrip, apiController.getTrips, (req, res, next) => {
    const trips = req.body.trips;
    res.status(200).json(trips);
})

router.put('/deletetrip/:id', apiController.deleteTrip, apiController.getTrips, (req, res, next) => {
    const trips = req.body.trips;
    res.status(200).json(trips);
})

module.exports = router;
