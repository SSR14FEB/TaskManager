import {Router} from "express"
import { authentication, adminOnly } from "../middleware/jwt_middleware"
import { exportTaskReports,exportUsersReports } from "../controllers/reportControllers"
const router = Router()

router.get("/export/task",authentication, exportTaskReports)
router.get("/export/user",authentication ,adminOnly, exportUsersReports)

export default router