const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { v4 } = require("uuid");
const moment = require("moment");
const Crime = require("./../../models/crime");
const Address = require("./../../models/address");
const User = require("./../../models/user");
const { auth } = require("./../../utils/auth.js");
const { getTokenFromHeaders } = require("./../../utils/getToken.js");
router.post("/add", auth.required, async (req, res) => {
  const { type, date, address, service, object, kui } = req.body;
  try {
    const {
      dataValues: { rota }
    } = await User.findOne({
      where: {
        token: getTokenFromHeaders(req)
      },
      attributes: ["rota"]
    });
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
    const addressData = await crime.getAddressId();
    res.status(201).json({ addressData, crime });
  } catch (e) {
    res.status(500).json({ message: "NO" });
    console.log(e);
  }
});
router.post("/get", auth.required, async (req, res) => {
  const { from, to } = req.body;
  const format = "YYYY-MM-DD HH:mm:ss";
  const setHours = date =>
    moment(date)
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0);
  const dateFrom = moment(setHours(from)).format(format);
  const dateTo = moment(setHours(to)).format(format);
  console.log(dateFrom, dateTo);
  try {
    const {
      dataValues: { rota }
    } = await User.findOne({
      where: {
        token: getTokenFromHeaders(req)
      },
      attributes: ["rota"]
    });
    const crimes = await Crime.findAll({
      where: {
        rota,
        date: {
          [Op.between]: [dateFrom, dateTo]
        }
      },
      include: [{ model: Address, as: "AddressId" }]
    });
    console.log(crimes);
    res.status(200).json(crimes);
  } catch (e) {
    console.log(e);
  }
});
router.put("/:id", auth.required, async (req, res) => {
  try {
    const crime = await Crime.findByPk(req.params.id);
  } catch (e) {
    console.log(e);
  }
});
router.delete("/:id", auth.required, async (req, res) => {
  try {
    const crime = await Crime.findByPk(req.params.id);
    crime.destroy();
    crime.save();
    res.status(200).json();
  } catch (e) {
    res.status(500).json({ message: "bad response" });
    console.log(e);
  }
});
module.exports = router;
