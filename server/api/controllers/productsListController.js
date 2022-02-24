'use strict';

var mongoose = require('mongoose'),
  Product = mongoose.model('Products');

exports.list_all_products = function (req, res) {
  Product.find({}, function (err, product) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(product);
  });
};

// exports.create_a_product = function (req, res) {
//   var new_product = new Product(req.body);
//   new_product.save(function (err, product) {
//     if (err) {
//       res.send(err);
//       return;
//     }
//     res.json(product);
//   });
// };
