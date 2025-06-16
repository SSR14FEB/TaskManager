import {Router} from "express"
import { authentication, adminOnly } from "../middleware/jwt_middleware.js"
import { exportTaskReports,exportUsersReports } from "../controllers/reportControllers.js"
const router = Router()

router.get("/export/task",authentication, exportTaskReports)
router.get("/export/user",authentication ,adminOnly, exportUsersReports)

export default router