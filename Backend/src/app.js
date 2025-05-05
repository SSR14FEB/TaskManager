import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({
    origin:"*",
    methods:true,
    allowedHeaders:["Content-Type","Authorization"]
}))
app.use(cookieParser())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

import authRoute from "./routes/auth_route.js"
import reportRoute from "./routes/report_route.js"
import taskRoute from "./routes/task_route.js"
import userRoute from './routes/user_routes.js'

app.use("/api/auth",authRoute)
app.use("/api/report",reportRoute)
app.use("/api/task",taskRoute)
app.use("/api/user",userRoute)

export default app