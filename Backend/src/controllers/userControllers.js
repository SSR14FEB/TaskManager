import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user_model.js";
import { Task } from "../models/task_model.js";

const getMembers = asyncHandler(async(req, res) => {
    const members = await User.find({role:"member"}).select("-password -refreshToken -accessTokens")
    if(members.length==0){
        throw new apiError(404,"There is no any member")
    }
    const membersWithAssignedTask = await Promise.all(members.map(async(user)=>{
        try {
            const userWithPendingTask = await Task.countDocuments({assignTo:user._id,status:"Pending"})
            const userWithProgressTask = await Task.countDocuments({assignTo:user._id,status:"In Progress"})
            const userWithCompletedTask = await Task.countDocuments({assignTo:user._id,status:"Completed"})
            return {
                _Id:user._id,
                profileImage:user.profileImageUrl,
                name:user.name,
                email:user.email,
                role:user.role,
                userWithPendingTask,
                userWithProgressTask,
                userWithCompletedTask
            }
        } catch (error) {
            console.log("got an error while fetching members with assigned tasks",error)
        }
    }))
    console.log(membersWithAssignedTask)
    return res.status(200)
    .json(new apiResponse(200,"Members profile fetched successfully",membersWithAssignedTask))
})

const getMemberById = asyncHandler(async(req, res) => {
   const member = await User.findByID(req.params._id)
   if(!member){
    throw new apiError(404,"Member not found")
   }
   return res.status(200)
   .json(new apiResponse(200,"Member details fetched successfully",member))
})



export { getMembers, getMemberById}