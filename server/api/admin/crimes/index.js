const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { v4 } = require("uuid");
const moment = require("moment");
const Crime = require("./../../../models/crime");
const Address = require("./../../../models/address");
const { auth } = require("./../../../utils/auth");
const isAttach = require("./../../../utils/isAttach.js");
router.post("/get", auth.required, isAttach, async (req, res) => {
  try {
    const admin = req.currentUser.isAdmin;
    if (admin) {
      const { from, to } = req.body;
      const format = "YYYY-MM-DD HH:mm:ss";
      const fromBase = moment(from)
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0);
      const toBase = moment(to)
        .set("hour", 23)
        .set("minute", 59)
        .set("second", 59);
      const dateFrom = moment(fromBase).format(format);
      const dateTo = moment(toBase).format(format);
      const crimes = await Crime.findAll({
        where: {
          date: {
            [Op.between]: [dateFrom, dateTo]
          }
        },
        include: [{ model: Address, as: "AddressId" }]
      });
      res.status(200).json(crimes);
    } else {
      res.status(401).json({ message: "вы не авторизованы" });
    }
  } catch (e) {
    res.status(500).json({ message: "возникли проблемы с сервером" });
  }
});
module.exports = router;
