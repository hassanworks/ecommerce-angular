'use strict';
var mongoose = require('mongoose'),
  Product = mongoose.model('Products');
const multer = require('multer');
module.exports = function (app) {
  var productsList = require('../controllers/productsListController');
  var { verify } = require('../controllers/usersController');

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/src/assets/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage, fileFilter: fileFilter });

  app.route('/products').get(productsList.list_all_products);

  app
    .route('/products')
    .post(upload.single('productImage'), async (req, res) => {
      console.log('req.body', req.body);
      console.log('req.file', req.file);

      let new_product = new Product({
        name: req.body.name,
        price: req.body.price,
        inCart: req.body.inCart,
        category: req.body.category,
        productImage: req.file.filename,
      });

      new_product.save(function (err, product) {
        if (err) {
          res.send(err);
          return;
        }
        res.json(product);
      });
    });
};
