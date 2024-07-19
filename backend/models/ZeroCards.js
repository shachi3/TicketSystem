const mongoose = require('mongoose');

const zeroCardSchema = new mongoose.Schema({
 cardNumber: { type: String, required: true, unique: true },
 balance: { type: Number, required: true },
});

module.exports = mongoose.model('ZeroCard', zeroCardSchema);
