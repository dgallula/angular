const Car = require('../models/car.model');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.color) {
        return res.status(400).send({
            message: "Car color can not be empty"
        });
    }

    // Create a Car
    const car = new Car({
        model: req.body.model || 2010, 
        color: req.body.color || 'black'
    });

    // Save Car in the database
    car.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Car."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Car.find().then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single car with a noteId
exports.findOne = (req, res) => {
    Car.findById(req.params.carId)
    .then(car => {
        if(!car) {
            return res.status(404).send({
                message: "Car not found with id " + req.params.carId
            });            
        }
        res.send(car);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Car not found with id " + req.params.carId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving car with id " + req.params.carId
        });
    });
};

// Update a car identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.model) {
        return res.status(400).send({
            message: "Car model can not be empty"
        });
    }

    // Find car and update it with the request body
    Car.findByIdAndUpdate(req.params.carId, {
        color: req.body.color || "red",
        model: req.body.model
    }, {new: true})
    .then(car => {
        if(!car) {
            return res.status(404).send({
                message: "Car not found with id " + req.params.carId
            });
        }
        res.send(car);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Car not found with id " + req.params.carId
            });                
        }
        return res.status(500).send({
            message: "Error updating car with id " + req.params.carId
        });
    });
};

// Delete a car with the specified noteId in the request
exports.delete = (req, res) => {
    Car.findByIdAndRemove(req.params.carId)
    .then(car => {
        if(!car) {
            return res.status(404).send({
                message: "Car not found with id " + req.params.carId
            });
        }
        res.send({message: "Car deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Car not found with id " + req.params.carId
            });                
        }
        return res.status(500).send({
            message: "Could not delete car with id " + req.params.carId
        });
    });
};