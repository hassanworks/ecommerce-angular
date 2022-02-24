'use strict';
var mongoose = require('mongoose'),
  Cart = mongoose.model('Carts');

exports.create_a_cart = function (req, res) {
  var new_task = new Cart();
  new_task.products = req.body.products;
  new_task.userId = req.body.userId;
  new_task.sumOfProducts = req.body.sumOfProducts;
  new_task.save(function (err, task) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(task);
  });
};

exports.read_a_cart = function (req, res) {
  Cart.find({ userId: req.params.userId })
    .populate({ path: 'products.productDetail', select: 'name' })
    .exec(function (err, task) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(task);
    });
};

exports.update_a_cart = function (req, res) {
  Cart.findOneAndDelete({ userId: req.body.userId }, function (err, task) {
    if (err) {
      res.send(err);
      return;
    }
    var new_task = new Cart();
    new_task.products = req.body.products;
    new_task.userId = req.body.userId;
    new_task.sumOfProducts = req.body.sumOfProducts;
    new_task.save(function (err, task) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(task);
    });
  });
};

// exports.list_all_carts = function (req, res) {
//   Cart.find()
//     .populate('products.productDetail')
//     .exec(function (err, task) {
//       if (err) {
//         res.send(err);
//         return;
//       }
//       res.json(task);
//     });
// };
