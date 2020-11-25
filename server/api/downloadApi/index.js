const { Router } = require("express")
const router = Router()
const HtmlDocx = require('html-docx-js');
const fs = require("fs")
const { auth } = require("./../../utils/auth.js")
const isAttach = require("./../../utils/isAttach.js")
router.post("/get", auth.required, isAttach, async (req, res) => {
    try {
        const user = req.currentUser
        if(user) {
            const {html} = req.body
            const docx = HtmlDocx.asBlob(html, {orientation: "landscape"});
            const downloadFile = `${__dirname}/../../temp/report-${Date.now().toString()}.docx`
            fs.writeFile(downloadFile, docx, err => {
                if (err) throw err;
            });
            res.download(downloadFile, "report.docx", err => {
                fs.unlink(downloadFile, err => {
                    if(err) throw err
                })
                if(err) throw err
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