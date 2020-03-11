const { Router } = require("express");
const { v4 } = require("uuid");
const router = Router();
const Address = require("./../../../models/address");
const { auth } = require("./../../../utils/auth.js");
const isAttach = require("./../../../utils/isAttach.js");
router.post("/get", auth.required, isAttach, async (req, res) => {
  try {
    const admin = req.currentUser.isAdmin;
    if (admin) {
      const addresses = await Address.findAll();
      res.status(200).json(addresses);
    } else {
      res.status(403).json({ message: "вы не администратор" });
    }
  } catch (e) {
    res.status(500).json({ message: "возникли проблемы с сервером" });
    console.log(e);
  }
});
router.delete("/:id", auth.required, isAttach, async (req, res) => {
  try {
    const admin = req.currentUser.isAdmin;
    if (admin) {
      const address = await Address.findOne({
        where: { id: req.params.id }
      });
      address.destroy();
      res.status(204);
    } else {
      res.status(401).json({ message: "вы не администратор" });
    }
  } catch (e) {
    res.status(500).json({ message: "возникли проблемы с сервером" });
    console.log(e);
  }
});
router.put("/:id", auth.required, isAttach, async (req, res) => {
  try {
    const admin = req.currentUser.isAdmin;
    if (admin) {
      const address = await Address.findOne({
        where: { id: req.params.id }
      });
      address.update({ ...address, ...req.body.data });
      address.save();
      res.status(200).json(address);
    } else {
      res.status(403).json({ message: "вы не администратор" });
    }
  } catch (e) {
    res.status(500).json({ message: "возникли проблемы с сервером" });
    console.log(e);
  }
});
module.exports = router;
