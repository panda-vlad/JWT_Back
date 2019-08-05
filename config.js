module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT ||  3001,
  URL: process.env.URL ||  'http://localhost:3001',
  MONGODB_URL: process.env.MONGODB_URL ||  'mongodb://jwt:jwt123@ds261096.mlab.com:61096/jwt',
  JWT_SECRET: process.env.JWT_SECRET || 'secret1',
};
