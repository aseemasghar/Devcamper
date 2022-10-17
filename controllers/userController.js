const Users = require('../models/userModel');
const path = require('path');
const sendEmail = require('../utils/sendEmail');
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

//Get logged in user profile
exports.getMe = asyncHandler(async(req,res,next)=>{
const user = await Users.findById(req.user.id);
res.status(200).json({
    success:true,
    data:user
})
})

//Forgot password
exports.forgotPassword = asyncHandler(async(req,res,next)=>{
    const user = await Users.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorResponse(`No user exist with this email`,404));
    }
    const resetToken = user.getResetPasswordToken();
    // await user.save({validateBeforeSave:false});

   
    const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
  console.log(resetToken)

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }


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