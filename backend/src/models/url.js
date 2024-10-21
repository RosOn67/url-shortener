const mongoose = require("mongoose");
//schema and model for urls

const urlSchema = new mongoose.Schema({
    shortCode : String,
    longUrl : String,
    shortUrl : String,
    createdAt : {type: Date, default: Date.now},
    updatedAt : {type: Date, default: Date.now}
});

module.exports = mongoose.model('url', urlSchema);

