const express = require("express");
const { Router } = require("express");
const next = require("next");
const sequelize = require("./utils/database.js");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const util = require("util");
const UserRoute = require("./api/users");
const AddressRoute = require("./api/addresses");
const CrimeRoute = require('./api/crimes');
const AdminRoute = require('./api/admin');
const AdminRouteUser = require('./api/admin/users');
const AdminRouteAddress = require('./api/admin/addresses');
app.prepare().then(() => {
  const server = express();
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use("/api/user", UserRoute);
  server.use("/api/address", AddressRoute);
  server.use("/api/crime", CrimeRoute);
  server.use("/api/admin", AdminRoute);
  server.use("/api/admin/users", AdminRouteUser);
  server.use("/api/admin/addresses", AdminRouteAddress);
  server.all("*", (req, res) => {
    return handle(req, res);
  });
  server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Accept, Content-Type, Authorization"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
      res.status(200).end();
    }
    next();
  });
  const start = async () => {
    try {
      await sequelize.sync();
      server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
      });
    } catch (err) {
      console.log(error);
    }
  };
  start();
});
