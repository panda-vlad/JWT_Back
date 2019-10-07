const bcrypt = require('bcryptjs');
const errors = require('restify-errors');
const jwt = require('jsonwebtoken')

const modelUser = require('../models/User');
const auth = require('../auth.js');
const config = require('../config.js')

module.exports = class User {
    constructor(email, password) {
        if (!email) throw new Error('Email is required')
        if (!password) throw new Error('Password is required')
        this.email= email;
        this.password = password;
    }
    async userRegister() {
        const user = new modelUser({
            email: this.email,
            password: this.password
          });
          const salt = await new Promise((resolve, reject) => {
              bcrypt.genSalt(10, (err, salt) => {
                  if(err) reject(err);
                  resolve(salt)
              })
          })
          const hash = await bcrypt.hash(this.password,salt);
          try {
              user.password = hash;
              await user.save();
              return{statusCode: 201};
          } catch (err) {
              return {error: new errors.InternalError(err.message)}
          }
    }

    async userAuth() {
        try{
            const user = await auth.authenticate(this.email, this.password)
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                expiresIn: '15m'
              });
            const { iat, exp } = jwt.decode(token);

            return { iat, exp, token }
        } catch(err) {
           return { error: new errors.UnauthorizedError(err)}
        }
    }
    
}