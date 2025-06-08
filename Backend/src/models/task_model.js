import mongoose, { Mongoose, Schema } from "mongoose";
import { User } from "./user_model.js";

const todoSchema = new Schema(
    {
        text: {
            type: String,
            Required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            index:true
        },
        description: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        assignTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        todoCheckList:{
            type:[todoCheckList],
            required:true
        },
        attachments:[{type:String}],
        dueDate: {
            type: Date,
            required: true,
        },
        Priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending",
        },
        Progress: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
