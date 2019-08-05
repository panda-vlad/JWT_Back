const errors = require('restify-errors');

const Customer = require('../models/Client');

const getCustomers = async (req, res, next) => {
    try {
        const customers = await  Customer.find({});
        res.send(customers)
        next();
    } catch(e) {
        console.log(e)
        return next(new errors.InvalidContentError(e)); 
    }
}

const getSingle = async (req, res, next) => {
    try {
        const customer = await  Customer.findById(req.params.id);
        res.send(customer);
        next();
    } catch(e) {
        console.log(e)
        return next(new errors.ResourceNotFoundError(e.message)); 
    }
}

const postCustomers = async (req, res, next) => {
    if(!req.is('application/json'))
        return next(new errors.InvalidContentError("Expects 'application/json' "));
    
    const { name, email, balance } = req.body;
    const customer = new Customer({
        name,
        email,
        balance  
    });
    try {
        const newCustomer = await customer.save();
        res.send(201);
        next();
    } catch(e) {
        return next(new errors.InternalError(e.message))
    } 
}

const updateCustomers = async (req, res, next) => {
    if(!req.is('application/json'))
        return next(new errors.InvalidContentError("Expects 'application/json' "));
    
    const { name, email, balance } = req.body;
    const customer = new Customer({
        name,
        email,
        balance  
    });
    try {
        const customer = await Customer.findOneAndUpdate(
        {
           _id: req.params.id
        }, req.body);
        res.send(201);
        next();
    } catch(e) {
        return next(new errors.InternalError(e.message))
    } 
}

const deleteCustomers = async (req, res, next) => {
    try {
        const customer = await Customer.findOneAndRemove({_id: req.params.id});
        res.send(204);
        next();
    } catch (e) {
        return next(new errors.InternalError(e.message))
    }
}

module.exports = {
  getCustomers,
  postCustomers,
  getSingle,
  updateCustomers,
  deleteCustomers
};
