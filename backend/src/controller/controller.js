const validurl = require("valid-url");
let Url = require("../models/url.js");
const shorten_url = async(req, res) =>{
    try{
        let {longUrl} = req.body;
        //validate url
        let shortCode;
        if(validurl.isUri(longUrl)){
            await (async()=>{
                const {nanoid} = await import('nanoid'); //dynamic import nano js dont support common js
                shortCode = nanoid(10);
                console.log(shortCode);
            })(); //IIFE
            // let shortCode = nanoid(10); //generate a random short id 
            //shortened url 
            let shortUrl = process.env.BASE_URL + "/" + shortCode; //e.g http://localhost:5000/x94y4DsnA
            ///create a database url document
            let newDocument = {
                shortCode :shortCode,
                longUrl : longUrl,
                shortUrl : shortUrl,
                createdAt : new Date().toUTCString(),
                updatedAt : new Date().toUTCString()
            }
            const url = new Url(newDocument);
            await url.save();
            //return response
            res.json(newDocument);
        }else{
            res.status(400).send("Not a valid url");
        }
    }catch(err){
        console.log("Failed to resolve url", err)
    }
}

const getLongUrl = async(req, res)=>{
    try{
        let {shortCode} = req.body;
        //find mathcing url 
        const url = await Url.findOne({shortCode : shortCode});
        res.json(url);
    }catch(err){
        res.status(404).send("no url found");
    }
}

module.exports.shorten_url = shorten_url;
module.exports.getLongUrl = getLongUrl;
