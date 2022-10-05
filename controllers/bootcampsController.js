const Bootcamps = require('../models/bootcampModel');

exports.getAllBootcamps =async(req,res,next)=>{
 try {
    const allBootcamps = await Bootcamps.find();
    res.status(200).json({
        success:true,
        data:allBootcamps,
    })
 } catch (err) {
    res.status(400).json({
        success:false,
        error:err,
    })
 }  
}

exports.getSingleBootcamp =async(req,res,next)=>{
  try {
    const singleBootcamp = await Bootcamps.findById(req.params.id);
    if(!singleBootcamp){
        res.status(400).json({
            success:false,
        })
    }
    res.status(200).json({
        success:true,
        data:singleBootcamp,
    })
  } catch (error) {
    res.status(400).json({
        success:false,
        error:err,
    })  
  }
}

exports.createBootcamp = async(req,res,next)=>{
    try {
        const newBootcamp = await Bootcamps.create(req.body);
        res.status(201).json({
            success:true,
            message: "Bootcamp created",
            data:newBootcamp,
        });  
    } catch (err) {
     res.status(400).json({
        success:false,
        error:err,
     })   
    }
  
};

exports.updateBootcamp =async(req,res,next)=>{
try {
    const updatedBootcamp = await Bootcamps.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
    });
    if(!updatedBootcamp){
        res.status(400).json({
            success:false,
            message:"Bootcamp not found",
        })
    }
    res.status(200).json({
        success:true,
        message: "Bootcamp Updated",
        data:updatedBootcamp,
    })
} catch (error) {
    res.status(400).json({
        success:false,
    })
}
}

exports.deleteBootcamp =async(req,res,next)=>{
    try {
        const updatedBootcamp = await Bootcamps.findByIdAndDelete(req.params.id);
        if(!updatedBootcamp){
            res.status(400).json({
                success:false,
                message:"Bootcamp not found",
            })
        }
        res.status(200).json({
            success:true,
            message: "Bootcamp Deleted",
        })
    } catch (error) {
        res.status(400).json({
            success:false,
        })
    }
}
