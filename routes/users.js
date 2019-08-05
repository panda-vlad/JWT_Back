const queuery = require('../queuery/users');

module.exports = server => {
  server.post('/reqister', queuery.userRegister);
  server.post('/auth', queuery.userAuth);
};
