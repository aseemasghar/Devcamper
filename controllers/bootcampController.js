const Bootcamps = require('../models/bootcampModel');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');
// const Courses = require('../models/courseModel');

exports.getAllBootcamps =asyncHandler(async(req,res,next)=>{
// let query;

// coping requested query
    const reqQuery = {...req.query};
    const allBootcamps = await Bootcamps.find(reqQuery).populate('courses');
    res.status(200).json({
        success:true,
        counter:allBootcamps.length,
        data:allBootcamps,
    })

})

exports.getSingleBootcamp =asyncHandler(async(req,res,next)=>{

    const singleBootcamp = await Bootcamps.findById(req.params.id).populate('courses');
    if(!singleBootcamp){   
         return next(new ErrorResponse(`Bootcamp is not found with id ${req.params.id}`,404));
    }else{
        res.status(200).json({
            success:true,
            data:singleBootcamp,
        })
    }
})

exports.createBootcamp =asyncHandler(async(req,res,next)=>{

        const newBootcamp = await Bootcamps.create(req.body);
        res.status(201).json({
            success:true,
            message: "Bootcamp created",
            data:newBootcamp,
        });  

});

exports.updateBootcamp =asyncHandler(async(req,res,next)=>{

    const updatedBootcamp = await Bootcamps.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
    });
    if(!updatedBootcamp){
      return  next(new ErrorResponse(`Bootcamp is not found with id ${req.params.id}`,404));
    }else{
        res.status(200).json({
            success:true,
            message: "Bootcamp Updated",
            data:updatedBootcamp,
        })
    }
});

exports.deleteBootcamp =asyncHandler(async(req,res,next)=>{

        const bootCamp = await Bootcamps.findById(req.params.id);
        if(!bootCamp){
          return  next(new ErrorResponse(`Bootcamp is not found with id ${req.params.id}`,404));
        }else{
           bootCamp.remove();
           res.status(200).json({
            success:true,
            message: "Bootcamp Deleted",
        })
        }
})

exports.bootcampFileUpload =asyncHandler(async(req,res,next)=>{

    const bootCamp = await Bootcamps.findById(req.params.bootcampid);
    if(!bootCamp){
       return next(new ErrorResponse(`Bootcamp is not found with id ${req.params.id}`,404));
    };
 
    if(!req.files){
      return  next(new ErrorResponse(`Please upload a file`,400));
    };

    const file = req.files.undefined;
    if(!file.mimetype.startsWith('image')){
        return  next(new ErrorResponse(`Please upload an image`,400));
    }

// create custom filename
file.name = `photo_${bootCamp._id}${path.parse(file.name).ext}`;

file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`,async err=>{
    if(err){
        console.log(err);
        return  next(new ErrorResponse(`Image does not upload`,500));
    }else{
        await Bootcamps.findByIdAndUpdate(req.params.bootcampid,{photo:file.name});
        res.status(200).json({
            success:true,
            data:file.name
        })
    }
})
 
})
