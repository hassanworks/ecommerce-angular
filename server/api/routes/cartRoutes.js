'use strict';
var { verify } = require('../controllers/usersController');
module.exports = function (app) {
  var cartList = require('../controllers/cartController');

  app.route('/cart').post(verify, cartList.create_a_cart);

  app.route('/cart/:userId').get(verify, cartList.read_a_cart);

  app.route('/cart').put(verify, cartList.update_a_cart);

  //   app.route('/cart').get(verify, cartList.list_all_carts);
};
