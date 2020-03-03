const { Router } = require("express");
const router = Router();
const { v4 } = require("uuid");
const Crime = require("./../../models/crime");
const Address = require("./../../models/address");
const { auth } = require("./../../utils/auth.js");
router.post("/add", auth.required, async (req, res) => {
  const { type, date, address, service, object, rota, kui } = req.body;
  try {
    const crime = await Crime.create({
      id: v4(),
      type,
      date,
      address,
      objectOfCrime: object,
      rota,
      kui
    });
    const addressId = await Address.findOne({
      where: {
        value: address
      }
    });
    crime.setAddressId(addressId);
    crime.save();
    res.status(201).json(crime);
  } catch (e) {
    res.status(500).json({ message: "NO" });
    console.log(e);
  }
});
router.post("/get", auth.required, async (req, res) => {
  try {
    const crimes = await Crime.findAll({
      include: [{ model: Address, as: "AddressId" }]
    });
    res.status(200).json(JSON.parse(JSON.stringify(crimes)));
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
