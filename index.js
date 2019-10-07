const restify = require('restify');
const mongoose = require('mongoose');

const config = require('./config');
const rjwt = require('restify-jwt-community');
const corsMiddleware = require('restify-cors-middleware');

const server = restify.createServer();

//Cors
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
})
 
server.pre(cors.preflight)
server.use(cors.actual)

// Middleware
server.use(restify.plugins.bodyParser());

// Protect Routes
//server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }));

server.listen(config.PORT, () => {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(
    config.MONGODB_URL,
    { useNewUrlParser: true }
  );
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
  require('./routes/customers')(server);
  require('./routes/users')(server);
  console.log('Server started on port ', config.PORT);
})
;
