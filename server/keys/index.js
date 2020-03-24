process.env.NODE_ENV === "production"
  ? (module.exports = require("./production"))
  : (module.exports = require("./development"));
