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

    //Creat token
    const token = user.getJwtToken();
    res.status(200).json({
        success:true,
        // data:user,
        token
    });
});