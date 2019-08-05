const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../models/User');
const auth = require('../auth.js');
const config = require('../config.js')

const userRegister = (req, res, next) => {
  const { email, password } = req.body;

  const user = new User({
    email, password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, async (err, hash) => {
      // Hash password
      user.password = hash;
      //Save user
      try {
        const newUser = await user.save();
        res.send(201);
      } catch (err) {
        return next(new errors.InternalError(err.message));
      }
    });
  });
};

const userAuth = async (req, res, next) => {
  const { email, password} = req.body;
  try {
    // Auth User
    const user = await auth.authenticate(email, password);
    console.log(user)
    // Create JWT
    const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
      expiresIn: '15m'
    });

    const { iat, exp } = jwt.decode(token);

    res.send({ iat, exp, token });

    next();
  } catch(e) {
    // USer unauth
    return next(new errors.UnauthorizedError(e))
  }
};

module.exports = {
  userRegister,
  userAuth
};
