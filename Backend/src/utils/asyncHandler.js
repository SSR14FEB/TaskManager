const asyncHandler = (fun) => async(req,res,next)=>{
    try {
        await fun(req,res,next)
    } catch (error) {
        const statuscode = error.statuscode||500
         res.status(statuscode)
        .json({
            "success":false,
            "message":error.message||"Internal server error"
        })
      
    }
}
export {asyncHandler}