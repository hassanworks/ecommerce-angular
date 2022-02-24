'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  User = mongoose.model('Users'),
  jwt = require('jsonwebtoken');

exports.create_a_user = async function (req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(500).send('User already exist');
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  var new_user = new User(req.body);
  new_user.save(function (err, _user) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(_user);
  });
};

exports.create_a_login = async function (req, res) {
  let user = {};
  User.findOne({ email: req.body.email })
    .then(_user => {
      if (!_user) return res.status(404).send('User does not exist');
      user = _user;
      return bcrypt.compare(req.body.password, _user.password);
    })
    .then(result => {
      if (!result) return res.status(404).send('Password doesnot match');
      return jwt.sign(
        {
          name: user.name,
          email: req.body.email,
          userId: user._id,
        },
        'secretkey'
      );
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      return res.send(err);
    });
};

exports.verify = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  var bearer = bearerHeader.split(' ')[1];
  let token = ''
  try {
    let parse = JSON.parse(bearer);
    token = parse.token;
  }
  catch(e) {
    token = bearer.token;
  }
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};
