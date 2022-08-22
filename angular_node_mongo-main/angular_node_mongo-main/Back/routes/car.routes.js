module.exports = (app) => {
    const cars = require('../controllers/car.controller');

    // Create a new car
    app.post('/cars', cars.create);

    // Retrieve all cars
    app.get('/cars', cars.findAll);

    // Retrieve a single car with carId
    app.get('/cars/:carId', cars.findOne);

    // Update a car with carId
    app.put('/cars/:carId', cars.update);

    // Delete a car with carId
    app.delete('/cars/:carId', cars.delete);
}