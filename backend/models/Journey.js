const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
 cardNumber: { type: String, required: true },
 passengerType: { type: String, required: true },
 journeyType: { type: String, required: true }, // single or return
 date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Journey', journeySchema);
