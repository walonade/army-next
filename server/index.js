const express = require("express")
const os = require("os")
require("dotenv").config()
const next = require("next")
const sequelize = require("./utils/database.js")
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()
const UserRoute = require("./api/users")
const AddressRoute = require("./api/addresses")
const CrimeRoute = require("./api/crimes")
const AdminRouteUser = require("./api/admin/users")
const AdminRouteAddress = require("./api/admin/addresses")
const  SistemDataRoute = require("./api/sistemData")
const { PORT } = require("./keys")
app.prepare().then(() => {
 const server = express()
 server.use(express.urlencoded({ extended: true }))
 server.use(express.json())
 server.use("/api/user", UserRoute)
 server.use("/api/address", AddressRoute)
 server.use("/api/crime", CrimeRoute)
 server.use("/api/admin/user", AdminRouteUser)
 server.use("/api/admin/address", AdminRouteAddress)
 server.use("/api/sistem_data", SistemDataRoute)
 server.all("*", (req, res) => {
  return handle(req, res)
 })
 server.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
  res.header(
   "Access-Control-Allow-Headers",
   "Origin, Accept, Content-Type, Authorization"
  )
  res.header("Access-Control-Allow-Credentials", "true")
  next()
 })
 const setHost = () => {
  const networkData = os.networkInterfaces()
  let host
  if (networkData["Ethernet"] !== undefined) {
   networkData["Ethernet"].forEach(ip => {
    if (ip.family === "IPv4") host = ip.address
   })
  } else {
   networkData["Loopback Pseudo-Interface 1"].forEach(ip => {
    if (ip.family === "IPv4") host = ip.address
   })
  }
  return host
 }
 const host = setHost()
 ;(async () => {
  try {
   await sequelize.sync({ logging: false })
   server.listen(PORT, host, err => {
    if (err) throw err
    console.log(`> Ready on http://${host}:${PORT}`)
   })
  } catch (err) {
   console.log(err)
  }
 })()
})
