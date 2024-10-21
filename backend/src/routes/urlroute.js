const express = require("express");
const {shorten_url} = require('../controller/controller.js');

const router = express.Router();

//request routes for url things

router.post("/shorten",shorten_url);
// router.get("/shorten/:shortCode", controller2);
// router.put("/shorten/:shortCode", controller3);
// router.delete("/shorten/:shortCode", controller4);
// router.get("/shorten/:shortCode/stats", controller5);

module.exports  = router;