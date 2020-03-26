const expjwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const getTokenFromHeaders = require("./getToken.js");
const { SECRET_KEY_TOKEN } = require("./../keys");
module.exports.auth = {
  required: expjwt({
    secret: SECRET_KEY_TOKEN,
    userProperty: "tokenData",
    getToken: getTokenFromHeaders
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
    SECRET_KEY_TOKEN
  );
};
