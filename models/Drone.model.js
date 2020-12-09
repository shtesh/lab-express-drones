const mongoose = require('mongoose');
const { Schema, model } = mongoose;
//The Drone model 
const droneSchema = new Schema({
    name: String,
    propellers: Number,
    maxSpeed: Number   
});
//Exporting the drone model
const Drone = model('Drone', droneSchema);
module.exports = Drone;
