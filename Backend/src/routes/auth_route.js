import {Router} from "express"

const router = Router()

router.post("/login",login)
router.post("/logout",logout)

router.route("/register")
.post(register)

router.route("/profile")
.get(jwt,profile)
.patch(jwt,updateProfile)


export default router

