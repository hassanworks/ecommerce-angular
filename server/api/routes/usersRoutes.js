'use strict';
module.exports = function (app) {
  var usersList = require('../controllers/usersController');

  // todoList Routes
  app.route('/users').post(usersList.create_a_user);

  app.route('/login').post(usersList.create_a_login);
};
