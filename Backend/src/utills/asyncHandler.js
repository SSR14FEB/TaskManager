const asyncHandler = (fun) => async(req,res)=>{
    try {
        await fun(req,res)
    } catch (error) {
        return res.status(500)
        .json({
            "success":false,
            "massage":error.massage||"Internal server error"
        })
        next(error)
    }
}
export {asyncHandler}