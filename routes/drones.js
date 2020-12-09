const express = require('express');
const { findByIdAndUpdate, findByIdAndRemove } = require('./../models/Drone.model');
// require the Drone model here
const Drone = require('./../models/Drone.model');

const router = express.Router();

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const drones = await Drone.find();
    res.render('drones/list', { drones });
  } catch(error) {
    console.log('Error while retrieving list of drones', error)
  }
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form');
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  //get all the info the user submitted through the form
  const newDrone = req.body;
  //create a new drone in the Db in the drones colletion
  try {
    const createdDrone = await Drone.create(newDrone);
    res.redirect('/drones');
  } catch (error) {
    console.log('Error while creating new drone', error)
  }
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  try {
    //getting the right drone from the Db by id
    const drone = await Drone.findById(id);
    //rendering the drones/update-form.hbs view, passing the drone object to the view
    res.render('drones/update-form', { drone });
  } catch (error) {
    console.log('Error while retrieving one drone', error)
  }
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  //get all the info user submitted through the form
  const { name, propellers, maxSpeed } = req.body;
  try {
    await Drone.findByIdAndUpdate(id, { name, propellers: Number(propellers), maxSpeed: Number(maxSpeed) }, { new: true });
    res.redirect('/drones');
  } catch (error) {
    console.log('Error while retrieving one drone', error)
  }
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params;
  try {
    await Drone.findByIdAndRemove(id);
    res.redirect('/drones');
  } catch (error) {
    console.log('Error while deleting one drone', error)
  }
});

module.exports = router;
