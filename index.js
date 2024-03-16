const connectToMongo = require('./db')
const express = require("express")

connectToMongo();

const app = express();
const port = 3000;
app.get('/',(req,res)=>{
    res.send("Hello Chirag");
})

app.listen(port,()=>{
    console.log(`App is listening at http://localhost:${port}`)
})