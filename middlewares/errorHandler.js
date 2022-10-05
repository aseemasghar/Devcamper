const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err,req,res,next)=>{
    let error = { ...err };
    error.message = err.message;
    // console.log(err.code);
    
      // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    err = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    err = new ErrorResponse(message, 400);
  }

    res.status(err.statusCode||500).json({
        success:false,
        err:err.message||"Internel Server Error ",
    })
}
module.exports=errorHandler;