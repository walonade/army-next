const { Router } = require("express")
const router = Router()
const { Op } = require("sequelize")
const { v4 } = require("uuid")
const moment = require("moment")
const Crime = require("./../../models/crime")
const Address = require("./../../models/address")
const { auth } = require("./../../utils/auth.js")
const isAttach = require("./../../utils/isAttach.js")
router.post("/add", auth.required, isAttach, async (req, res) => {
 try {
  const { type, date, address, service, object, kui, patrolWay, addressNote } = req.body
  const user = req.currentUser
  if (!user.isAdmin) {
   const crime = await Crime.create({
    id: v4(),
    type,
    date,
    address,
    object,
    rota: user.rota,
    kui,
    service,
    patrolWay,
    addressNote
   })
   const addressId = await Address.findOne({
    where: {
     value: address,
    },
   })
   crime.setAddressId(addressId)
   crime.save()
   const addressData = await crime.getAddressId()
   res.status(201).json({ addressData, crime })
  } else {
   res.status(401).end()
  }
 } catch (e) {
  res.status(500).end()
  console.log(e)
 }
})
router.get("/get", auth.required, isAttach, async (req, res) => {
 try {
  const user = req.currentUser
  const { from, to } = req.query
  const format = "YYYY-MM-DD HH:mm:ss"
  const fromBase = moment(from).set("hour", 0).set("minute", 0).set("second", 0)
  const toBase = moment(to).set("hour", 23).set("minute", 59).set("second", 59)
  let fromBaseDiff
  let toBaseDiff
  const dateFrom = moment(fromBase).format(format)
  const dateTo = moment(toBase).format(format)
  const daysDiffrent = toBase.diff(fromBase, "days")
  if (daysDiffrent !== 0) {
   fromBaseDiff = fromBase.set("year", fromBase.get("year") - 1).format(format)
   toBaseDiff = toBase.set("year", toBase.get("year") - 1).format(format)
  }
  const isRota = !user.isAdmin ? { rota: user.rota } : {}
  const search =
   daysDiffrent > 7
    ? {
       [Op.or]: [
        { [Op.between]: [fromBaseDiff, toBaseDiff] },
        { [Op.between]: [dateFrom, dateTo] },
       ],
      }
    : { [Op.between]: [dateFrom, dateTo] }
  const crimes = await Crime.findAll({
   where: {
    ...isRota,
    date: {
     ...search,
    },
   },
   include: [{ model: Address, as: "AddressId" }],
  })
  res.status(200).json(crimes)
 } catch (e) {
  res.status(500).end()
  console.log(e)
 }
})
router.delete("/:id", auth.required, isAttach, async (req, res) => {
 try {
  const user = req.currentUser.isAdmin
  if (!user) {
   const crime = await Crime.findByPk(req.params.id)
   crime.destroy()
   res.status(204).end()
  } else {
   res.status(401).end()
  }
 } catch (e) {
  res.status(500).end()
  console.log(e)
 }
})
module.exports = router
