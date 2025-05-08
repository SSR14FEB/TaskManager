import {Router} from "express"
import { authentication, adminOnly } from "../middleware/jwt_middleware.js"
import { getMemberById, getMembers } from "../controllers/userControllers.js"
const router = Router()
router.get("/",authentication,getMembers)
 router.get("/id",authentication,getMemberById)
export default router