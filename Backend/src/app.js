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

app.use("/",(req,res)=>{
    res.send("<h1>Backend setup is completed</h1>")
})

export default app