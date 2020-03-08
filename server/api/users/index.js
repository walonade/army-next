const { Router } = require("express");
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
    });
    if (candidate !== null) {
      if (!candidate.isAdmin) {
        const isSame = await bcrypt.compare(password, candidate.password);
        if (isSame) {
          const token = generateJWT(candidate.id, candidate.login);
          candidate.token = token;
          candidate.save();
          res.status(200).json({ token });
        } else {
          res.status(404).json({ message: "не верный логин пароль" });
        }
      } else {
        res.status(401).json({ message: "доступ запрещён" });
      }
    } else {
      res.status(404).json({ message: "не верный логин пароль" });
    }
  } catch (e) {
    res.status(500).json({ message: "возникли проблемы с сервером" });
    console.log(e)
  }
});
module.exports = router;
