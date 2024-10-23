const express = require("express");
const {shorten_url, getLongUrl, updateUrl, getStats, deleteurl} = require('../controller/controller.js');

const router = express.Router();

//request routes for url things

router.post("/shorten",shorten_url);
router.get("shorten/:shortCode",getLongUrl); //get original long url
router.put("/shorten/:shortCode", updateUrl);
router.delete("/shorten/:shortCode", deleteurl);
router.get("/shorten/:shortCode/stats", getStats);

module.exports  = router;