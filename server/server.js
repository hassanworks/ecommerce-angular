const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Product = require('./api/models/productsListModel'), //created model loading here
  Cart = require('./api/models/cartModel'), //created model loading here
  User = require('./api/models/usersModel'), //created model loading here
  bodyParser = require('body-parser'),
  cors = require('cors');

app.use(cors());
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/ecommerce')
  .then(data => {
    console.log('mongo connected successfully...');
  })
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

const productRoutes = require('./api/routes/productsListRoutes'); //importing route
productRoutes(app); //register the route

const cartRoutes = require('./api/routes/cartRoutes'); //importing route
cartRoutes(app); //register the route

const usersRoutes = require('./api/routes/usersRoutes'); //importing route
usersRoutes(app); //register the route

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
