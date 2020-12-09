const { Mongoose } = require('mongoose');
const Drone = require('../models/Drone.model');
require('./../configs/db.config');

// Creating an array of 3 objects
const drones = [
    { name: 'Creeper XL 500', propellers: 3, maxSpeed: 12 },
    { name: 'Racer 57', propellers: 4, maxSpeed: 20 },
    { name: 'Courier 3000i', propellers: 6, maxSpeed: 18 }
];

const seedDatabase = async () => {
    try {
        //calling the Drone model's .create() method with the array as an argument
        const createdDrones = await Drone.create(drones);
        //outputing how many drones have been created
        console.log(`Created ${createdDrones.length} drones`);
        //closing the connection with the database after it was seeded
        mongoose.connection.close();
    //catching and outputing the error
    } catch (error) {
        console.log('Error while seeding the database:>> ', error);
    }
};
seedDatabase();