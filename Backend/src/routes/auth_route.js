import {Router} from "express"
import { upload } from "../middleware/multer_middleware.js"
import { register } from "../controllers/authControllers.js"
const router = Router()

router.route("/register")
.post(upload.fields([{
    name:"profileImage",
    maxCount:1
}]),register)

// router.post("/login",login)
// router.post("/logout",logout)

// router.route("/profile")
// .get(jwt,profile)
// .patch(jwt,updateProfile)


export default router

