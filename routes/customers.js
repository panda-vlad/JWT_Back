const queuery = require('../queuery/customers');
const rjwt =require('restify-jwt-community');

const config = require('../config.js');


module.exports = server => {
  server.get('/customers',/* rjwt({secret: config.JWT_SECRET}),*/queuery.getCustomers);
  server.post('/customers', queuery.postCustomers);
  server.get('/customers/:id', queuery.getSingle);
  server.put('/customers/:id', queuery.updateCustomers);
  server.del('/customers/:id', queuery.deleteCustomers);
};
