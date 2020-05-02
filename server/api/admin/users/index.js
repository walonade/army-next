const { Router } = require("express")
const { v4 } = require("uuid")
const router = Router()
const User = require("./../../../models/user")
const { auth } = require("./../../../utils/auth.js")
const isAttach = require("./../../../utils/isAttach.js")
const bcrypt = require("bcryptjs")
router.post("/create", auth.required, isAttach, async (req, res) => {
 try {
  const { login, password, rota } = req.body
  const hashPassword = await bcrypt.hash(password, 10)
  const id = v4()
  const admin = req.currentUser.isAdmin
  if (admin) {
   const candidate = await User.findOne({
    where: { login },
    attributes: ["login"],
   })
   if (candidate === null) {
    const user = await User.create({
     id,
     login,
     rota,
     password: hashPassword,
     isAdmin: false,
    })
    user.save()
    res.status(201).json(user)
   } else {
    res.status(208).end()
   }
  } else {
   res.status(401).end()
  }
 } catch (e) {
  res.status(500).end()
 }
})
router.put("/change_password", auth.required, isAttach, async (req, res) => {
 try {
  const admin = req.currentUser.isAdmin
  if (admin) {
   const { password } = req.body
   const hashPassword = await bcrypt.hash(password, 10)
   const user = await User.findOne({
    where: {
     login: "admin",
     isAdmin: true,
    },
   })
   await user.update({
    password: hashPassword,
   })
   res.status(202).json({ message: "OK" })
  } else {
   res.status(401).end()
  }
 } catch (e) {
  res.status(500).end()
 }
})
router.get("/get", auth.required, isAttach, async (req, res) => {
 try {
  const admin = req.currentUser.isAdmin
  if (admin) {
   const users = await User.findAll({
    where: {
     isAdmin: false,
    },
    attributes: ["login", "isAdmin", "id", "rota"],
   })
   res.status(200).json(users)
  } else {
   res.status(401).end()
  }
 } catch (e) {
  res.status(500).end()
 }
})
router.delete("/:id", auth.required, isAttach, async (req, res) => {
 try {
  const admin = req.currentUser.isAdmin
  if (admin) {
   const user = await User.findByPk(req.params.id)
   user.destroy()
   res.status(204).end()
  } else {
   res.status(401).end()
  }
 } catch (err) {
  res.status(500).end()
 }
})
module.exports = router
