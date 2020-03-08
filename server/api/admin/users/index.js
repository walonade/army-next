const { Router } = require("express");
const { v4 } = require("uuid");
const router = Router();
const User = require("./../../../models/user");
const { getTokenFromHeaders } = require("./../../../utils/getToken.js");
const { auth } = require("./../../../utils/auth.js");
const bcrypt = require("bcryptjs");
router.post("/create", auth.required, async (req, res) => {
  const { login, password, isAdmin, rota } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const id = v4();
  try {
    const admin = await User.findOne({
      where: { token: getTokenFromHeaders(req) },
      attributes: ["isAdmin"]
    });
    if (admin !== null) {
      if (admin.isAdmin) {
        const candidate = await User.findOne({
          where: { login },
          attributes: ["login"]
        });
        if (candidate === null) {
          const user = await User.create({
            id,
            login,
            rota,
            password: hashPassword,
            isAdmin
          });
          user.save();
          res.status(201).json(user);
        } else {
          res
            .status(401)
            .json({ message: "такой пользователь уже существует" });
        }
      } else {
        res.status(401).json({ message: "вы не администратор" });
      }
    } else {
      res.status(401).json({ message: "вы не авторизованы" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "возникли проблемы с сервером" });
  }
});
router.post("/get", auth.required, async (req, res) => {
  try {
    const admin = await User.findOne({
      where: { token: getTokenFromHeaders(req) },
      attributes: ["isAdmin"]
    });
    if (admin.isAdmin) {
      const users = await User.findAll({
        attributes: ["login", "isAdmin", "id", "rota"]
      });
      res.status(200).json(users);
    } else {
      res.status(401).json({ message: "вы не администратор" });
    }
  } catch (e) {
    res.status(500).json({ message: "возникли проблемы с сервером" });
  }
});
router.delete("/:id", auth.required, async (req, res) => {
  try {
    const admin = await User.findOne({
      where: { token: getTokenFromHeaders(req) },
      attributes: ["isAdmin"]
    });
    if (admin.isAdmin) {
      const user = await User.findByPk(req.params.id);
      user.destroy();
      res.status(204);
    } else {
      res.status(401).json({ message: "вы не администратор" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "возникли проблемы с сервером" });
  }
});
module.exports = router;
