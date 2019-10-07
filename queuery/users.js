const User = require('../service/User');


const userRegister = async (req, res, next) => {
  const { email, password } = req.body;
  const newUser = new User(email, password);
  const status = await newUser.userRegister();
  console.log(status)
  res.send(status.statusCode)
  if(status.error) next(status.error)
  next();
};

const userAuth = async (req, res, next) => {
  const { email, password } = req.body;
  const userAuth = new User( email, password)

  const status = await userAuth.userAuth();
  if(!status.error) res.send(status);
  else next(status.error);
  next();
};

module.exports = {
  userRegister,
  userAuth
};
