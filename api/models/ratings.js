const mongoose = require('mongoose');

const ratingsSchema = new mongoose.Schema({
  user: String,
  rating: Number,
});

module.exports = mongoose.model('Ratings', ratingsSchema);
