const { Router } = require("express");
const { v4 } = require("uuid");
const router = Router()
const Address = require('./../../models/address');
const { auth } = require("./../../utils/auth.js");
router.get('/', async (req, res) => {
  try {
    const addresses = await Address.findAll({attributes: ["value"]})
    res.status(200).json(JSON.parse(JSON.stringify(addresses)))
  } catch (e) {
    res.status(400).json({"message": "не верно"})
  }
})
module.exports = router;
