exports.getBootcamps =(req,res,next)=>{
    res.status(200).json({success:true, message:'This is all bootcamps'})
}

exports.getBootcamp =(req,res,next)=>{
    res.status(200).json({success:true, message:`Bootcamps ${req.params.id}` })
}

exports.createBootcamp =(req,res,next)=>{
    res.status(200).json({success:true, message:'Create new bootcamps'})
}

exports.updateBootcamp =(req,res,next)=>{
    res.status(200).json({success:true, message:`Updated ${req.params.id}`})
}

exports.deleteBootcamp =(req,res,next)=>{
    res.status(200).json({success:true, message:`Deleted ${req.params.id}`})
}
