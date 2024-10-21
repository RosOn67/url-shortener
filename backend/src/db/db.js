
const mongoose  = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongoose connected")
    }catch(err){
        console.log("Failed connecting to db", err);
        process.exit(1);
    }
}

module.exports = connectDB;