const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body , validationResult} = require('express-validator')

// Create a User using: POST "api/auth/createuser". Doesn't require Auth ( no login required)

router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:5}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min:5})
],async (req,res)=>{
    // if there are errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    // const user = User(req.body);
    // user.save();

    // check whether the user with this email exits already
    try {
        
        let user = await User.findOne({email : req.body.email});
        if (user){
            return res.status(400).json({error : "Sorry a user with this email already exists"})
        }
        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        })
        // .then(user=> res.json(user));
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred")
    }
    })
    
module.exports = router