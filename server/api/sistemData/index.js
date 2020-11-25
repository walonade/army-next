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
            fs.truncate("server/config.json", 0, () => {
                fs.writeFile("server/config.json", JSON.stringify(req.body), (err) => {
                    if (err) {
                        throw new Error(err)
                    }
                    res.status(201).json(req.body)
                });
            });
        } else {
            res.status(401).end()
        }
    } catch (error) {
        res.status(500).end()
        console.log(error)
    }
})
module.exports = router