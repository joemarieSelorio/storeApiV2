const mongoose = require('mongoose');

const suppliesSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  quantity: Number,
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ratings',
  }],
});

module.exports = mongoose.model('Supplies', suppliesSchema);
