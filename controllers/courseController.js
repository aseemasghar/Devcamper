const Courses = require('../models/courseModel');
const Bootcamps = require('../models/bootcampModel');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getAllCourses =asyncHandler(async(req,res,next)=>{
let query;

    if(req.params.bootcampid){
        query = Courses.find({bootcamp:req.params.bootcampid});    
    }else{
        query = Courses.find().populate({
            path:'bootcamp',
            select:'name description',
        });
    }
    const allCourses = await query;

    res.status(200).json({
        success:true,
        counter:allCourses.length,
        data:allCourses,
    })

})

exports.getSingleCourse =asyncHandler(async(req,res,next)=>{

    const singleCourse = await Courses.findById(req.params.courseid).populate({
        path:'bootcamp',
        select:'name description',
    });
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
    req.body.bootcamp= req.params.bootcampid ;
    const bootcamp = await Bootcamps.findById(req.params.bootcampid);
    if(!bootcamp){
return next(new ErrorResponse(`No bootcamp accociated with this id`),404);
    }else{
        const newCourse = await Courses.create(req.body);
        res.status(201).json({
            success:true,
            message: "Course created",
            data:newCourse,
        });  
    }
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

        const course = await Courses.findById(req.params.id);
        if(!course){
            next(new ErrorResponse(`Course is not found with id ${req.params.id}`,404));
        }else{
            course.remove();
            res.status(200).json({
                success:true,
                message: "Course Deleted",
            })
        } 
})
