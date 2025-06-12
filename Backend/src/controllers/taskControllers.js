import { User } from "../models/user_model.js";
import { Task } from "../models/task_model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const adminDashboard = asyncHandler(async (req, res) => {
    const adminProfile = await User.findById(req.user._id).select(
        "name role email profileImageUrl"
    );
    if (!adminProfile) {
        throw apiError(404, "Admin not found");
    }
    const totalTask = await Task.countDocuments();
    const pendingTask = await Task.countDocuments({ status: "Pending" });
    const completedTask = await Task.countDocuments({ status: "Completed" });
    const overdueTask = await Task.countDocuments({
        status: { $ne: "Completed" },
        dueDate: { $lt: new Date() },
    });
    const taskStatus = ["Pending", "In Progress", "Completed"];
    const taskDistributionRow = await Task.aggregate([
        {
            $group: {
                _id: "$status",
                count: {
                    $sum: 1,
                },
            },
        },
    ]);
    // formatted object
    const taskDistribution = taskStatus.reduce((acc, status) => {
        const formattedKey = status.replace(/\s+/g, "");
        acc[formattedKey] =
            taskDistributionRow.find((item) => item._id == status)?.count || 0;
        return acc;
    }, {});
    taskDistribution["All"] = totalTask;
    const taskPriorityLevel = ["Low", "Medium", "High"];
    const taskPriorityRow = await Task.aggregate([
        {
            $group: {
                _id: "$Priority",
                count: {
                    $sum: 1,
                },
            },
        },
    ]);
    // formatted object
    const taskPriority = taskPriorityLevel.reduce((acc, priority) => {
        const formattedKey = priority.replace(/\s+/g, "");
        acc[formattedKey] =
            taskDistributionRow.find((item) => item._id == priority)?.count ||
            0;
        return acc;
    }, {});
    const recentTask = await Task.find()
        .sort({ createdAt: -1 })
        .select("title status priority dueDate createdAt");

    return res.status(200).json(
        new apiResponse(200, "Admin dashboard data fetched successfully", {
            adminProfile,
            totalTask,
            pendingTask,
            completedTask,
            overdueTask,
            taskDistribution,
            taskPriority,
            recentTask,
        })
    );
});

const userDashboard = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select(
        "name email role profileImageUrl"
    );
    if (!user) {
        throw new apiError(404, "User not found");
    }
    const totalTask = await Task.countDocuments({ assignTo: user._id });
    const pendingTask = await Task.countDocuments({
        assignTo: user._id,
        status: "Pending",
    });
    const inProgressTask = await Task.countDocuments({
        assignTo: user._id,
        status: "In Progress",
    });
    const completedTask = await Task.countDocuments({
        assignTo: user._id,
        status: "Completed",
    });
    const overdueTask = await Task.countDocuments({
        assignTo: user._id,
        status: { $ne: "Completed" },
        dueDate: { $lt: new Date() },
    });

    const taskStatus = ["Pending", "In Progress", "Completed"];

    const taskDistributionRow = await Task.aggregate([
        {
            $match:{
                assignTo:user._id
            }
        },
        {
            $group: {
                _id: "$status",
                count: {
                    $sum: 1,
                },
            },
        },
    ]);

    const taskDistribution = taskStatus.reduce((acc, status) => {
        const formattedKey = status.replace(/\s+/g, "");
        acc[formattedKey] =
            taskDistributionRow.find((item) => item._id == status)?.count || 0;
        return acc;
    }, {});

    const taskPriority = ["Low", "Medium", "High"];

    const taskPriorityRow = await Task.aggregate([
        {
            $group: {
                _id: "$priority",
                count: {
                    $sum: 1,
                },
            },
        },
    ]);

    const taskPriorityLevel = taskPriority.reduce((acc, priority) => {
        const formattedKey = priority.replace(/\s+/g, "");
        acc[formattedKey] =
            taskPriorityRow.find((item) => item._id == priority)?.count || 0;
        return acc;
    }, {});

    const recentTask = await Task.find()
        .sort({ createdAt: -1 })
        .select("title status priority dueDate createdAt");

    return res.status(200).json(
        new apiResponse(200, "User Dashboard fetched successfully", {
            user,
            totalTask,
            pendingTask,
            inProgressTask,
            completedTask,
            overdueTask,
            taskDistribution,
            taskPriorityLevel,
            recentTask,
        })
    );
});

