const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.json({1 : "jj"});
})

module.exports = router