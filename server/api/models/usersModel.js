'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var getUsersSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter your name',
  },
  email: {
    type: String,
    required: 'Please enter your email address',
  },
  password: {
    type: String,
    required: 'Please enter your password',
  },
  Created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Users', getUsersSchema);