const createTask = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        createdBy,
        assignTo,
        todoCheckList,
        dueDate,
        priority,
        status,
        progress,
        attachments,
    } = req.body;

    if (
        [
            title,
            description,
            createdBy,
            dueDate,
            priority,
            status,
            progress,
        ].some((field) => field?.trim() == "")
    ) {
        throw new apiError(400, "All fields are required");
    }

    if (!Array.isArray(assignTo)) {
        throw new apiError(400, "assignTo must be an array");
    }
    const createdTask = await Task.create({
        title: title,
        description: description,
        createdBy: createdBy,
        assignTo: assignTo,
        todoCheckList: todoCheckList,
        dueDate: dueDate,
        Priority: priority,
        status: status,
        Progress: progress,
        attachments: attachments,
    });

    return res
        .status(202)
        .json(new apiResponse(202, "Task created successfully", createdTask));
});

const getTask = asyncHandler(async (req, res) => {
    const { status } = req.query;
    let filter = {};
    if (status) {
        filter.status = status;
    }

    let tasks;
    if (req.user.role == "admin") {
        tasks = await Task.find(filter).populate(
            "assignTo",
            "name email profileImageUrl"
        );
    }
    if (req.user.role == "member") {
        tasks = await Task.find({ ...filter, assignTo: req.user._id }).populate(
            "assignTo",
            "name email profileImageUrl"
        );
    }

    tasks = await Promise.all(
        tasks.map(async (tasks) => {
            const completedCount = tasks.todoCheckList.filter(
                (item) => item.completed
            ).length;
            return { ...tasks._doc, completedTodoCount: completedCount };
        })
    );
    // task status summary
    const allTask = await Task.countDocuments(
        req.user.role === "admin" ? {} : { assignTo: req.user._id }
    );
    const pendingTask = await Task.countDocuments({
        ...filter,
        status: "Pending",
        ...(req.user.role !== "admin" && { assignTo: req.user._id }),
    });
    const inProgressTask = await Task.countDocuments({
        ...filter,
        status: "In Progress",
        ...(req.user.role !== "admin" && { assignTo: req.user._id }),
    });
    const completedTask = await Task.countDocuments({
        ...filter,
        status: "Completed",
        ...(req.user.role !== "admin" && { assignTo: req.user._id }),
    });

    return res.status(200).json(
        new apiResponse(200, "Task fetched successfully", {
            tasks,
            statusSummary: {
                allTask: allTask,
                pendingTask: pendingTask,
                inProgressTask: inProgressTask,
                completedTask: completedTask,
            },
        })
    );
});

const getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.find(req.params.id).populate(
        "assignTo",
        "name email profileImageUrl"
    );
    if (!task) {
        throw new apiError(404, "Task not found");
    }
    return res
        .status(200)
        .json(new apiResponse(200, "Task fetched successfully", task));
});

const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.find(req.params._id);
    if (!task) {
        throw new apiError(404, "Task not found");
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.assignTo = req.body.assignTo || task.assignTo;
    task.todoCheckList = req.body.todoCheckList || task.todoCheckList;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.priority = req.body.priority || task.priority;

    const updatedTask = await task.save({ validateBeforeSave: true });

    return res
        .status(200)
        .json(new apiResponse(200, "Task updated successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params._id);
    if (!task) {
        throw new apiError(404, "Task not found");
    }

    await Task.findByIdAndDelete(task._id);

    return res
        .status(200)
        .json(new apiResponse(200, "Task deleted successfully", Task));
});

const updateTaskStatus = asyncHandler(async (req, res) => {
    const 
});

const updateTaskTodo = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params._id)
    const todoCheckList = req.body
    if(!task){
        throw new apiError(404,"Task not found")
    }
    const user = await User.findById(req.user._id)
    if(!user){
        throw new apiError(404,"User not found")
    }

    if(task.assignTo.include(user._id)&&user.role=="admin"){
        throw new apiError(403,"Not authorized to update task todo")
    }
    task.todoCheckList = todoCheckList
    // Auto update-progress based on checklist

    const completedItem = task.todoCheckList.filter((item)=>item.completed).length

    const totalItem = task.todoCheckList.length
    task.progress = totalItem>0? Math.round((completedTask/totalItem)*100):0
    if(task.progress==100){
        task.status="Completed"
    }else if(task.progress>0 && task.progress<100){
        task.status = "In Progress"
    }else{
        task.status = "Pending"
    }
    await task.save({validateBeforeSave:true})
    const updatedTask = await Task.findById(req.params._id).populate(
        "assignedTo",
        "name email profileImageUrl"
    )
    return res.status(200)
    .json(new apiResponse(200,"Task checklist successfully updated",{
        task:updateTask
    }))
});

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
