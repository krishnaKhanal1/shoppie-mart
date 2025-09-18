const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['Rice', 'Pulses', 'Oil', 'Spices', 'Grains', 'Lentils'],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 4.0,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  weight: {
    type: String,
    default: '1kg',
  },
  brand: {
    type: String,
    default: 'Shoppie Mart',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);