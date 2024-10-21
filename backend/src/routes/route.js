const express = require("express");
const {getLongUrl} = require('../controller/controller.js');

const router = express.Router();

//request routes for url things

router.get("/", (req, res)=>{
    res.send("happy coding");
})
router.get("/:shortCode",getLongUrl)

module.exports  = router;