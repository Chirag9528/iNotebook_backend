const mongoose = require('mongoose');


const mongoURI = "mongodb://0.0.0.0/Chirag";

const connectToMongo = async ()=> {
    await mongoose.connect(mongoURI)
    console.log("Connected to mongoDB successfully")
}

module.exports = connectToMongo;