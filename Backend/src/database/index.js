import mongoose from 'mongoose';  
const connection = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("connection string problem",error);
    }
}
export {connection}