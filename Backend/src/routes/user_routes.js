import {Router} from "express"
import { authentication, adminOnly } from "../middleware/jwt_middleware.js"
import { getMembers } from "../controllers/userControllers.js"
const router = Router()
router.get("/",authentication,getMembers)
// router.get("/id",authentication,getUserById)
// router.delete("/delete",authentication,adminOnly,deleteUser)
export default router