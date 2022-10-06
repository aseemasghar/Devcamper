const Courses = require('../models/courseModel');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getAllCourses =asyncHandler(async(req,res,next)=>{
// let query;

// coping requested query
    const reqQuery = {...req.query};
    const allCourses = await Courses.find(reqQuery);
    res.status(200).json({
        success:true,
        counter:allCourses.length,
        data:allCourses,
    })

})

exports.getSingleCourse =asyncHandler(async(req,res,next)=>{

    const singleCourse = await Courses.findById(req.params.id);
    if(!singleCourse){
        return res.status(400).json({
            success:false,
        })
    }
    res.status(200).json({
        success:true,
        data:singleCourse,
    })
})

exports.createCourse =asyncHandler(async(req,res,next)=>{

        const newCourse = await Courses.create(req.body);
        res.status(201).json({
            success:true,
            message: "Course created",
            data:newCourse,
        });  

});

exports.updateCourse =asyncHandler(async(req,res,next)=>{

    const updatedCourse = await Courses.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
    });
    if(!updatedCourse){
        next(new ErrorResponse(`Course is not found with id ${req.params.id}`,404));
    }
    res.status(200).json({
        success:true,
        message: "Course Updated",
        data:updatedCourse,
    })

});

exports.deleteCourse =asyncHandler(async(req,res,next)=>{

        const course = await Courses.findByIdAndDelete(req.params.id);
        if(!course){
            next(new ErrorResponse(`Course is not found with id ${req.params.id}`,404));
        }
        res.status(200).json({
            success:true,
            message: "Course Deleted",
        })
})
