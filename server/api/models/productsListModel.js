'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var getProductsSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the product',
  },
  price: {
    type: Number,
    required: 'Kindly enter the price of the product',
  },
  inCart: {
    type: Number,
    required: 'Kindly enter the in cart of the product',
  },
  category: {
    type: String,
    required: 'Kindly enter the category of the product',
  },
  productImage: {
    type: String,
  },
  Created_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: [
      {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
      },
    ],
    default: ['pending'],
  },
});

module.exports = mongoose.model('Products', getProductsSchema);
