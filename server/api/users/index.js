const { Router } = require("express")
const User = require("./../../models/user")
const bcrypt = require("bcryptjs")
const router = Router()
const { generateJWT, auth } = require("./../../utils/auth.js")
router.post("/login", async (req, res) => {
 const { login, password } = req.body
 try {
  const candidate = await User.findOne({
   where: {
    login,
   },
  })
  if (candidate !== null) {
    const isSame = await bcrypt.compare(password, candidate.password)
    if (isSame) {
     const token = generateJWT(candidate.id, candidate.login, candidate.isAdmin)
     res.status(200).json({ token, isAdmin: candidate.isAdmin })
    } else {
     res.status(401).end()
    }
  } else {
   res.status(401).end()
  }
 } catch (e) {
  res.status(500).end()
  console.log(e)
 }
})
module.exports = router
