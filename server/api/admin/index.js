const { Router } = require("express")
const router = Router()
const User = require("./../../models/user")
const { auth, generateJWT } = require("./../../utils/auth.js")
const bcrypt = require("bcryptjs")
router.post("/login", async (req, res) => {
 const { login, password } = req.body
 try {
  const candidate = await User.findOne({
   where: {
    login,
   },
  })
  if (candidate) {
   if (candidate.isAdmin) {
    const isSame = await bcrypt.compare(password, candidate.password)
    if (isSame) {
     const token = generateJWT(candidate.id, candidate.login)
     res.status(200).json({ token })
    } else {
     res.status(401).end()
    }
   } else {
    res.status(401).end()
   }
  }
 } catch (e) {
  res.status(500).end()
 }
})

module.exports = router
