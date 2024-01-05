const asyncHandler=require('express-async-handler');
const user=require("../models/userModel");
const generateToken = require('../utils/generateToken');
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    const userExits=await user.findOne({email});
    if(userExits){
        res.status(400).json({message:"Already Registered"});   
    }
    const newuser=await user.create({
        name,
        email,
        password,
    });
    if(newuser){
        res.status(201).json({
            id:newuser._id,
            name:newuser.name,
            email:newuser.email,
            message:"User created successfully",
        })
    }else{
        res.status(400).json({message:"Something went wrong"});   
    } 
});

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const User=await user.findOne({email});
    if(User && (await User.matchpassword(password))){
        res.json({
            _id:User._id,
            name:User.name,
            email:User.email,
            token:generateToken(User._id),
            message:"Successfully Login",
        })
    }else{
        res.status(400).json({message:"Invalid Credentials"});   
    }
})
const userVerification=async(req,res)=>{
    res.status(201).json({message:"Successfully Verified",user:req.user,success:"SuccessFully Verified"});
}
module.exports={registerUser,loginUser,userVerification};