const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = (email, pass) => {
    return new Promise(async (resolve, reject) => {
         try {
             const user = await User.findOne({email})
             // Match password
             bcrypt.compare(pass, user.password, (err, ismatch)=> {
                 if (err) throw err;
                 if(ismatch){
                     resolve(user);
                 } else {
                     // Pass did not match
                     reject('Auth failed')
                 }
             })
            } catch (err) {
            // email not found 
            reject('Authentication Failed')
         }
    })
}