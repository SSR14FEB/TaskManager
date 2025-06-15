import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import { User } from "../models/user_model";
import { Task } from "../models/task_model";
import excelJS from "exceljs";

const exportTaskReports = asyncHandler(async(req, res)=>{
    const task = await Task.find().populate(
        "assignTo",
        "name email"
    )
    if(!task){
        throw new apiError(404,"Task not found")
    }
    const workBook = new excelJS.Workbook()
    const workSheet = workBook.addWorksheet("Task Report")
    workSheet.columns = [
        {header:"Task ID",key:"_id",width:25},
        {header:"Title",key:"title",width:25},
        {header:"Description",key:"description",width:50},
        {header:"Priority",key:"priority",width:25},
        {header:"Due Date",key:"dueDate",width:25},
        {header:"Status",key:"status",width:25},
        {header:"Assign TO",key:"assignTo",width:25}
    ]

    task.forEach((task)=>{
        const assignTo = task.assignTo?.map((user)=>{
            return (`${user.name} ${user.email}`).join(",")
        })
        // fetching excel worksheet 
        workSheet.addRow({
            _id:task._id,
            title:task.title,
            description:task.description,
            priority:task.priority,
            dueDate:task.dueDate,
            status:task.status,
            assignTo:task.assignTo
        })
        res.setHeaders(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        res.setHeaders(
          "Content-Disposition",
          "attachment; filename=tasks_reports.xlsx"
        )
        return workBook.xlsx.write(res).then(()=>{
            res.end();
        })
    })
})


const exportUsersReports = asyncHandler(async(req, res)=>{

})

export{
    exportTaskReports,
    exportUsersReports
}