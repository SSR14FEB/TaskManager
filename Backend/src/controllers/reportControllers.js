import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { User } from "../models/user_model.js";
import { Task } from "../models/task_model.js";
import excelJS from "exceljs";

const exportTaskReports = asyncHandler(async (req, res) => {
    const task = await Task.find().populate("assignTo", "name email");
    if (!task) {
        throw new apiError(404, "Task not found");
    }
    const workBook = new excelJS.Workbook();
    const workSheet = workBook.addWorksheet("Task Report");
    workSheet.columns = [
        { header: "Task ID", key: "_id", width: 25 },
        { header: "Title", key: "title", width: 25 },
        { header: "Description", key: "description", width: 50 },
        { header: "Priority", key: "priority", width: 25 },
        { header: "Due Date", key: "dueDate", width: 25 },
        { header: "Status", key: "status", width: 25 },
        { header: "Assign TO", key: "assignTo", width: 25 },
    ];

    task.forEach((task) => {
        const assignTo = task.assignTo?.map((user) => {
            return `${user.name} ${user.email}`.join(",");
        });
        // fetching excel worksheet
        workSheet.addRow({
            _id: task._id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
            status: task.status,
            assignTo: task.assignTo,
        });
        res.setHeaders(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeaders(
            "Content-Disposition",
            "attachment; filename=tasks_reports.xlsx"
        );
        return workBook.xlsx.write(res).then(() => {
            res.end();
        });
    });
});

const exportUsersReports = asyncHandler(async (req, res) => {
    const users = await User.find().select("name email _id").lean();
    if (!users) {
        throw new apiError(404, "User not found");
    }

    const usersTask = await Task.find().populate("assignTo", "name email _id");
    if (!usersTask) {
        throw new apiError(404, "Task not found");
    }

    const usersTaskMap = {};

    users.forEach((user) => {
        usersTaskMap[user._id] = {
            name: user.name,
            email: user.email,
            taskCount: 0,
            pending: 0,
            inProgress: 0,
            completed: 0,
        };
    });

    usersTask.forEach((task) => {
        if (task.assignTo) {
            task.assignTo.forEach((assignedUser) => {
                if (usersTaskMap[assignedUser]) {
                    usersTaskMap[assignedUser].taskCount += 1;
                    if (task.status == "Pending") {
                        usersTaskMap[assignedUser].pending += 1;
                    } else if (task.status == "In Progress") {
                        usersTaskMap[assignedUser].inProgress += 1;
                    } else if (task.status == "Completed") {
                        usersTaskMap[assignedUser].completed += 1;
                    }
                }
            });
        }
    });

    const workBook = new excelJS.Workbook();
    const workSheet = workBook.addWorksheet("User Report");
    workSheet.addRow = [
        { header: "Id", key: "_id", width: 30 },
        { header: "Name", key: "name", width: 25 },
        { header: "Email", key: "email", width: 35 },
        { header: "Role", key: "role", width: 25 },
        { header: "Total Task", key: "taskCount", width: 30 },
        { header: "Pending", key: "pending", width: 25 },
        { header: "In Progress", key: "inProgress", width: 30 },
        { header: "Completed", key: "completed", width: 30 },
    ];
   Object.values(usersTaskMap).forEach((user)=>{
    workSheet.addRow(user)
   })

   res.setHeaders(
    "Content-Type",
    "application/vnd-openxmlformats-officedocment.spreadsheetml.sheet"
   )

   res.setHeaders(
    "Content-Disposition",
    "attachment; filename=users_report.xls"
   )

  return workBook.xlsx.write(res).then(()=>{
    res.end()
  })
});

export { exportTaskReports, exportUsersReports };
