const { Router } = require("express")
const router = Router()
const fs = require("fs")
const { auth } = require("./../../utils/auth.js")
const isAttach = require("./../../utils/isAttach.js")
router.get("/get", auth.required, isAttach, async (req, res) => {
    try {
        const user = req.currentUser
        if(user) {
            fs.readFile("server/config.json", (error, data) => {
                if (error) {
                    res.status(500).end()
                }
                res.status(200).json(JSON.parse(data))
            })
        } else {
            res.status(401).end()
        }
    } catch (error) {
        res.status(500).end()
        console.log(error)
    }
})
router.post("/change", auth.required, isAttach, async (req, res) => {
    try {
        const user = req.currentUser
        if(user.isAdmin) {
            const {name} = req.body
            const isUse = await CrimesList.findOne({
                where: {
                    name
                }
            })
            if(isUse === null) {
                const crime = await CrimesList.create({
                    name
                })
                res.status(201).json({"message": "OK"})
            } else {
                res.status(201).json({"message": "ранее создано"})
            }
        } else {
            res.status(401).end()
        }
    } catch (error) {
        res.status(500).end()
        console.log(error)
    }
})
module.exports = router