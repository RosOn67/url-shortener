const mongoose = require("mongoose");
//schema and model for urls

const urlSchema = new mongoose.Schema({
    shortCode : String,
    longUrl : String,
    shortUrl : String,
    createdAt : {type: Date, default: Date.now},
    updatedAt : {type: Date, default: Date.now},
    accesscount: {type: Number, default : 0}
});

module.exports = mongoose.model('url', urlSchema);

