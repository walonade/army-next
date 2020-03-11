const expjwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const getTokenFromHeaders = require('./getToken.js');
module.exports.auth = {
  required: expjwt({
    secret: "secret",
    userProperty: "tokenData",
    getToken: getTokenFromHeaders
  }),
  optional: expjwt({
    secret: "secret",
    userProperty: "tokenData",
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
};
module.exports.generateJWT = (id, login) => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  return jwt.sign(
    {
      login,
      id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    "secret"
  );
};
