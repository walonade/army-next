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
  const { type, date, address, service, object, kui, patrol } = req.body;
  try {
    const user = await User.findOne({
      where: {
        token: getTokenFromHeaders(req)
      },
      attributes: ["rota", "isAdmin"]
    });
    if (user !== null) {
      if (user.rota !== null && !user.isAdmin) {
        const crime = await Crime.create({
          id: v4(),
          type,
          date,
          address,
          object,
          rota: user.rota,
          kui,
          service,
          patrol
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
      } else {
        res.status(401).json({ message: "вы не авторизованы" });
      }
    } else {
      res.status(401).json({ message: "вы не авторизованы" });
    }
  } catch (e) {
    res.status(500).json({ message: "возникли проблемы с сервером" });
    console.log(e);
  }
});
router.post("/get", auth.required, async (req, res) => {
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
  try {
    const user = await User.findOne({
      where: {
        token: getTokenFromHeaders(req)
      },
      attributes: ["rota", "isAdmin"]
    });
    if (user !== null) {
      if (!user.isAdmin) {
        const crimes = await Crime.findAll({
          where: {
            rota: user.rota,
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
    } else {
      res.status(401).json({ message: "вы не авторизованы" });
    }
  } catch (e) {
    res.status(500).json({ message: "возникли проблемы с сервером" });
    console.log(e);
  }
});
router.put("/:id", auth.required, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        token: getTokenFromHeaders(req)
      },
      attributes: ["isAdmin"]
    });
    if (user !== null) {
      if (!user.isAdmin) {
        const crime = await Crime.findByPk(req.params.id);
        res.status(201).json(crime)
      } else {
        res.status(401).json({ message: "вы не авторизованы" });
      }
    } else {
      res.status(401).json({ message: "вы не авторизованы" });
    }
  } catch (e) {
    res.status(500).json({ message: "возникли проблемы с сервером" });
    console.log(e);
  }
});
router.delete("/:id", auth.required, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        token: getTokenFromHeaders(req)
      },
      attributes: ["isAdmin"]
    });
    if (user !== null) {
      if (!user.isAdmin) {
        const crime = await Crime.findByPk(req.params.id);
        crime.destroy();
        crime.save();
        res.status(204).json({message: "удалено"});
      } else {
        res.status(401).json({ message: "вы не авторизованы" });
      }
    } else {
      res.status(401).json({ message: "вы не авторизованы" });
    }
  } catch (e) {
    res.status(500).json({ message: "возникли проблемы с сервером" });
    console.log(e);
  }
});
module.exports = router;
