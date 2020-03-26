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
      return res.status(401).end();
    } else {
      return next();
    }
  } catch (e) {
    res.status(500).end();
    console.log(e);
  }
};
