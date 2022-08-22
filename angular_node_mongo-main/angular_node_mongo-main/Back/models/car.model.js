const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    model: Number,
    color: String,
    // _id: {type: String, required: false},
    // seq: { type: Number, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Car', CarSchema);