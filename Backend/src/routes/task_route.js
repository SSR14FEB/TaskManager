import { Router } from "express";
import { adminOnly, authentication } from "../middleware/jwt_middleware.js";
import {
    adminDashboard,
    userDashboard,
    getTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskTodo,
} from "../controllers/taskControllers.js";
const router = Router();

router.get("/admin_dashboard", authentication, adminDashboard);
router.get("/user_dashboard", authentication, userDashboard);
router.get("/", authentication, getTask);
router.get("/:id", authentication, getTaskById);
router.post("/create_task", authentication, adminOnly, createTask);
router.put("/update_task/:id", authentication, updateTask);
router.delete("/delete_task/:id", authentication, adminOnly, deleteTask);
router.put("/task_status/:id", authentication, updateTaskStatus);
router.put("/update_task_todo/:_id", authentication, updateTaskTodo);

export default router;
