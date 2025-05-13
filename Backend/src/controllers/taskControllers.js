import { User } from "../models/user_model.js";
import { Task } from "../models/task_model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const adminDashboard = asyncHandler(async (req, res) => {
    const adminProfile = await User.findById(req.user._id).select("name role email profileImageUrl");
    if (!adminProfile) {
        return apiError(404, "Admin not found");
    }
    const totalTask = await Task.countDocuments()
    const pendingTask = await Task.countDocuments({status:"Pending"})
    const completedTask = await Task.countDocuments({status:"Completed"})
    const overdueTask= await Task.countDocuments({
       status:{$ne:"Completed"},dueDate:{$lt:new Date()}
    })
    const taskStatus = ["Pending","In Progress","Completed"]
    const taskDistributionRow = await Task.aggregate([{
        $group:{
            _id:"$status",
            count:{
                $sum:1
            }
        }
    }]) 
    // formatted object
    const taskDistribution = taskStatus.reduce((acc,status)=>{
        const formattedKey = status.replace(/\s+/g,"")
        acc[formattedKey] = taskDistributionRow.find(item=>item._id==status)?.count||0
        return acc
    },{})
    taskDistribution["All"]= totalTask
    const taskPriorityLevel = ["Low", "Medium", "High"]
    const taskPriorityRow = await Task.aggregate([{
        $group:{
            _id:"$Priority",
            count:{
                $sum:1
            }
        }
    }])
    // formatted object 
    const taskPriority = taskPriorityLevel.reduce((acc,priority)=>{
        const formattedKey = priority.replace(/\s+/g,"")
        acc[formattedKey] = taskDistributionRow.find(item=>item._id==priority)?.count||0
        return acc
    },{})
    const recentTask = await Task.find()
    .sort({createdAt:-1})
    .select("title status priority dueDate createdAt")

    return res.status(200)
    .json(new apiResponse(200,"Admin dashboard data fetched successfully",
        {adminProfile,totalTask,pendingTask,completedTask,overdueTask,taskDistribution,taskPriority,recentTask}))
});

const userDashboard = asyncHandler(async (req, res) => {});

const getTask = asyncHandler(async (req, res) => {});

const getTaskById = asyncHandler(async (req, res) => {});

const createTask = asyncHandler(async (req, res) => {});

const updateTask = asyncHandler(async (req, res) => {});

const deleteTask = asyncHandler(async (req, res) => {});

const updateTaskStatus = asyncHandler(async (req, res) => {});

const updateTaskTodo = asyncHandler(async (req, res) => {});

export {
    adminDashboard,
    userDashboard,
    getTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskTodo,
};