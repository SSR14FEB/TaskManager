import {Router} from "express"
import { upload } from "../middleware/multer_middleware.js"
import { register,login,logout,profile,updateProfile } from "../controllers/authControllers.js"
import { authentication, roleAuthentication } from "../middleware/jwt_middleware.js"
const router = Router()

router.route("/register")
.post(upload.fields([{
    name:"profileImage",
    maxCount:1
}]),register)

router.post("/login",login)
router.post("/logout",authentication,logout)

router.route("/profile")
.get(authentication,profile)
.patch(authentication,upload.fields([{
    name:"profileImage",
    maxCount:1
}]),updateProfile)


export default router

