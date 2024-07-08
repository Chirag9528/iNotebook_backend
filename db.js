const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { DB_NAME } = require('./constants');

// Load environment variables from .env file
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectToMongo = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
        // console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        console.log('\n MongoDB connected Successfully');
    } catch (error) {
        // console.log(`${MONGODB_URI}/${DB_NAME}`)
        console.log("MONGODB connection Failed",error);
        process.exit(1)
    }
}

module.exports = connectToMongo;

