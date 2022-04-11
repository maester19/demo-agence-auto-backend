const mongoose = require('mongoose');

const voitureSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdDate: { type: Date, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Voirure', voitureSchema); 