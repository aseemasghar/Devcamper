const Users = require('../models/userModel');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');


// register user
exports.register = asyncHandler(async(req,res,next)=>{
    const{name,email,password,role}=req.body;
    const user = await Users.create({
        name,email,password,role
    });

    //Creat token
    const token = user.getJwtToken();
    res.status(200).json({
        success:true,
        data:user,
        token
    });
});

// login user
exports.login = asyncHandler(async(req,res,next)=>{
    const{email,password}=req.body;
    if(!email|| !password){
        return next(new ErrorResponse(`Please enter email and password `,401));
    }
    const user = await Users.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorResponse(`Invalid Credentials`,401));
    }

    // check if password match
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return next(new ErrorResponse(`Invalid Credentials`,401));
    }

  sendTokenResponse(user,200,res);
});

exports.getMe = asyncHandler(async(req,res,next)=>{
const user = await Users.findById(req.user.id);
res.status(200).json({
    success:true,
    data:user
})
})

//Get token from model create cookie and send response
const sendTokenResponse= (user,statuscode,res)=>{
    const token = user.getJwtToken();
    const options = {
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    };
    res.status(statuscode).cookie('token',token,options).json({
        success:true,
        token
    });
};