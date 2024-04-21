const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body , validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');

const JWT_SECRET = "Harryisagoodb$oy"

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

    try {
        // check whether the user with this email exits already
        
        let user = await User.findOne({email : req.body.email});
        if (user){
            return res.status(400).json({error : "Sorry a user with this email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password , salt)
        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : secPass,
        });
        // .then(user=> res.json(user));
        const data = {
            user : {
                id : user.id
            }
        }
        const authtoken = jwt.sign(data , JWT_SECRET);
        // console.log(authtoken)
        // res.json(user)
        res.json({authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
    })


// Authentication a User using : POST "api/auth/login"  - No login required

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password' , 'Password can not be blank').exists()
],async (req,res)=>{
        // if there are errors , return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const {email , password} = req.body;
        try {
            let user = await User.findOne({email});
            if (!user){
                return res.status(400).json({error : "Please try to login with correct credentials"});
            }
            const passwordcompare = await bcrypt.compare(password , user.password);
            if (!passwordcompare){
                return res.status(400).json({error: "Please try to login with correct credentials"});
            }

            const data = {
                user : {
                    id : user.id
                }
            }
            const authtoken = jwt.sign(data , JWT_SECRET);
            res.json({authtoken})
        } catch (error) {
            console.error(error.message);
        res.status(500).send("Internal Server Error")
        }

})
    
module.exports = router