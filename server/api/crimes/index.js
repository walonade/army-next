const { Router } = require("express");
const router = Router();
const { v4 } = require("uuid");
const Crime = require('./../../models/crime');
const { auth } = require("./../../utils/auth.js");
router.post("/add", auth.required, async (req, res) => {
  try {
    console.log(req.body)
    res.status(200).json({"message": "OK"})
  } catch (e) {
    res.status(500).json({"message": "NO"})
  }
})
module.exports = router;
