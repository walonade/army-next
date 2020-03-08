const { Router } = require("express");
const { v4 } = require("uuid");
const router = Router();
const User = require("./../../../models/user");
const Address = require("./../../../models/address");
const { getTokenFromHeaders } = require("./../../../utils/getToken.js");
const { auth } = require("./../../../utils/auth.js");
router.post("/get", auth.required, async (req, res) => {
  try {
    const token = getTokenFromHeaders(req);
    const admin = await User.findOne({
      where: { token },
      attributes: ["isAdmin"]
    });
    if (admin !== null) {
      if (admin.isAdmin) {
        const addresses = await Address.findAll();
        res.status(200).json(addresses);
      } else {
        res.status(403).json({ message: "вы не администратор" });
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
    const token = getTokenFromHeaders(req);
    const admin = await User.findOne({
      where: { token },
      attributes: ["isAdmin"]
    });
    if (admin !== null) {
      if (admin.isAdmin) {
        const address = await Address.findOne({
          where: { id: req.params.id }
        });
        address.destroy();
        res.status(204);
      } else {
        res.status(401).json({ message: "вы не администратор" });
      }
    } else {
      res.status(401).json({ message: "вы не авторизованы" });
    }
  } catch (e) {
    res.status(500).json({ message: "bad response" });
    console.log(e);
  }
});
router.put("/:id", auth.required, async (req, res) => {
  try {
    const token = getTokenFromHeaders(req);
    const admin = await User.findOne({
      where: { token },
      attributes: ["isAdmin"]
    });
    if (admin !== null) {
      if (admin.isAdmin) {
        const address = await Address.findOne({
          where: { id: req.params.id }
        });
        address.update({ ...address, ...req.body.data });
        address.save();
        res.status(200).json(address);
      } else {
        res.status(403).json({ message: "вы не администратор" });
      }
    } else {
      res.status(401).json({ message: "вы не авторизованы" });
    }
  } catch (e) {
    res.status(500).json({ message: "bad response" });
    console.log(e);
  }
});
module.exports = router;
