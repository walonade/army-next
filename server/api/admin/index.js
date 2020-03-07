const { Router } = require("express");
const router = Router();
const User = require("./../../models/user");
const { auth, generateJWT } = require("./../../utils/auth.js");
const bcrypt = require("bcryptjs");
router.post("/login", auth.optional, async (req, res) => {
  const { login, password } = req.body;
  try {
    const candidate = await User.findOne({
      where: {
        login
      }
    });
    if (candidate) {
      const { dataValues } = candidate;
      if (dataValues.isAdmin) {
        const isSame = await bcrypt.compare(password, dataValues.password);
        if (isSame) {
          const token = generateJWT(dataValues.id, dataValues.login);
          candidate.token = token;
          candidate.save();
          res.status(200).json({ token });
        } else {
          res.status(404).json({ message: "не верный логин пароль" });
        }
      } else {
        res.status(404).json({ message: "не верный логин пароль" });
      }
    }
  } catch (e) {
    res.status(400).json({ message: "bad response" });
  }
});

module.exports = router;
