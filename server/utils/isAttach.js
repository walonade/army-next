const User = require("./../models/user");
module.exports = async (req, res, next) => {
  try {
    const { tokenData } = req;
    const userRecord = await User.findOne({
      where: {
        login: tokenData.login
      }
    });
    req.currentUser = userRecord;
    if (userRecord === null) {
      return res.status(401).json({ message: "вы не авторизованы" });
    } else {
      return next();
    }
  } catch (e) {
    res.status(500).json({ message: "возникли проблемы с сервером" });
    console.log(e);
  }
};
