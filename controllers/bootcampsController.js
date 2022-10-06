const Bootcamps = require('../models/bootcampModel');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getAllBootcamps =asyncHandler(async(req,res,next)=>{
const query = req.query;
    const allBootcamps = await Bootcamps.find(query);
    res.status(200).json({
        success:true,
        counter:allBootcamps.length,
        data:allBootcamps,
    })

})

exports.getSingleBootcamp =asyncHandler(async(req,res,next)=>{

    const singleBootcamp = await Bootcamps.findById(req.params.id);
    if(!singleBootcamp){
        return res.status(400).json({
            success:false,
        })
    }
    res.status(200).json({
        success:true,
        data:singleBootcamp,
    })
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
        next(new ErrorResponse(`Bootcamp is not found with id ${req.params.id}`,404));
    }
    res.status(200).json({
        success:true,
        message: "Bootcamp Updated",
        data:updatedBootcamp,
    })

});

exports.deleteBootcamp =asyncHandler(async(req,res,next)=>{

        const updatedBootcamp = await Bootcamps.findByIdAndDelete(req.params.id);
        if(!updatedBootcamp){
            next(new ErrorResponse(`Bootcamp is not found with id ${req.params.id}`,404));
        }
        res.status(200).json({
            success:true,
            message: "Bootcamp Deleted",
        })
})
