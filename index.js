const connectToMongo = require('./db')
const express = require("express")
var cors = require('cors')

connectToMongo();

const app = express();
const port = process.env.PORT
app.use(cors())

app.use(express.json())
// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))



app.listen(port,()=>{
    console.log(`iNotebook backend is listening at ${process.env.HOSTNAME}:${port}`)
})