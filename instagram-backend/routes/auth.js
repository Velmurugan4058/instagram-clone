const express = require("express");
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../modules/user');// import your new user model

//signup (register) route
router.post('/register',async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        //1. check if the email is already registerd
        const existingUser = await User.findOne({email:email});
        if (existingUser){
            return res.status(400).json({message:"User already exists with this email!"})
        }
        //2.hash (scramble) the password for security 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        //3.create and save the new user
        const newUser = new User({
            username:username,
            email:email,
            password:password

        }) 
        await newUser.save();
        res.status(201).json({message:"User registerd successfully"})
    }
    catch(error){
        console.log("Signup Error:",error)
        res.status(500).json({message:"Server error during Signup"})
    }
})

//Login Rout
router.post('/login', async(req,res)=>{
    try{
        const { email,password}= req.body;
        //1.check if a user with this email alredy exists
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({message:"User not Found!"});

        }
        //2. Compare the typed password with saved hashed password 
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(isPasswordCorrect){
            return res.status(400).json({message:"Invaild Credentials!"})
        }

        res.status(200).json({message:"Login Successfully",user:user})

    }catch(error){
        console.log("Login Error:",error)
        res.status(500).json({message:"Server Error During login"})
    }
})

module.exports = router

