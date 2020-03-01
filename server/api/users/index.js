const { Router } = require("express");
const { v4 } = require("uuid");
const User = require("./../../models/user");
const bcrypt = require("bcryptjs");
const router = Router();
const { generateJWT, auth } = require("./../../utils/auth.js");
router.post("/login", auth.optional, async (req, res) => {
  const { login, password } = req.body;
  try {
    const candidate = await User.findOne({
      where: {
        login
      },
      attributes: ["password", "isAdmin", "id"]
    });
    if (candidate) {
      const { dataValues } = candidate;
      const isSame = await bcrypt.compare(password, dataValues.password);
      if (isSame) {
        const token = generateJWT(dataValues.id, dataValues.login);
        res.status(200).json({ token });
      } else {
        res.status(404).json({ message: "не верный логин пароль" });
      }
    } else {
      res.status(404).json({ message: "не верный логин пароль" });
    }
  } catch (e) {
    res.status(400).json({ message: "bad response" });
  }
});
router.get("/", auth.required, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: "bad response" });
  }
});
router.post("/create", async (req, res) => {
  const { login, password, isAdmin } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const id = v4();
  try {
    const user = await User.create({
      id,
      login,
      password: hashPassword,
      isAdmin
    });
    user.save();
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: "bad response" });
  }
});
router.put("/:id", auth.required, async (req, res) => {
  const { login, password, isAdmin } = req.body;
  try {
    const user = await User.findByPk(+req.params.id);
    user.login = login;
    user.password = password;
    user.isAdmin = isAdmin;
    user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "bad response" });
  }
});
router.delete("/:id", auth.required, async (req, res) => {
  try {
    const user = await User.findByPk(+req.params.id);
    user.destroy();
    res.status(204).json({});
  } catch (err) {
    res.status(500).json({ message: "bad response" });
  }
});
module.exports = router;
