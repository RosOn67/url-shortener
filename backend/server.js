const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./src/db/db.js");
const bodyParser = require("body-parser");
const urlroutes  = require('./src/routes/urlroute.js');
const routes  = require('./src/routes/route.js');

dotenv.config();

const app = express();

//set up middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//set up routes

app.use("/", routes);

app.use("/api/url", urlroutes);

const server = async()=>{
    try{
        console.log("server is starting");
        //coonect to mongodb
        await connectDB();
        //listn on port 
        app.listen(process.env.PORT||5000, ()=>{
            console.log("server is running");
        })
    }catch(err){
        console.log("Server failed to start", err);
        process.exit(1);
    }
}

server();