import { connection } from "./database/index.js"
import expressApp from "./app.js"
import dotenv from "dotenv"
dotenv.config({
    path:"/.env"
})

connection()
.then(()=>{
   expressApp.listen(process.env.PORT,()=>{
    console.log(`Express app is listing at ${process.env.PORT}`)
   })
})
.catch(()=>{
   console.log(`Got an error while listening Express app at ${process.env.PORT}`) 
})