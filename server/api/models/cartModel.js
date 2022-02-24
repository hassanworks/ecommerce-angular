'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
  sumOfProducts: {
    type: Number,
  },
  userId: {
    type: Schema.Types.String,
    ref: 'Users',
  },
  products: [
    {
      price: {
        type: Number,
        required: 'Kindly enter the price of the product',
      },
      inCart: {
        type: Number,
        required: 'Kindly enter the inCart of the product',
      },
      productDetail: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
      },
    },
  ],
});

module.exports = mongoose.model('Carts', cartSchema);
