const { Router } = require("express")
const { v4 } = require("uuid")
const router = Router()
const Address = require("./../../models/address")
router.get("/", async (req, res) => {
 try {
  const addresses = await Address.findAll({ attributes: ["value"] })
  res.status(200).json(addresses)
 } catch (e) {
  res.status(500).end()
  console.log(e)
 }
})
module.exports = router
