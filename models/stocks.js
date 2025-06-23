const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  likes: { type: [String], default: [] } // Store IPs to prevent duplicate likes
});

module.exports = mongoose.model('Stock', stockSchema);
