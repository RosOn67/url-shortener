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

const redirectUrl = async(req, res) => {  //can i increase access count here whenever visit this endpoit increase count and i control this 
    try{
        let {shortCode} = req.params;
        //find mathcing url and increase access count by 1
        const url = await Url.findOneAndUpdate(
            { shortCode },
            { $inc: { accesscount: 1 } },
            { new: true }
        );
        if(url){
            res.redirect(url.longUrl);
            console.log("Successfully redirected");
        }else{
            res.status(404).send("no url found");
        }
    }catch(err){
        console.log("Failed to redirect url", err);
    }
}

//update the corresponding long url of a short url
const updateUrl = async(req, res)=>{
    try{
        let {new_url} = req.body;
        let{shortCode} = req.params;
        //find the matching url
        const url_to_update = await Url.findOne({shortCode : shortCode});  //instead of findng and updting use findOneandupdate with new true
        if(url_to_update){
            const created_date = url_to_update.createdAt; //created date should be original updatedat should be updated
            await Url.updateOne({shortCode : shortCode},
                {
                    $set : {
                        longUrl : new_url,
                        createdAt : created_date
                    },
                    $currentDate : {updatedAt : true}  //currentDate sets the updatedAt filed to current date
                }
            )
            console.log("successfuly updated");
            const updated_url = await Url.findOne({shortCode : shortCode}); //this not working
            res.json(updated_url);
        }else{
            res.status(404).send("no url found")
        }
    }catch(err){
        console.log("Error updating url", err)
    }
}

const getStats = async(req, res)=>{
    try{
        let { shortCode } = req.params;

        // Find the URL based on the shortCode
        const urlData = await Url.findOne({ shortCode: shortCode });

        if (urlData) {
            // Respond with the URL statistics
            res.json({
                id: urlData._id.toString(),
                url: urlData.longUrl,
                shortCode: urlData.shortCode,
                createdAt: urlData.createdAt,
                updatedAt: urlData.updatedAt,
                accesscount: urlData.accesscount
            });
        } else {
            res.status(404).send("Short URL not found");
        }
    } catch (err) {
        console.log("Error retrieving URL stats", err);
        res.status(500).send("Server error");
    }
}

const deleteurl = async(req, res) =>{
    try{
        let {shortCode} = req.params;
        //delete the url
        await Url.deleteOne({shortCode:shortCode});
        res.status(204).send("no content");
    }catch(err){
        console.log("error deleting", err);
        res.status(404).send("not Found");
    }
    
}


module.exports.shorten_url = shorten_url;
module.exports.getLongUrl = getLongUrl;
module.exports.redirectUrl = redirectUrl;
module.exports.updateUrl = updateUrl;
module.exports.getStats = getStats;
module.exports.deleteurl = deleteurl;
